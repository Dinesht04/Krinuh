// components/WakeBackend.tsx
"use client"
import { useEffect } from "react"

export default function WakeBackend() {
  useEffect(() => {
    fetch("https://krinuh-be-ts.onrender.com/", { mode: "no-cors" }).catch(() => {})
  }, [])
  return null
}