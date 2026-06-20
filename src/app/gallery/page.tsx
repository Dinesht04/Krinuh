import { Suspense } from "react"
import Navbar from "@/components/Navbar"
import { ProductCard, type Product } from "@/components/product-card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export const dynamic = "force-dynamic"

interface PaintingAPIResponse {
  success: boolean
  data: Array<{
    _id: string
    title: string
    price: string
    description?: string
    size?: string
    medium?: string
    surface?: string
    toBeDeliveredAs?: string
    cldImagePublicIds: string[]
    sold: boolean
  }>
}

async function getPaintings(): Promise<Product[]> {
  try {
    const response = await fetch("https://krinuh-be-ts.onrender.com/painting/all", {
      cache: "no-store",
    })

    if (!response.ok) {
      // Can't toast from a server function — throw instead so the
      // PaintingsGrid component below can render an inline error message.
      throw new Error("Failed to fetch paintings")
    }

    const apiData: PaintingAPIResponse = await response.json()

    if (!apiData.success || !apiData.data) {
      throw new Error("Failed to fetch paintings")
    }

    return apiData.data.map((painting) => ({
      id: painting._id,
      title: painting.title,
      price: painting.price.endsWith("/-") ? painting.price : `${painting.price}/-`,
      description: painting.description,
      size: painting.size,
      Medium: painting.medium,
      Surface: painting.surface,
      ToBeDeliveredAs: painting.toBeDeliveredAs,
      cloudinaryPublicId: painting.cldImagePublicIds?.[0],
      category: "Paintings",
      sold: painting.sold,
    }))
  } catch (error) {
    console.error("getPaintings error:", error)
    return []
  }
}

// This is the part that actually awaits the (potentially cold-start-slow)
// fetch. Wrapping just this piece in <Suspense> means the Navbar, breadcrumb,
// and heading render immediately, and only this section shows a fallback.
async function PaintingsGrid() {
  const paintings = await getPaintings()

  if (paintings.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-[#414141BF]">No paintings available at the moment.</p>
      </div>
    )
  }

  return (
    <>
      <p className="text-[#414141BF] mb-6">Showing {paintings.length} paintings</p>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {paintings.map((painting, index) => (
          <div key={painting.id} className="break-inside-avoid">
            <ProductCard product={painting} aspectRatio={index % 3 === 0 ? "portrait" : "square"} />
          </div>
        ))}
      </div>
    </>
  )
}

function GalleryLoadingSkeleton() {
  return (
    <div>
      <p className="text-[#414141BF] mb-6">Loading paintings...</p>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="break-inside-avoid">
            <Skeleton />
          </div>
        ))}
      </div>
    </div>
  )
}

// No longer async — page shell renders immediately, grid streams in via Suspense.
export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/gallery" className="text-[#942972]">
                Gallery
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold text-[#414141] mb-2">Art Gallery</h1>
        <p className="text-[#414141BF] mb-8">Explore our collection of original paintings</p>

        <Suspense fallback={<GalleryLoadingSkeleton />}>
          <PaintingsGrid />
        </Suspense>
      </div>
    </main>
  )
}