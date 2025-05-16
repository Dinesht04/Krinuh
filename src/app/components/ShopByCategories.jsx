"use client"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const ShopByCategories = () => {
  const shopBycategoriesData = [
    { title: "INDIAN EARRINGS", image: "/images/earrings.jpg" },
    { title: "HEAD ACCESSORIES", image: "/images/head.jpg" },
    { title: "INDIAN NECKPIECES", image: "/images/neckpieces.jpg" },
    { title: "HAND ACCESSORIES", image: "/images/hand.jpg" },
    { title: "FOOT ACCESSORIES", image: "/images/foot.jpg" },
    { title: "INDIAN HAIR ACCESSORIES", image: "/images/hair.jpg" },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold text-center mb-6">SHOP BY CATEGORIES</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {shopBycategoriesData.map((item, index) => (
          <Card key={index} className="w-[calc(50%-0.5rem)] rounded-none relative overflow-hidden">
            <CardContent className="flex aspect-square items-end justify-center p-3">
                  <span className="text-sm fle text-center font-semibold">{item.title}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ShopByCategories
