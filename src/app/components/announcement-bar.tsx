"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface AnnouncementBarProps {
  messages: string[]
  interval?: number
}

export function AnnouncementBar({ messages, interval = 5000 }: AnnouncementBarProps) {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!isVisible) return

    const timer = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length)
    }, interval)

    return () => clearInterval(timer)
  }, [messages.length, interval, isVisible])

  if (!isVisible) return null

  return (
    <div className="bg-krinuh-light text-krinuh-primary py-2 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <p className="text-center text-sm md:text-base font-medium animate-fade-in">{messages[currentMessage]}</p>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 text-krinuh-primary"
            aria-label="Close announcement"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
