import Navbar from "@/components/Navbar"
import { ProductCard } from "@/components/product-card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"
import { paintingsData } from "@/v2/sampleData"

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

        {/* Pinterest-like masonry grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {paintingsData.map((painting, index) => (
            <div key={painting.id} className="break-inside-avoid">
              <ProductCard product={painting} aspectRatio={index % 3 === 0 ? "portrait" : "square"} />
            </div>
          ))}
        </div>
      </div>

    </main>
  )
}
