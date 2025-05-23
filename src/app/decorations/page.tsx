import Navbar from "@/components/Navbar"
import { ProductCard } from "@/components/product-card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { decorationsData } from "@/v2/sampleData"

export default function DecorationsPage() {
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
              <BreadcrumbLink href="/decorations" className="text-[#942972]">
                Decorations
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold text-[#414141] mb-2">Home Decorations</h1>
        <p className="text-[#414141BF] mb-8">Transform your space with our unique decorative pieces</p>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters */}
          <div className="md:w-1/4 lg:w-1/5">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#414141]">Filters</h2>
                <Filter size={18} className="text-[#942972]" />
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="style">
                  <AccordionTrigger className="text-[#414141]">Style</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="modern" className="mr-2" />
                        <label htmlFor="modern" className="text-sm text-[#414141BF]">
                          Modern
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="bohemian" className="mr-2" />
                        <label htmlFor="bohemian" className="text-sm text-[#414141BF]">
                          Bohemian
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="scandinavian" className="mr-2" />
                        <label htmlFor="scandinavian" className="text-sm text-[#414141BF]">
                          Scandinavian
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="artdeco" className="mr-2" />
                        <label htmlFor="artdeco" className="text-sm text-[#414141BF]">
                          Art Deco
                        </label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="material">
                  <AccordionTrigger className="text-[#414141]">Material</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="ceramic" className="mr-2" />
                        <label htmlFor="ceramic" className="text-sm text-[#414141BF]">
                          Ceramic
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="wood" className="mr-2" />
                        <label htmlFor="wood" className="text-sm text-[#414141BF]">
                          Wood
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="metal" className="mr-2" />
                        <label htmlFor="metal" className="text-sm text-[#414141BF]">
                          Metal
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="glass" className="mr-2" />
                        <label htmlFor="glass" className="text-sm text-[#414141BF]">
                          Glass
                        </label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price">
                  <AccordionTrigger className="text-[#414141]">Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="price1" className="mr-2" />
                        <label htmlFor="price1" className="text-sm text-[#414141BF]">
                          Under ₹3,000
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="price2" className="mr-2" />
                        <label htmlFor="price2" className="text-sm text-[#414141BF]">
                          ₹3,000 - ₹5,000
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="price3" className="mr-2" />
                        <label htmlFor="price3" className="text-sm text-[#414141BF]">
                          ₹5,000 - ₹8,000
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="price4" className="mr-2" />
                        <label htmlFor="price4" className="text-sm text-[#414141BF]">
                          Over ₹8,000
                        </label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-6 space-y-3">
                <Button className="w-full bg-[#942972] hover:bg-[#7b1d5e]">Apply Filters</Button>
                <Button variant="outline" className="w-full border-[#942972] text-[#942972] hover:bg-[#f8e8f3]">
                  Clear All
                </Button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="md:w-3/4 lg:w-4/5">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[#414141BF]">Sort by:</span>
                <select className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#942972]">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>

              <div className="text-[#414141BF] text-sm">Showing {decorationsData.length} products</div>
            </div>

            {/* Product grid with featured items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Featured item - larger */}
              <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
                <ProductCard
                  product={decorationsData.find((item) => item.id === "d1") || decorationsData[0]}
                  aspectRatio="portrait"
                />
              </div>

              {/* Regular items */}
              {decorationsData
                .filter((item) => item.id !== "d1") // Exclude the featured item
                .map((decoration) => (
                  <div key={decoration.id}>
                    <ProductCard product={decoration} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}
