// components/WakeBackend.tsx
"use client"
import { useEffect } from "react"

export default function WakeBackend() {
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_API+"/", { mode: "no-cors" }).catch(() => {})
  }, [])
  return null
}