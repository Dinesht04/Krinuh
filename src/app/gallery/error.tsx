"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"

export default function GalleryError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Gallery page error:", error)
  }, [error])

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center gap-4">
        <h2 className="text-xl font-semibold text-[#414141]">
          The gallery is taking longer than usual to wake up
        </h2>
        <p className="text-[#414141BF] max-w-md">
          Our server was idle and is starting back up — this can take up to a minute on the first visit.
          Please try again in a few seconds.
        </p>
        <Button className="bg-[#942972] hover:bg-[#7b1d5e] text-white" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </main>
  )
}