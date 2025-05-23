import Navbar from "@/components/Navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { jewelryData } from "@/v2/sampleData"

export default function JewelleryPage() {
  // Categorize jewelry
  const earrings = jewelryData.filter((item) => item.name?.toLowerCase().includes("earring"))
  const necklaces = jewelryData.filter(
    (item) =>
      item.name?.toLowerCase().includes("necklace") ||
      item.name?.toLowerCase().includes("pendant") ||
      item.name?.toLowerCase().includes("chain"),
  )
  const bracelets = jewelryData.filter((item) => item.name?.toLowerCase().includes("bracelet"))
  const rings = jewelryData.filter((item) => item.name?.toLowerCase().includes("ring"))
  const other = jewelryData.filter(
    (item) =>
      !item.name?.toLowerCase().includes("earring") &&
      !item.name?.toLowerCase().includes("necklace") &&
      !item.name?.toLowerCase().includes("pendant") &&
      !item.name?.toLowerCase().includes("chain") &&
      !item.name?.toLowerCase().includes("bracelet") &&
      !item.name?.toLowerCase().includes("ring"),
  )

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
              <BreadcrumbLink href="/jewellery" className="text-[#942972]">
                Jewellery
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold text-[#414141] mb-2">Jewellery Collection</h1>
        <p className="text-[#414141BF] mb-8">Discover our handcrafted jewelry pieces</p>

        {/* Tabbed interface for jewelry categories */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 grid-rows-2 md:grid-rows-1 md:grid-cols-6 mb-8">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#f8e8f3] data-[state=active]:text-[#942972]">
              All
            </TabsTrigger>
            <TabsTrigger
              value="earrings"
              className="data-[state=active]:bg-[#f8e8f3] data-[state=active]:text-[#942972]"
            >
              Earrings
            </TabsTrigger>
            <TabsTrigger
              value="necklaces"
              className="data-[state=active]:bg-[#f8e8f3] data-[state=active]:text-[#942972]"
            >
              Necklaces
            </TabsTrigger>
            <TabsTrigger
              value="bracelets"
              className="data-[state=active]:bg-[#f8e8f3] data-[state=active]:text-[#942972]"
            >
              Bracelets
            </TabsTrigger>
            <TabsTrigger value="rings" className="data-[state=active]:bg-[#f8e8f3] data-[state=active]:text-[#942972]">
              Rings
            </TabsTrigger>
            <TabsTrigger value="other" className="data-[state=active]:bg-[#f8e8f3] data-[state=active]:text-[#942972]">
              Other
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {jewelryData.map((jewelry) => (
                <ProductCard key={jewelry.id} product={jewelry} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="earrings" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {earrings.map((jewelry) => (
                <ProductCard key={jewelry.id} product={jewelry} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="necklaces" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {necklaces.map((jewelry) => (
                <ProductCard key={jewelry.id} product={jewelry} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bracelets" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bracelets.map((jewelry) => (
                <ProductCard key={jewelry.id} product={jewelry} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rings" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {rings.map((jewelry) => (
                <ProductCard key={jewelry.id} product={jewelry} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="other" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {other.map((jewelry) => (
                <ProductCard key={jewelry.id} product={jewelry} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  )
}
