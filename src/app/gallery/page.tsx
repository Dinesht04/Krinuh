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
import { toast } from "sonner"

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
  }>
}

async function getPaintings(): Promise<Product[]> {
  try {
    const response = await fetch("https://krinuh-be-ts.onrender.com/painting/all", {
      cache: "no-store",
    })

    if (!response.ok) {
      toast.error("Failed to fetch paintings, Please try again later")
      return []
    }

    const apiData: PaintingAPIResponse = await response.json()

    if (!apiData.success || !apiData.data) {
      toast.error("Failed to fetch paintings, Please try again later")
      return []
    }

    // Map API response to Product interface
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
      Sold: false,
    }))
  } catch (error) {
    toast.error("Failed to fetching paintings, Please try again later")
    return []
  }
}

export default async function GalleryPage() {
  const paintings = await getPaintings()

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

        {paintings.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-[#414141BF]">No paintings available at the moment.</p>
          </div>
        ) : (
          <>
            <p className="text-[#414141BF] mb-6">Showing {paintings.length} paintings</p>
            {/* Pinterest-like masonry grid */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {paintings.map((painting, index) => (
                <div key={painting.id} className="break-inside-avoid">
                  <ProductCard product={painting} aspectRatio={index % 3 === 0 ? "portrait" : "square"} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

    </main>
  )
}