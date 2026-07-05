import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Picks a random sample of size between min and max (inclusive) from an array.
export function pickRandom<T>(items: T[], min = 5, max = 10): T[] {
  const shuffled = [...items].sort(() => Math.random() - 0.5)
  const count = Math.min(items.length, Math.floor(Math.random() * (max - min + 1)) + min)
  return shuffled.slice(0, count)
}
