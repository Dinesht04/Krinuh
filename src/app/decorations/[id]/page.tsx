"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import { ProductDetail } from "@/components/product-detail"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"
import { decorationsData } from "@/v2/sampleData"
import { pickRandom } from "@/lib/utils"

export default function DecorationDetailPage() {
  const params = useParams<{ id: string }>()
  const product = decorationsData.find((p) => String(p.id) === params.id)

  const breadcrumb = (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <Home className="h-4 w-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/decorations">Decorations</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )

  if (!product) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          {breadcrumb}
          <p className="text-krinuh-text/75 mb-4">We couldn&apos;t find that item.</p>
          <Link href="/decorations" className="text-krinuh-primary underline">
            Back to Decorations
          </Link>
        </div>
      </main>
    )
  }

  const recommended = pickRandom(decorationsData.filter((p) => p.id !== product.id))

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
              <BreadcrumbLink href="/decorations">Decorations</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-krinuh-primary">
                {product.title || product.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <ProductDetail product={product} recommended={recommended} />
      </div>
    </main>
  )
}
