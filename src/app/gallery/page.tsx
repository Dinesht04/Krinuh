import Navbar from "@/components/Navbar"
import { PaintingsClient } from "@/components/paintings-client"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"

// No longer "force-dynamic" with a server-side fetch — the page itself is now
// just static shell; data fetching happens entirely in the browser via
// PaintingsClient, which sidesteps the serverless function timeout issue.

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
              <BreadcrumbLink href="/gallery" className="text-krinuh-primary">
                Gallery
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold text-krinuh-text mb-2">Art Gallery</h1>
        <p className="text-krinuh-text/75 mb-8">Explore our collection of original paintings</p>

        <PaintingsClient />
      </div>
    </main>
  )
}