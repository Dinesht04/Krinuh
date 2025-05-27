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

export const heroSlides = [
  {
    id: 1,
    image: "Paintings-Hero_z2wyxr",
    title: "Elevate Your Space",
    subtitle: "Discover our handcrafted paintings and decorations",
    cta: "Shop Now",
    link: "/gallery",
    backgroundColor: "#f8e8f3",
  },
  {
    id: 2,
    image: "Jewelry-Hero_xas0s7",
    title: "Adorn Yourself",
    subtitle: "Explore our exquisite jewelry collection",
    cta: "Shop Jewelry",
    link: "/jewellery",
    backgroundColor: "#e8f0f8",
  },
  {
    id: 3,
    image: "Decor-Hero_uvuwy8",
    title: "Transform Your Home",
    subtitle: "Unique decorative pieces for every space",
    cta: "Shop Decorations",
    link: "/decorations",
    backgroundColor: "#f0f8e8",
  },
]


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
    theme: "Celestial",
    description:
      "Elegant crescent moon pendant featuring a luminous moonstone centerpiece. The sterling silver setting enhances the stone's natural glow, creating a piece that's both mystical and sophisticated. Comes with a matching silver chain.",
    category: "Jewelry",
    isBestSeller: true,
    discount: 12,
    cloudinaryPublicId: "3_svid0b",
  },
  {
    id: "j2",
    name: "Ruby Stud Earrings",
    price: "9200/-",
    material: "14K Yellow Gold",
    gemstones: "Natural Ruby",
    weight: "5g",
    theme: "Classic",
    description:
      "Exquisite stud earrings featuring vibrant natural rubies set in classic 14K yellow gold. The deep red color of the rubies creates a striking contrast against the warm gold, making these earrings perfect for both everyday elegance and special occasions.",
    category: "Jewelry",
    cloudinaryPublicId: "7_xagzxx",
  },
  {
    id: "j3",
    name: "Emerald Tennis Bracelet",
    price: "15800/-",
    material: "18K White Gold",
    gemstones: "Natural Emerald",
    weight: "25g",
    theme: "Luxury",
    description:
      "A stunning tennis bracelet featuring a continuous line of natural emeralds set in 18K white gold. Each emerald is carefully selected for its vibrant green color and clarity, creating a piece that exudes luxury and sophistication.",
    category: "Jewelry",
    isBestSeller: true,
    cloudinaryPublicId: "11_ilunby",
  },
  {
    id: "j4",
    name: "Pearl Drop Earrings",
    price: "7200/-",
    material: "Sterling Silver",
    gemstones: "Freshwater Pearl",
    weight: "8g",
    theme: "Vintage",
    description:
      "Classic drop earrings featuring lustrous freshwater pearls suspended from sterling silver hooks. The timeless design makes these earrings versatile enough for both casual and formal occasions.",
    category: "Jewelry",
    discount: 15,
    cloudinaryPublicId: "19_vase5o",
  },
  {
    id: "j5",
    name: "Sapphire Cocktail Ring",
    price: "12500/-",
    material: "14K Rose Gold",
    gemstones: "Blue Sapphire, Diamond",
    weight: "12g",
    theme: "Statement",
    description:
      "A bold cocktail ring featuring a stunning blue sapphire center stone surrounded by brilliant diamonds. Set in romantic rose gold, this ring makes a statement while maintaining elegant sophistication.",
    category: "Jewelry",
    isBestSeller: true,
    cloudinaryPublicId: "23_hkbuwp",
  },
  {
    id: "j6",
    name: "Gold Chain Necklace",
    price: "8900/-",
    material: "18K Yellow Gold",
    gemstones: "None",
    weight: "15g",
    theme: "Minimalist",
    description:
      "A classic gold chain necklace in 18K yellow gold. The timeless design and substantial weight make this piece perfect for layering or wearing alone as a statement piece.",
    category: "Jewelry",
    cloudinaryPublicId: "26_zspckq",
  },
  {
    id: "j7",
    name: "Diamond Stud Earrings",
    price: "18500/-",
    material: "Platinum",
    gemstones: "Diamond",
    weight: "6g",
    theme: "Bridal",
    description:
      "Classic diamond stud earrings set in platinum. These brilliant-cut diamonds are perfectly matched for color and clarity, creating earrings that will be treasured for generations.",
    category: "Jewelry",
    discount: 10,
    cloudinaryPublicId: "29_fhw70j",
  },
  {
    id: "j8",
    name: "Vintage Brooch",
    price: "5400/-",
    material: "Antique Gold",
    gemstones: "Vintage Crystal",
    weight: "18g",
    theme: "Antique",
    description:
      "An exquisite vintage-inspired brooch featuring intricate metalwork and sparkling vintage crystals. This piece adds a touch of old-world glamour to any outfit.",
    category: "Jewelry",
    cloudinaryPublicId: "31_tjhlxu",
  },
]

// Decorations Data with themes
export const decorationsData: Product[] = [
  {
    id: "d1",
    name: "Geometric Terrarium Set",
    price: "4200/-",
    dimensions: 'Small: 5x5x5", Large: 8x8x8"',
    material_type: "Glass, Brass Frame",
    style: "Modern Geometric",
    theme: "Modern",
    description:
      "Set of two geometric glass terrariums with brass frames. Perfect for displaying succulents, air plants, or creating miniature landscapes. The clean lines and metallic accents add a contemporary touch to any space.",
    category: "Decorations",
    isBestSeller: true,
    cloudinaryPublicId: "9_dylewy",
  },
  {
    id: "d2",
    name: "Handwoven Kilim Cushion Cover",
    price: "1900/-",
    dimensions: '18" x 18"',
    material_type: "Wool, Cotton",
    style: "Ethnic Boho",
    theme: "Bohemian",
    description:
      "Authentic handwoven Kilim cushion cover with intricate geometric patterns. The rich colors and traditional craftsmanship add warmth and cultural depth to your living space.",
    category: "Decorations",
    cloudinaryPublicId: "11_ilunby",
  },
  {
    id: "d3",
    name: "Ceramic Vase Collection",
    price: "3600/-",
    dimensions: 'Heights: 8", 10", 12"',
    material_type: "Glazed Ceramic",
    style: "Contemporary",
    theme: "Contemporary",
    description:
      "A set of three ceramic vases in complementary earth tones. Each vase features a unique texture and glaze, creating visual interest when displayed together or separately.",
    category: "Decorations",
    isBestSeller: true,
    discount: 20,
    cloudinaryPublicId: "16_bcf0ku",
  },
  {
    id: "d4",
    name: "Macramé Wall Hanging",
    price: "2800/-",
    dimensions: '24" x 36"',
    material_type: "Natural Cotton Rope",
    style: "Bohemian",
    theme: "Bohemian",
    description:
      "Handcrafted macramé wall hanging featuring intricate knotwork and natural cotton fibers. This piece adds texture and bohemian charm to any wall space.",
    category: "Decorations",
    cloudinaryPublicId: "24_dzzswp",
  },
  {
    id: "d5",
    name: "Brass Candle Holders",
    price: "3200/-",
    dimensions: 'Various heights: 4", 6", 8"',
    material_type: "Solid Brass",
    style: "Art Deco",
    theme: "Vintage",
    description:
      "Set of three brass candle holders with art deco-inspired geometric designs. The warm brass finish adds elegance and sophistication to any dining or living space.",
    category: "Decorations",
    discount: 15,
    cloudinaryPublicId: "27_kts8sa",
  },
  {
    id: "d6",
    name: "Wooden Wall Clock",
    price: "4500/-",
    dimensions: '14" diameter',
    material_type: "Walnut Wood",
    style: "Scandinavian",
    theme: "Scandinavian",
    description:
      "Minimalist wall clock crafted from rich walnut wood. The clean design and natural wood grain make this timepiece both functional and decorative.",
    category: "Decorations",
    isBestSeller: true,
    cloudinaryPublicId: "30_enekmj",
  },
  {
    id: "d7",
    name: "Metal Wall Art Sculpture",
    price: "6800/-",
    dimensions: '36" x 24"',
    material_type: "Powder-Coated Steel",
    style: "Abstract Modern",
    theme: "Industrial",
    description:
      "Contemporary metal wall sculpture featuring flowing abstract forms. The matte black finish creates dramatic shadows and adds sophisticated artistic flair to any room.",
    category: "Decorations",
    cloudinaryPublicId: "32_j8c4fl",
  },
  {
    id: "d8",
    name: "Woven Storage Baskets",
    price: "2400/-",
    dimensions: "Set of 3: Small, Medium, Large",
    material_type: "Natural Seagrass",
    style: "Coastal",
    theme: "Natural",
    description:
      "Set of three woven seagrass baskets perfect for storage and organization. The natural texture and neutral color make them versatile additions to any room.",
    category: "Decorations",
    discount: 25,
    cloudinaryPublicId: "37_hxtis3",
  },
]

// --- Best Sellers Data ---
export const bestSellersData: Product[] = [
...paintingsData.filter((item) => item.isBestSeller),
...decorationsData.filter((item) => item.isBestSeller),
...jewelryData.filter((item) => item.isBestSeller),
].sort(() => 0.5 - Math.random()); // Shuffle best sellers for variety