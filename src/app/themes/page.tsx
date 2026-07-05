"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CldImage } from "next-cloudinary"
import Navbar from "@/components/Navbar"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"
import { toast } from "sonner"

interface ThemeProductAPI {
  productType: "Painting" | "Jewellery"
  productId:
    | { _id: string; title: string; price: string; cldImagePublicIds: string[]; sold: boolean }
    | string
}

interface ThemeAPIItem {
  _id: string
  title: string
  description: string
  products: ThemeProductAPI[]
}

interface ThemeAPIResponse {
  success: boolean
  data: ThemeAPIItem[]
}

function firstThumbnail(theme: ThemeAPIItem): string | null {
  for (const p of theme.products) {
    if (typeof p.productId !== "string" && p.productId.cldImagePublicIds?.length) {
      return p.productId.cldImagePublicIds[0]
    }
  }
  return null
}

export default function ThemesPage() {
  const [themes, setThemes] = useState<ThemeAPIItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/theme/all", { cache: "no-store" })
        if (!response.ok) throw new Error(`Failed to fetch themes: ${response.status}`)
        const apiData: ThemeAPIResponse = await response.json()
        if (!apiData.success || !apiData.data) throw new Error("Invalid API response")
        setThemes(apiData.data)
        setError(null)
      } catch (err) {
        toast.error("Failed to fetch themes, please try again later")
        setError(err instanceof Error ? err.message : "Failed to fetch themes")
      } finally {
        setIsLoading(false)
      }
    }

    fetchThemes()
  }, [])

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
              <BreadcrumbLink href="/themes" className="text-krinuh-primary">
                Themes
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="font-serif text-3xl font-medium text-krinuh-ink mb-2">Shop by Theme</h1>
        <p className="text-krinuh-text/75 mb-8">Curated collections across paintings and jewellery</p>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="aspect-square rounded-none" />
                <Skeleton className="h-4 w-2/3 mt-2.5" />
                <Skeleton className="h-3 w-1/2 mt-1.5" />
              </div>
            ))}
          </div>
        )}

        {error && !isLoading && (
          <p className="text-red-500">Failed to load themes. Please try again later.</p>
        )}

        {!isLoading && !error && themes.length === 0 && (
          <p className="text-krinuh-text/75">No themes yet — check back soon.</p>
        )}

        {!isLoading && !error && themes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme) => {
              const thumb = firstThumbnail(theme)
              return (
                <Link key={theme._id} href={`/themes/${theme._id}`} className="group block">
                  <div className="relative aspect-square overflow-hidden bg-krinuh-ash">
                    {thumb ? (
                      <CldImage
                        src={thumb}
                        alt={theme.title}
                        fill
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-krinuh-primary/30 text-sm">
                        No products yet
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute inset-x-0 bottom-3.5 text-center text-white text-sm uppercase tracking-[0.15em] font-semibold">
                      {theme.title}
                    </span>
                  </div>
                  <p className="text-krinuh-text/75 text-sm mt-2">{theme.description}</p>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
