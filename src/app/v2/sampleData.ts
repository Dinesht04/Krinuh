import type { Product } from '@/components/product-card'; // Assuming ProductCard is in components

export const cloudinary_URLS = ["1_qkd7bo",  "2_hejkhh",  "3_svid0b",  "4_w1tcmr",  "5_yvwjpt","6_rf93ay",  "7_xagzxx",  "8_m1iwic",  "9_dylewy",  "10_vfp4pr","11_ilunby", "12_yk1plz", "13_d0bkcx", "14_ootasd", "15","16_bcf0ku", "17", "18", "19_vase5o", "20","21", "22", "23_hkbuwp", "24_dzzswp", "25","26_zspckq", "27_kts8sa", "28_ysnhny", "29_fhw70j", "30_enekmj","31_tjhlxu", "32_j8c4fl", "33", "34", "35","36", "37_hxtis3", "38_zk9jud", "39_cvr4gf", "40_roogrk","41_fcih0q", "42_dnhtas", "43_x1uhw4", "44_fg7fql", "45_aqswwe","46_shnjjz", "47_ruitrz", "48_nxk2fl", "49_ddb9m2", "50_duhjpl","51_noyxs9", "52_fbpdi4", "53_gkcivh", "54_ne4uod", "55_vxvl1e","56_hizln0", "57_dbqeqs"
];

// --- Hero Slides Data ---
interface HeroSlide {
id: number;
image: string;
title: string;
subtitle: string;
cta: string;
link: string;
backgroundColor: string;
}

export const heroSlides: HeroSlide[] = [
{id: 1,image: "/placeholder.svg?height=600&width=1200&query=Artistic+Living+Room+Decor",title: "Elevate Your Ambiance",subtitle: "Discover unique paintings and decor that tell your story.",cta: "Explore Art Collection",link: "#paintings",backgroundColor: "#fdf0e6",
},
{id: 2,image: "/placeholder.svg?height=600&width=1200&query=Handcrafted+Jewelry+Showcase",title: "Timeless Elegance",subtitle: "Handcrafted jewelry pieces for unforgettable moments.",cta: "Browse Jewelry",link: "#jewelry",backgroundColor: "#e6f5fd",
},
{id: 3,image: "/placeholder.svg?height=600&width=1200&query=Home+Decor+Inspiration+Sale",title: "New Season Decor",subtitle: "Refresh your space with our latest home decor arrivals. Up to 25% off!",cta: "Shop Decorations",link: "#decorations",backgroundColor: "#e6fdef",
},
];

// --- Announcements Data ---
export const announcements: string[] = ["Enjoy Free Shipping on All Orders Above ₹2500!","Grand Art Sale: Up to 40% Off on Select Paintings!","New Arrivals: Check out the latest in Home Decor & Jewelry!",
];

// --- Paintings Data ---
// Merged base data for all paintings (IDs 1-57)
const allPaintingsBaseData: Omit<Product, 'cloudinaryPublicId' | 'category' | 'isBestSeller' | 'discount'>[] = [
{ id: 1, title: "Mountain Symphony", price: "5000/-", size: "23.5x19.5 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "This is a beautiful painting depicting a serene mountain scene..."},
{ id: 2, title: "Forest's Embrace", price: "3500/-", size: "18.5x14.5 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The painting depicts a sunlit forest path..."},
{ id: 3, title: "River of Dreams", price: "3500/-", size: "18x15 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The painting depicts a serene, winding stream..."},
{ id: 4, title: "The Buddha's Gaze", price: "4500/-", size: "18.5x14.5 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The painting depicts a serene and contemplative Buddha..."},
{ id: 5, title: "Whispering Waters", price: "5000/-", size: "23.5x19.5 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The painting depicts a peaceful scene of a river..."},
{ id: 6, title: "Mountain's Melody", price: "4000/-", size: "23.5x15.5 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Framed", Sold: false, description: "This painting depicts a serene forest scene..."},
{ id: 7, title: "Green Haven", price: "4500/-", size: "23.5x17.5 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "This painting portrays a tranquil forest scene..."},
{ id: 8, title: "Plumeria in Bloom", price: "2000/-", size: "11.5x11.5 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Framed", Sold: false, description: "This painting depicts a cluster of pink and white flowers..."},
{ id: 9, title: "Secret Of Woods", price: "3000/-", size: "15.5x11.5 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Framed", Sold: false, description: "This painting portrays a lush forest scene..."},
{ id: 10, title: "Nature's Symphony", price: "3000/-", size: "17.5x7.5 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Framed", Sold: false, description: "This image depicts a framed painting of a waterfall..."},
{ id: 11, title: "Autumn Waterfall", price: "3500/-", size: "19.5x15.5 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Framed", Sold: false, description: "This painting depicts a serene natural landscape..."},
{ id: 12, title: "Sunlit Serenity", price: "4500/-", size: "23.5x17.5 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Framed", Sold: false, description: "This image shows a framed painting of a peaceful forest scene..."},
{ id: 13, title: "Hibiscus Harmony", price: "1500/-", size: "11.5x11.5 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Framed", Sold: false, description: "This image shows a framed painting of flowers..."},
{ id: 14, title: "Roses in Bloom", price: "1500/-", size: "15x11 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Framed", Sold: false, description: "This picture depicts a framed artwork of roses..."},
{ id: 15, title: "Golden Autumn", price: "4500/-", size: "18x15 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "This image shows a framed painting of a forest scene..."},
{ id: 16, title: "Serene Riverbank", price: "2500/-", size: "15x11 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "This painting depicts a serene landscape..."},
{ id: 17, title: "Golden Rays", price: "3500/-", size: "21x15 inches", Medium: "Acrylic", Surface: "Paper", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "This painting depicts a sunlit forest scene..."},
{ id: 18, title: "Mountain Majesty", price: "1500/-", size: "11x7.5 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "This painting features a stunning mountain range..."},
{ id: 19, title: "A Beacon of Hope", price: "1500/-", size: "11x9 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "This painting depicts a single tall flower..."},
{ id: 20, title: "Golden Canopy's Embrace", price: "1500/-", size: "11x7.5 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "This painting portrays a forest scene..."},
{ id: 21, title: "Blue Blooms", price: "500/-", size: "11x7.5 inches", Medium: "Acrylic", Surface: "Paper", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "This painting features a vibrant bouquet of blue flowers..."},
{ id: 22, title: "The Wave's Roar", price: "3000/-", size: "9x7 inches", Medium: "Acrylic Palette knife", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The image is a framed painting depicting a large wave..."},
{ id: 23, title: "Dancing Petals", price: "400/-", size: "9x7 inches", Medium: "Acrylic", Surface: "Paper", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The image is a framed painting of a floral subject..."},
{ id: 24, title: "Petal Parade", price: "400/-", size: "9x7 inches", Medium: "Acrylic", Surface: "Paper", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The image is a framed painting featuring a cluster of bright orange flowers..."},
{ id: 25, title: "Bluebells", price: "400/-", size: "9x7 inches", Medium: "Acrylic", Surface: "Paper", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The image shows a framed painting of a blue floral arrangement..."},
{ id: 26, title: "Orange Dream", price: "400/-", size: "9x7 inches", Medium: "Acrylic", Surface: "Paper", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "This painting features a vibrant botanical subject..."},
{ id: 27, title: "Sun-Kissed Flowers", price: "400/-", size: "9x7 inches", Medium: "Acrylic", Surface: "Paper", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The image shows a framed painting of an arrangement of yellow and orange flowers..."},
{ id: 28, title: "Cheerful Blooms", price: "500/-", size: "9x7 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The image depicts a framed painting featuring vibrant yellow and orange flowers..."},
{ id: 29, title: "Sunlit Meadow", price: "700/-", size: "9x7 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The image shows a framed artwork with a green-dominated background..."},
{ id: 30, title: "Whispering Wishes", price: "1000/-", size: "9x7 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The image depicts a framed painting of a vibrant nature scene..."},
{ id: 31, title: "Garden's Delight", price: "700/-", size: "9x7 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The image shows a framed artwork with a green-dominated background..."},
{ id: 32, title: "Nature's Embrace", price: "700/-", size: "9x7 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The image shows a framed artwork with a green-dominated background..."},
{ id: 33, title: "Blooming Beauty", price: "700/-", size: "9x7 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The image shows a framed artwork with a green-dominated background..."},
{ id: 34, title: "Field of Dreams", price: "700/-", size: "9x7 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The image shows a framed artwork with a green-dominated background..."},
{ id: 35, title: "Floral Fusion", price: "700/-", size: "9x7 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The image shows a framed artwork with a green-dominated background..."},
{ id: 36, title: "Serene Sanctuary", price: "700/-", size: "9x7 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The image shows a framed artwork with a green-dominated background..."},
{ id: 37, title: "Wish Upon a Seed", price: "1000/-", size: "9x7 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The image features a framed painting of a single, delicate dandelion seed head..."},
{ id: 38, title: "Blooming Beauty", price: "500/-", size: "9x7 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The image is a photograph of a framed painting featuring vibrant flowers..."},
{ id: 39, title: "Flutter of Joy", price: "500/-", size: "9x7 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The image is a photograph of another framed painting featuring bright orange flowers..."},
{ id: 40, title: "Blooming Brilliant", price: "250/-", size: "7x5 inches", Medium: "Acrylic", Surface: "Paper", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The image is a photograph of a framed painting depicting yellow and orange flowers..."},
{ id: 41, title: "Nature's Innocence", price: "250/-", size: "7x5 inches", Medium: "Acrylic", Surface: "Paper", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The image depicts a framed painting of white roses..."},
{ id: 42, title: "Wave of Change", price: "20,000/-", size: "2x1.2 meters", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Stretched Canvas", Sold: true, description: "The image depicts a large, powerful ocean wave..."},
{ id: 43, title: "Where Land Meets Sea", price: "2000/-", size: "7x5 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: true, description: "The image is a painting of a scenic coastal landscape..."},
{ id: 44, title: "Soulful Stare", price: "7000/-", size: "24x18 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: true, description: "The image is a monochromatic painting of a horse's head..."},
{ id: 45, title: "Autumn's Embrace", price: "5000/-", size: "23x18 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: true, description: "The image is a vibrant painting of an autumn forest scene..."},
{ id: 46, title: "Whispering Bamboos", price: "5500/-", size: "24x17 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: true, description: "The painting depicts a serene bamboo forest..."},
{ id: 47, title: "Harmony in Chaos", price: "15,000/-", size: "2.5x2 meters", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Stretched Canvas", Sold: true, description: "The painting is an abstract expressionist work..."},
{ id: 48, title: "Mountain Retreat", price: "4000/-", size: "24x18 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "A serene painting of a house nestled in a lush forest setting..."},
{ id: 49, title: "Mirror of Autumn", price: "7000/-", size: "28x24 inches", Medium: "Oil", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: true, description: "The painting depicts a beautiful autumnal scene..."},
{ id: 50, title: "Secret Waterfall", price: "5000/-", size: "28x26 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: true, description: "The painting depicts a tranquil forest scene with a cascading waterfall..."},
{ id: 51, title: "Autumnal Symphony", price: "5000/-", size: "24x24 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: true, description: "The painting depicts a beautiful waterfall scene in a lush, autumnal forest..."},
{ id: 52, title: "Snowy Summit", price: "5000/-", size: "28x24 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: true, description: "The painting depicts a serene lakeside scene with a majestic mountain..."},
{ id: 53, title: "Golden Hour Glory", price: "5000/-", size: "28x26 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: true, description: "The painting depicts a beautiful autumnal scene along a winding path..."},
{ id: 54, title: "Woodland Reverie", price: "5000/-", size: "24x18 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: true, description: "The painting depicts a serene forest path winding through a lush, green forest..."},
{ id: 55, title: "Enchanted Forest Path", price: "5000/-", size: "24x20 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: false, description: "The painting depicts a sun-dappled path winding through a lush, green forest..."},
{ id: 56, title: "Bamboo Sanctuary", price: "5000/-", size: "24x20 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: true, description: "A symphony of sunlight filters through a verdant canopy..."},
{ id: 57, title: "Mediterranean Moment", price: "3500/-", size: "24x20 inches", Medium: "Acrylic", Surface: "Canvas", ToBeDeliveredAs: "Glass Framed", Sold: true, description: "The painting depicts a charming alleyway in a Mediterranean village..."}
];

export const paintingsData: Product[] = allPaintingsBaseData.map((painting) => {
  // Ensure ID is a number for correct indexing, and it is already.
  const paintingId = typeof painting.id === 'string' ? parseInt(painting.id.replace('p','')) : painting.id;
  return {
    ...painting,
    cloudinaryPublicId: cloudinary_URLS[paintingId - 1], // painting.id is 1-based
    category: "Paintings",
    // Apply isBestSeller and discount more variedly
    isBestSeller: !painting.Sold && (paintingId % 6 === 0 || paintingId % 9 === 0), // Example logic
    discount: !painting.Sold && paintingId % 5 === 0 ? (paintingId % 3 === 0 ? 10 : 15) : undefined, // Example logic
  };
});

// --- Jewelry Data (Sample - using placeholders) ---
export const jewelryData: Product[] = [
  {
    id: "j1",
    name: "Silver Moon Pendant",
    price: "6500/-",
    material: "925 Sterling Silver",
    gemstones: "Moonstone",
    weight: "10g",
    description: "Elegant crescent moon pendant featuring a luminous moonstone centerpiece. Comes with a silver chain.",
    image: "/placeholder.svg?height=400&width=400&query=Silver+Moon+Pendant",
    category: "Jewelry",
    isBestSeller: true,
    discount: 12,
    cloudinaryPublicId: "3_svid0b"
  },
  {
    id: "j2",
    name: "Ruby Stud Earrings",
    price: "9200/-",
    material: "14K Yellow Gold",
    gemstones: "Natural Ruby",
    weight: "5g",
    description: "Exquisite stud earrings with vibrant natural rubies, set in classic 14K yellow gold.",
    image: "/placeholder.svg?height=400&width=400&query=Ruby+Stud+Earrings",
    category: "Jewelry",
    cloudinaryPublicId: "7_xagzxx"
  },
  {
    id: "j3",
    name: "Braided Leather Bracelet",
    price: "3100/-",
    material: "Genuine Leather, Stainless Steel Clasp",
    gemstones: "None",
    weight: "20g",
    description: "Stylish braided genuine leather bracelet with a secure stainless steel magnetic clasp. Perfect for a casual look.",
    image: "/placeholder.svg?height=400&width=400&query=Leather+Bracelet",
    category: "Jewelry",
    isBestSeller: false,
    cloudinaryPublicId: "14_ootasd"
  },
  {
    id: "j4",
    name: "Amethyst Charm Necklace",
    price: "4500/-",
    material: "Sterling Silver",
    gemstones: "Amethyst",
    weight: "8g",
    description: "Delicate sterling silver necklace with a polished amethyst charm. Known for its calming properties.",
    image: "/placeholder.svg?height=400&width=400&query=Amethyst+Necklace",
    category: "Jewelry",
    isBestSeller: true,
    cloudinaryPublicId: "22"
  },
  {
    id: "j5",
    name: "Gold Infinity Ring",
    price: "7800/-",
    material: "18K Rose Gold",
    gemstones: "Micro-pavé Diamonds",
    weight: "6g",
    description: "Beautiful infinity symbol ring crafted in 18K rose gold, adorned with sparkling micro-pavé diamonds.",
    image: "/placeholder.svg?height=400&width=400&query=Gold+Infinity+Ring",
    category: "Jewelry",
    discount: 5,
    cloudinaryPublicId: "28_ysnhny"
  },
  {
    id: "j6",
    name: "Turquoise Bead Anklet",
    price: "2700/-",
    material: "Sterling Silver & Turquoise",
    gemstones: "Turquoise",
    weight: "4g",
    description: "Delicate anklet with turquoise beads, ideal for beach or boho outfits.",
    image: "/placeholder.svg?height=400&width=400&query=Turquoise+Anklet",
    category: "Jewelry",
    cloudinaryPublicId: "36"
  },
  {
    id: "j7",
    name: "Onyx Stackable Rings",
    price: "5200/-",
    material: "Oxidized Silver",
    gemstones: "Onyx",
    weight: "3g each",
    description: "Set of 3 stackable rings with polished onyx stones, offering versatile wear.",
    image: "/placeholder.svg?height=400&width=400&query=Onyx+Rings",
    category: "Jewelry",
    isBestSeller: false,
    cloudinaryPublicId: "41_fcih0q"
  }
];


// --- Decorations Data (Sample - using placeholders) ---
export const decorationsData: Product[] = [
  {
    id: "d1",
    name: "Geometric Terrarium Set",
    price: "4200/-",
    dimensions: "Small: 5x5x5\", Large: 8x8x8\"",
    material_type: "Glass, Brass Frame",
    style: "Modern Geometric",
    description: "Set of two geometric glass terrariums with brass frames. Ideal for succulents or air plants.",
    image: "/placeholder.svg?height=400&width=400&query=Geometric+Terrarium",
    category: "Decorations",
    isBestSeller: true,
    cloudinaryPublicId: "9_dylewy"
  },
  {
    id: "d2",
    name: "Handwoven Kilim Cushion Cover",
    price: "1900/-",
    dimensions: "18\" x 18\"",
    material_type: "Wool, Cotton",
    style: "Ethnic Boho",
    description: "Authentic handwoven Kilim cushion cover with intricate patterns. Adds a touch of global artistry to your sofa.",
    image: "/placeholder.svg?height=400&width=400&query=Kilim+Cushion",
    category: "Decorations",
    cloudinaryPublicId: "11_ilunby"
  },
  {
    id: "d3",
    name: "Concrete Desk Organizer",
    price: "2800/-",
    dimensions: "10\" L x 4\" W x 2\" H",
    material_type: "Polished Concrete",
    style: "Minimalist Industrial",
    description: "Sleek polished concrete desk organizer with compartments for pens, cards, and small accessories.",
    image: "/placeholder.svg?height=400&width=400&query=Concrete+Desk+Organizer",
    category: "Decorations",
    discount: 8,
    cloudinaryPublicId: "13_d0bkcx"
  },
  {
    id: "d4",
    name: "Set of 2 Abstract Canvas Prints",
    price: "6500/-",
    dimensions: "Each 24\" x 36\"",
    material_type: "Canvas, Wooden Frame",
    style: "Abstract Contemporary",
    description: "Diptych of abstract canvas prints featuring bold strokes and a harmonious color palette. Ready to hang.",
    image: "/placeholder.svg?height=400&width=400&query=Abstract+Canvas+Prints",
    category: "Decorations",
    isBestSeller: true,
    cloudinaryPublicId: "16_bcf0ku"
  },
  {
    id: "d5",
    name: "Driftwood Sculpture Accent",
    price: "5300/-",
    dimensions: "Approx. 12\" H x 15\" W (varies)",
    material_type: "Natural Driftwood",
    style: "Coastal Natural",
    description: "Unique natural driftwood sculpture, perfect as a standalone accent piece for a coastal or rustic theme.",
    image: "/placeholder.svg?height=400&width=400&query=Driftwood+Sculpture",
    category: "Decorations",
    cloudinaryPublicId: "20"
  },
  {
    id: "d6",
    name: "Macrame Wall Hanging",
    price: "2100/-",
    dimensions: "20\" W x 30\" H",
    material_type: "Cotton",
    style: "Bohemian",
    description: "Beautiful handcrafted macrame wall hanging to add texture to your interiors.",
    image: "/placeholder.svg?height=400&width=400&query=Macrame+Wall+Hanging",
    category: "Decorations",
    cloudinaryPublicId: "24_dzzswp"
  }
];


// --- Best Sellers Data ---
export const bestSellersData: Product[] = [
...paintingsData.filter((item) => item.isBestSeller),
...decorationsData.filter((item) => item.isBestSeller),
...jewelryData.filter((item) => item.isBestSeller),
].sort(() => 0.5 - Math.random()); // Shuffle best sellers for variety