"use client";
import Image from "next/image";
import React, { useState, useContext, useMemo } from "react";
import { GlobalContext } from "../Context/store";
import Form from "./Forma";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useRouter } from "next/navigation";

export const paintings = [
  {
    id: 1,
    title: "Mountain Symphony",
    price: "5000/-",
    size: "23.5x19.5 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "This is a beautiful painting depicting a serene mountain scene with a river flowing through it. The artist has captured the majestic mountains in the background, with their peaks stretching towards the sky. The river winds its way through the valley, reflecting the surrounding greenery and adding a sense of movement to the scene. Lush forests can be seen in the distance, adding depth and texture to the landscape. The painting is framed, enhancing its artistic presentation. The colors used are predominantly earthy tones, creating a peaceful and harmonious atmosphere. The attention to detail in this artwork is truly remarkable, making it a captivating piece for any art enthusiast."
  },
  {
    id: 2,
    title: "Forest's Embrace",
    price: "3500/-",
    size: "18.5x14.5 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The painting depicts a sunlit forest path. The painting is dominated by a lush green forest, with tall trees lining a winding path that leads into the distance. The sun shines brightly through the trees, creating a warm and inviting atmosphere. The light falls across the woodland floor, creating dappled light and shade effects. Scattered leaves lie on the ground, adding to the sense of tranquility and peace. The overall mood of the painting is one of serenity and beauty."
  },
  {
    id: 3,
    title: "River of Dreams",
    price: "3500/-",
    size: "18x15 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The painting depicts a serene, winding stream flowing through a lush forest. The painting is framed in a black frame and shows a stream flowing through a forest. The stream is a light blue color with white highlights that suggest sunlight reflecting on the water. The stream flows through the center of the painting from the top to the bottom, and it is surrounded by lush, green trees and bushes on both sides. The trees have dark green leaves and branches, and their foliage is so dense that it creates a sense of mystery and seclusion. The trees are adorned with white and pink flowers, which add a touch of color and vibrancy to the scene. The overall effect of the painting is one of peace and tranquility. The gentle curves of the stream, the dense foliage of the trees, and the soft colors all contribute to a sense of calm and serenity. The painting evokes a feeling of being lost in nature, far away from the hustle and bustle of everyday life."
  },
  {
    id: 4,
    title: "The Buddha's Gaze",
    price: "4500/-",
    size: "18.5x14.5 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The painting depicts a serene and contemplative Buddha. The painting is a close-up portrait of Buddha's face, set against a yellow background. The focus is on Buddha's face, with his eyes closed and a gentle expression. His nose is straight and his lips are slightly parted, giving the impression of peace and tranquility. The painting is done in an Impressionistic style, with thick brushstrokes and a textured surface. The mood of the painting is one of peace, serenity, and contemplation. The warm yellow background further enhances the sense of calmness and peace. "
  },
  {
    id: 5,
    title: "Whispering Waters",
    price: "5000/-",
    size: "23.5x19.5 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The painting depicts a peaceful scene of a river flowing through a lush green forest. The painting shows a rushing river flowing through a narrow gorge. The river is a bright, vibrant green, and the water is clear and sparkling. On either side of the river are steep cliffs covered in lush green foliage. The cliffs are a mix of brown and gray rock, and there are some patches of white that represent fallen snow or rock. The painting is done in a realistic style, and the colors are bright and cheerful. The atmosphere of the painting is peaceful and serene, and the mood is one of tranquility and beauty. The painting is a celebration of nature and the beauty of the natural world."
  },
  {
    id: 6,
    title: "Mountain's Melody",
    price: "4000/-",
    size: "23.5x15.5 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Framed",
    Sold: false,
    description: "This painting depicts a serene forest scene featuring a cascading stream. The composition is dominated by lush green foliage, creating a dense, verdant canopy that frames the water. The stream flows diagonally from the top center to the bottom left, with water tumbling over rocks and forming small white rapids. The artist has used various shades of green to depict the forest, giving depth and texture to the foliage. Darker greens and blacks highlight the rocks and shadows, contrasting with the vibrant green leaves. The painting is enclosed in a simple black frame, which focuses attention on the tranquil natural landscape."
  },
  {
    id: 7,
    title: "Green Haven",
    price: "4500/-",
    size: "23.5x17.5 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "This painting portrays a tranquil forest scene with trees standing in a shallow body of water. The foreground features several tall, brown tree trunks with varying shades of green foliage, reflecting in the calm water below. The water extends into the background, blending seamlessly with a lush green landscape. On the left side, there is a willow tree with long, drooping branches cascading towards the water. The artist has used a range of greens to depict the dense foliage, creating a sense of depth and richness in the forest. The painting is framed in a simple black frame, which accentuates the vibrant natural scenery. The overall atmosphere of the artwork is serene and peaceful, capturing the beauty of a forested wetland."
  },
  {
    id: 8,
    title: "Plumeria in Bloom",
    price: "2000/-",
    size: "11.5x11.5 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Framed",
    Sold: false,
    description: "This painting depicts a cluster of pink and white flowers with yellow centers, accompanied by lush green leaves. The flowers and leaves are painted with a high level of detail and realism, giving them a three-dimensional appearance. The background features a gradient of green and blue hues, suggesting a natural setting. The painting is framed with a black border and a white inner frame, which contrasts with the natural elements and makes them stand out. The outer frame has a wood-like texture with shades of brown, adding an earthy feel to the overall composition."
  },
  {
    id: 9,
    title: "Secret Of Woods",
    price: "3000/-",
    size: "15.5x11.5 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Framed",
    Sold: false,
    description: "This painting portrays a lush forest scene with tall trees, vibrant foliage, and a sunlit clearing. The tall trees dominate the composition, their trunks stretching upwards and creating a sense of depth. The forest floor is rich with various plants and flowers, showcasing a spectrum of greens, yellows, blues, and purples. The sunlight filters through the trees, casting dappled light and shadows across the landscape, enhancing the sense of realism. The background features a darker, dense part of the forest, gradually transitioning to a brighter, sunlit area in the foreground. The overall effect is serene and inviting, capturing the beauty and tranquility of a forest environment."
  },
  {
    id: 10,
    title: "Nature's Symphony",
    price: "3000/-",
    size: "17.5x7.5 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Framed",
    Sold: false,
    description: "This image depicts a framed painting of a waterfall in a forested area during autumn. The waterfall cascades down a rocky ledge, creating a white, frothy appearance as the water hits the lower pool. Surrounding the waterfall are trees with autumn foliage, predominantly in shades of orange and red, contrasting with the lush green background. The painting captures the serene and vibrant beauty of the natural scene. "
  },
  {
    id: 11,
    title: "Autumn Waterfall",
    price: "3500/-",
    size: "19.5x15.5 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Framed",
    Sold: false,
    description: "This painting depicts a serene natural landscape with a waterfall as the central focus. The waterfall cascades over a rocky ledge, creating a misty, white flow that contrasts beautifully with the surrounding scenery. In the foreground, three slender trees with textured trunks stand to the left, framing the view. Their branches stretch outwards, adorned with autumnal leaves in shades of red and orange. The leaves add a vibrant touch of color, indicating the season is fall. The background is a lush, green forest, with the foliage rendered in various shades of green, suggesting the density and depth of the woods. The greenery appears to be dotted with hints of autumn colors, creating a harmonious blend of different hues."
  },
  {
    id: 12,
    title: "Sunlit Serenity",
    price: "4500/-",
    size: "23.5x17.5 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Framed",
    Sold: false,
    description: "This image shows a framed painting of a peaceful forest scene. In the foreground, tall trees with thick trunks are depicted, their leaves creating a canopy overhead. Sunlight filters through the branches, casting dappled light onto the forest floor covered in green foliage and yellowed ground, suggesting either early fall or late summer. In the background, there is a calm body of water reflecting the greenery around it. The sunlight creates beams of light that illuminate the water and the surrounding vegetation, adding a serene and almost magical quality to the scene."
  },
  {
    id: 13,
    title: "Hibiscus Harmony",
    price: "1500/-",
    size: "11.5x11.5 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Framed",
    Sold: false,
    description: "This image shows a framed painting of flowers. The painting features a bouquet of flowers with purple and yellow petals and green leaves, set against a background with shades of green. The painting is bordered by a white edge, and the overall frame has a black border. The background outside the white border has a pattern with diagonal lines in brown and yellow hues."
  },
  {
    id: 14,
    title: "Roses in Bloom",
    price: "1500/-",
    size: "15x11 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Framed",
    Sold: false,
    description: "This picture depicts a framed artwork of roses. The picture depicts a bouquet of roses with purple and yellow petals and green foliage on a backdrop of green tones. The picture is surrounded by a white edge, and the overall frame has a black border. The backdrop outside the white border is patterned with diagonal lines in brown and yellow."
  },
  {
    id: 15,
    title: "Golden Autumn",
    price: "4500/-",
    size: "18x15 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "This image shows a framed painting of a forest scene. The artwork depicts a path leading through a dense forest, with tall trees on both sides. The trees are in various shades of green, yellow, and orange, suggesting a scene in autumn. Sunlight filters through the trees, casting rays of light and creating a serene atmosphere. The path is rendered in earthy tones, with shadows and light patches indicating the texture of the ground"
  },
  {
    id: 16,
    title: "Serene Riverbank",
    price: "2500/-",
    size: "15x11 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "This painting depicts a serene landscape featuring a winding path or stream surrounded by lush greenery and tall trees. The scene appears to be set in a forest or a park, with sunlight filtering through the leaves, casting dappled shadows on the ground and water. The trees, with their trunks and branches forming dynamic shapes, create a sense of depth and movement. The foliage is rendered in various shades of green, with hints of autumn colors like orange and brown, suggesting a transition between seasons. In the foreground, the path or stream reflects the surrounding greenery and the sky, adding a tranquil and reflective quality to the painting. The background shows a continuation of the forest, with trees becoming more blurred and blue, indicating distance and atmospheric perspective.The painting is framed in a dark, wooden frame that complements the earthy tones of the artwork, enhancing its natural and calming aesthetic. The overall composition and use of light and color evoke a peaceful and inviting atmosphere, encouraging the viewer to immerse themselves in the beauty of nature."
  },
  {
    id: 17,
    title: "Golden Rays",
    price: "3500/-",
    size: "21x15 inches",
    Medium: "Acrylic",
    Surface: "Paper",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "This painting depicts a sunlit forest scene with tall trees and a path or forest floor covered in leaves and greenery. The light from the sun streams through the canopy, creating dramatic rays of light that illuminate the scene and cast long shadows. The trees are tall and straight, with a mix of green and autumn-colored leaves, indicating a transitional season. The path or forest floor is lush with green foliage and scattered with fallen leaves, suggesting a peaceful and natural setting. The light filtering through the trees enhances the depth and perspective of the painting, drawing the viewer's eye towards the center where the light is brightest. The use of light and shadow creates a sense of movement and dynamism in the scene.The painting is framed in a simple, dark frame that complements the natural tones of the artwork. The overall composition and use of light create a serene and enchanting atmosphere, inviting the viewer to step into the tranquil beauty of the forest."
  },
  {
    id: 18,
    title: "Mountain Majesty",
    price: "1500/-",
    size: "11x7.5 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "This painting features a stunning mountain range with snow-covered peaks. The mountains, in shades of blue, white, and gray, showcase a rugged terrain with detailed textures.  In the foreground, a lush meadow with green and golden hues stretches across, dotted with small shrubs. The vibrant meadow contrasts beautifully with the cool tones of the mountains, highlighting the landscape's grandeur. A clear, pale blue sky completes the scene, evoking tranquility and awe. "
  },
  {
    id: 19,
    title: "A Beacon of Hope",
    price: "1500/-",
    size: "11x9 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "This painting depicts a single tall flower with delicate purple petals standing prominently against a vibrant, blurred green background. The background appears to have bokeh-like light effects, creating a sense of depth and illumination. The painting is enclosed in a simple black frame, which contrasts with the vivid colors of the artwork. The flower seems to be bathed in sunlight, enhancing its delicate beauty and making it the focal point of the composition."
  },
  {
    id: 20,
    title: "Golden Canopy's Embrace",
    price: "1500/-",
    size: "11x7.5 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "This painting portrays a forest scene viewed from the perspective of looking up towards the canopy. The scene is filled with the warm colors of autumn, with branches and leaves in shades of orange, yellow, and brown. The branches stretch upwards and outwards, creating a web-like pattern against a light sky. The light filtering through the leaves gives a sense of warmth and tranquility. The painting is framed with a simple black border that contrasts with the vibrant colors of the artwork, drawing the viewer's focus to the detailed depiction of the trees and leaves."
  },
  {
    id: 21,
    title: "Blue Blooms",
    price: "500/-",
    size: "11x7.5 inches",
    Medium: "Acrylic",
    Surface: "Paper",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "This painting features a vibrant bouquet of blue flowers with green leaves against a striking yellow background. The flowers are detailed with delicate petals and green centers, and the leaves are depicted with various shades of green, adding depth and texture to the composition. The contrast between the cool blue flowers and the warm yellow background creates a lively and cheerful effect. The artwork is framed in a simple black frame, which highlights the vivid colors and draws attention to the intricate details of the floral arrangement."
  },
  {
    id: 22,
    title: "The Wave's Roar",
    price: "3000/-",
    size: "9x7 inches",
    Medium: "Acrylic Palette knife",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The image is a framed painting depicting a large wave, reminiscent of the famous 'Great Wave off Kanagawa' by Hokusai. The wave is cresting with a significant curl, and the colors primarily include deep blues and greens, with some hints of yellow and white, creating a dynamic and textured effect. The background shows a subtle sky with light shades of yellow, suggesting either sunrise or sunset. The black frame contrasts with the vibrant colors of the painting, making the artwork stand out."
  },
  {
    id: 23,
    title: "Dancing Petals",
    price: "400/-",
    size: "9x7 inches",
    Medium: "Acrylic",
    Surface: "Paper",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The image is a framed painting of a floral subject. It features a stem with two large pink flowers and several buds. The flowers are detailed with varying shades of pink, giving them a sense of depth and realism. The leaves and stem are painted in vibrant green tones. The background is a solid bright yellow, which makes the pink flowers stand out vividly. The frame is black, which contrasts with the bright colors of the artwork."
  },
  {
    id: 24,
    title: "Petal Parade",
    price: "400/-",
    size: "9x7 inches",
    Medium: "Acrylic",
    Surface: "Paper",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The image is a framed painting featuring a cluster of bright orange flowers set against a dark background. The flowers are vibrant and detailed, with various shades of orange giving them depth and texture. They are surrounded by lush green leaves and stems, with some hints of brown foliage, adding to the natural feel of the composition. The background is predominantly dark, creating a stark contrast that makes the flowers stand out prominently. The frame is black, which complements the dark background of the painting."
  },
  {
    id: 25,
    title: "Bluebells",
    price: "400/-",
    size: "9x7 inches",
    Medium: "Acrylic",
    Surface: "Paper",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The image shows a framed painting of a blue floral arrangement against a green background. The painting features several blue flowers with green stems and leaves. The frame is black, providing a simple and elegant border to the artwork."
  },
  {
    id: 26,
    title: "Orange Dream",
    price: "400/-",
    size: "9x7 inches",
    Medium: "Acrylic",
    Surface: "Paper",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "This painting features a vibrant botanical subject against a striking purple background. The focal point is a cluster of orange flowers with delicate petals and yellow centers, which are meticulously detailed and radiate warmth. The flowers are surrounded by lush, green leaves that add a fresh, natural contrast to the rich purple backdrop. The composition is simple yet elegant, emphasizing the beauty of the flowers and the harmony between their colors and the background. The leaves are rendered with varying shades of green, giving them a sense of depth and dimension, while the flowers stand out vividly due to their bright and contrasting hue."
  },
  {
    id: 27,
    title: "Sun-Kissed Flowers",
    price: "400/-",
    size: "9x7 inches",
    Medium: "Acrylic",
    Surface: "Paper",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The image shows a framed painting of an arrangement of yellow and orange flowers against a dark background. The flowers are clustered together in the center, surrounded by green foliage that radiates outward. The painting is vibrant, with the bright colors of the flowers contrasting sharply against the dark background. The frame is black, complementing the overall aesthetic and focusing attention on the floral artwork."
  },
  {
    id: 28,
    title: "Cheerful Blooms",
    price: "500/-",
    size: "9x7 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The image depicts a framed painting featuring vibrant yellow and orange flowers. The flowers are rendered in a lively, somewhat abstract style with a focus on bright, warm colors. The background is white, which makes the colors of the flowers stand out. The frame is black, providing a stark contrast to the vivid colors of the painting. "
  },
  {
    id: 29,
    title: "Sunlit Meadow",
    price: "700/-",
    size: "9x7 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The image shows a framed artwork with a green-dominated background and floral elements. The frame is black, providing a contrasting border to the colorful painting."
  },
  {
    id: 30,
    title: "Whispering Wishes",
    price: "1000/-",
    size: "9x7 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The image depicts a framed painting of a vibrant nature scene. The foreground is filled with bright yellow flowers and lush green foliage. In the background, there are distant mountains under a clear blue sky with a few scattered clouds.The frame is black and has a simple, clean design. The overall composition conveys a sense of natural beauty and tranquility."
  },
  {
    id: 31,
    title: "Garden's Delight",
    price: "700/-",
    size: "9x7 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The image shows a framed artwork with a green-dominated background and floral elements. The frame is black, providing a contrasting border to the colorful painting."
  },
  {
    id: 32,
    title: "Nature's Embrace",
    price: "700/-",
    size: "9x7 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The image shows a framed artwork with a green-dominated background and floral elements. The frame is black, providing a contrasting border to the colorful painting."
  },
  {
    id: 33,
    title: "Blooming Beauty",
    price: "700/-",
    size: "9x7 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The image shows a framed artwork with a green-dominated background and floral elements. The frame is black, providing a contrasting border to the colorful painting."
  },
  {
    id: 34,
    title: "Field of Dreams",
    price: "700/-",
    size: "9x7 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The image shows a framed artwork with a green-dominated background and floral elements. The frame is black, providing a contrasting border to the colorful painting."
  },
  {
    id: 35,
    title: "Floral Fusion",
    price: "700/-",
    size: "9x7 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The image shows a framed artwork with a green-dominated background and floral elements. The frame is black, providing a contrasting border to the colorful painting."
  },
  {
    id: 36,
    title: "Serene Sanctuary",
    price: "700/-",
    size: "9x7 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The image shows a framed artwork with a green-dominated background and floral elements. The frame is black, providing a contrasting border to the colorful painting."
  },
  {
    id: 37,
    title: "Wish Upon a Seed",
    price: "1000/-",
    size: "9x7 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The image features a framed painting of a single, delicate dandelion seed head with dew drops clinging to its thin strands. The background is a soft blend of pastel colors, primarily light blue, orange, and green, creating a dreamy and ethereal atmosphere. The frame is black, which contrasts with the light and airy feel of the artwork."
  },
  {
    id: 38,
    title: "Blooming Beauty",
    price: "500/-",
    size: "9x7 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The image is a photograph of a framed painting featuring vibrant flowers. The flowers are painted in shades of blue and red with green leaves surrounding them. The background is white, which highlights the bright colors of the flowers. The frame is black and contrasts with the colorful artwork inside. The painting style appears to be impressionistic, with soft brush strokes creating a sense of movement and texture in the petals and leaves."
  },
  {
    id: 39,
    title: "Flutter of Joy",
    price: "500/-",
    size: "9x7 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The image is a photograph of another framed painting featuring bright orange flowers and butterflies. The painting has a white background, which makes the vibrant colors of the flowers and butterflies stand out. The flowers are depicted with various shades of orange and yellow, and the butterflies are in matching colors, creating a harmonious composition. Green leaves and stems add contrast and depth to the scene. The black frame surrounding the painting provides a strong contrast to the bright and colorful artwork."
  },
  {
    id: 40,
    title: "Blooming Brilliant",
    price: "250/-",
    size: "7x5 inches",
    Medium: "Acrylic",
    Surface: "Paper",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The image is a photograph of a framed painting depicting yellow and orange flowers with green foliage. The flowers are clustered together and arranged in a bouquet-like composition, with some blossoms fully open and others in various stages of blooming. The background is a light grey, which contrasts nicely with the vibrant colors of the flowers and leaves.The overall style of the painting is delicate and detailed, focusing on the natural beauty of the flowers."
  },
  {
    id: 41,
    title: "Nature's Innocence",
    price: "250/-",
    size: "7x5 inches",
    Medium: "Acrylic",
    Surface: "Paper",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The image depicts a framed painting of white roses with green leaves against a light-colored background. The frame is black and has a simple, clean design. The overall appearance of the painting is vibrant, with the white roses and green leaves standing out vividly against the background."
  },
  {
    id: 42,
    title: "Wave of Change",
    price: "20,000/-",
    size: "2x1.2 meters",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Stretched Canvas",
    Sold: true,
    description: "The image depicts a large, powerful ocean wave. The wave is captured in mid-crest, with rich shades of blue ranging from deep navy to lighter turquoise, giving it a dynamic and realistic appearance. The frothy white surf at the top and around the wave adds to the sense of motion and energy. The background features a lighter sky-blue color, likely representing the sky and the ocean meeting at the horizon. The artwork's details and use of color convey the majesty and force of the sea."
  },
  {
    id: 43,
    title: "Where Land Meets Sea",
    price: "2000/-",
    size: "7x5 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: true,
    description: "The image is a painting of a scenic coastal landscape. It features a bright and cheerful foreground with white and yellow flowers among green grass. Beyond the grassy area, there's a rocky cliff covered with patches of green vegetation. The cliff meets a sparkling blue ocean with gentle waves and some white foam. The sky above is light blue with soft, wispy clouds, creating a serene and peaceful atmosphere. The overall composition is vibrant and detailed, capturing the beauty of a coastal scene."
  },
  {
    id: 44,
    title: "Soulful Stare",
    price: "7000/-",
    size: "24x18 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: true,
    description: "The image is a monochromatic painting of a horse's head and upper body. The horse is depicted in shades of black and grey, with fine details emphasizing its strong features and flowing mane. The background is a gradient of light grey, which contrasts with the dark figure of the horse, making it stand out prominently. The horse's expression is calm and somewhat introspective, and the overall composition captures the elegance and power of the animal. The use of light and shadow adds depth and dimension to the painting."
  },
  {
    id: 45,
    title: "Autumn's Embrace",
    price: "5000/-",
    size: "23x18 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: true,
    description: "The image is a vibrant painting of an autumn forest scene. The trees are depicted with leaves in various shades of orange, red, and yellow, capturing the essence of fall. The ground is covered in a blanket of golden leaves, and the trunks of the trees are sturdy and textured, suggesting age and character. The background has a soft, hazy quality, with more trees fading into the distance. The play of light and shadow gives the painting a warm and inviting feel, evoking the crisp, colorful atmosphere of a sunny autumn day."
  },
  {
    id: 46,
    title: "Whispering Bamboos",
    price: "5500/-",
    size: "24x17 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: true,
    description: "The painting depicts a serene bamboo forest with tall, slender bamboo stalks rising towards the sky. The perspective is from the ground looking up, emphasizing the height and majesty of the bamboo. The forest is lush with varying shades of green, indicating dense foliage. Sunlight filters through the canopy, creating a soft, dappled light effect that adds to the tranquil atmosphere. The details in the painting, from the texture of the bamboo to the interplay of light and shadow, convey a sense of peacefulness and natural beauty. The overall composition invites the viewer to feel immersed in the calm and refreshing environment of the bamboo forest."
  },
  {
    id: 47,
    title: "Harmony in Chaos",
    price: "15,000/-",
    size: "2.5x2 meters",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Stretched Canvas",
    Sold: true,
    description: "The painting is an abstract expressionist work with vibrant colors and bold brushstrokes. It is dominated by warm and cool tones on either side of a central, vertical, white strip. The left side features a vibrant mix of red, orange, and yellow, while the right side showcases shades of blue and green. The colors blend and overlap, creating a sense of movement and energy."
  },
  {
    id: 48,
    title: "Mountain Retreat",
    price: "4000/-",
    size: "24x18 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "A serene painting of a house nestled in a lush forest setting. The artwork showcases a tranquil scene with vibrant green grass and trees surrounding the quaint house. The colors of the painting include shades of dark green, light green, and neutral tones. The composition is peaceful and inviting, evoking a sense of calm and tranquility. The attention to detail in the artwork is evident, with intricate brushstrokes capturing the beauty of nature. This painting would be a lovely addition to any art collection, capturing the essence of a peaceful forest retreat."
  },
  {
    id: 49,
    title: "Mirror of Autumn",
    price: "7000/-",
    size: "28x24 inches",
    Medium: "Oil",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: true,
    description: "The painting depicts a beautiful autumnal scene with a calm river reflecting the vibrant colors of the surrounding trees.The central focus of the painting is a tranquil river that stretches across the canvas.The water is still and reflects the colors of the trees on its surface.The banks of the river are lined with a variety of trees in their autumnal glory.The leaves showcase a range of colors, including deep reds, golden yellows, and bright greens."
  },
  {
    id: 50,
    title: "Secret Waterfall",
    price: "5000/-",
    size: "28x26 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: true,
    description: "The painting depicts a tranquil forest scene with a cascading waterfall.The central focus of the painting is a small, meandering river flowing through a lush forest.The river is calm and reflects the sunlight on its surface, creating a shimmering effect.A beautiful waterfall cascades over rocks in the middle of the river, adding a sense of movement and dynamism to the scene.The banks of the river are covered in a variety of lush green trees and foliage.The sunlight filters through the leaves, casting dappled shadows on the ground and creating a warm and inviting atmosphere."
  },
  {
    id: 51,
    title: "Autumnal Symphony",
    price: "5000/-",
    size: "24x24 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: true,
    description: "The painting depicts a beautiful waterfall scene in a lush, autumnal forest. The central focus of the painting is a cascading waterfall, surrounded by a vibrant array of autumn foliage.The water flows from a higher elevation, creating a sense of movement and energy.The surrounding trees showcase a range of colors, including deep reds, golden yellows, and bright greens.The sunlight filters through the leaves, casting dappled shadows on the ground and creating a warm and inviting atmosphere."
  },
  {
    id: 52,
    title: "Snowy Summit",
    price: "5000/-",
    size: "28x24 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: true,
    description: "The painting depicts a serene lakeside scene with a majestic mountain in the background.The central focus of the painting is a calm lake, reflecting the clear blue sky and the snow-capped mountain in the distance.The lake is surrounded by lush green trees and foliage, creating a sense of peace and tranquility.A majestic mountain dominates the background, its peak covered in snow and contrasting beautifully with the blue sky.The sky is painted with soft, wispy clouds, adding depth and dimension to the scene."
  },
  {
    id: 53,
    title: "Golden Hour Glory",
    price: "5000/-",
    size: "28x26 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: true,
    description: "The painting depicts a beautiful autumnal scene along a winding path through a vibrant forest.The central focus of the painting is a path that winds through a lush forest bathed in warm autumnal light.The trees on both sides of the path are ablaze with vibrant colors, including deep reds, golden yellows, and bright oranges.Sunlight filters through the leaves, casting dappled shadows on the path and creating a warm and inviting atmosphere."
  },
  {
    id: 54,
    title: "Woodland Reverie",
    price: "5000/-",
    size: "24x18 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: true,
    description: "The painting depicts a serene forest path winding through a lush, green forest.The central focus of the painting is a meandering path that leads the viewer deeper into the forest.The path is covered in fallen leaves and twigs, suggesting a sense of tranquility and solitude.Tall trees line both sides of the path, their leaves creating a dappled sunlight effect on the forest floor.The foliage is a vibrant green, suggesting a springtime or early summer setting."
  },
  {
    id: 55,
    title: "Enchanted Forest",
    price: "5000/-",
    size: "24x20 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: false,
    description: "The painting depicts a sun-dappled path winding through a lush, green forest. The towering trees create a sense of mystery and depth, while the vibrant flowers lining the path add a touch of whimsy.A forest scene with a central path. Peaceful and serene. Predominantly green, with pops of red from the flowers and sunlight filtering through the leaves. Realistic with a touch of impressionism in the depiction of the trees and sunlight.Not explicitly stated, but the painting evokes a sense of calm and wonder."
  },
  {
    id: 56,
    title: "Enchanted Forest",
    price: "5000/-",
    size: "24x20 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: true,
    description: "A symphony of sunlight filters through a verdant canopy, illuminating the towering trunks of a vibrant bamboo forest. The scene invites the viewer to gaze upwards, immersing themselves in the tranquility and majesty of nature.A forest viewed from a low perspective, emphasizing the height and density of the trees. Peaceful, serene, and awe-inspiring. Predominantly green in various shades, with pops of bright sunlight filtering through the leaves.Realistic with a touch of impressionism in the depiction of light and shadow.The painting evokes a sense of wonder and appreciation for the natural world."
  },
  {
    id: 57,
    title: "Mediterranean Moment",
    price: "3500/-",
    size: "24x20 inches",
    Medium: "Acrylic",
    Surface: "Canvas",
    ToBeDeliveredAs: "Glass Framed",
    Sold: true,
    description: "The painting depicts a charming alleyway in a Mediterranean village. The scene is bathed in warm sunlight, creating a cheerful and inviting atmosphere.The buildings are constructed from weathered stone and feature arched doorways and windows with vibrant turquoise shutters. Small balconies adorned with potted plants peek out from the upper stories. A narrow, cobblestone path winds its way through the alley, lined with lush greenery and colorful flowers spilling from terracotta pots.Small trees and shrubs add a touch of nature to the scene, while vibrant flowers in various colors create pops of color throughout. Warm sunlight streams into the alley, casting long shadows and highlighting the textures of the stone walls."
  }
];



const Modal = ({ isVisible, setIsVisible, src, onClose, Desktop }) => {
  

  const id = useMemo(
    () => {
      const match = src.match(/\/(\d+)\.jpg/);
      return match ? parseInt(match[1], 10)-1 : null;
    },
    [isVisible]
  );

  


  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [showForm, setShowForm] = useState(false);
  const { cart, setCart, cartStatus, setCartStatus,setId,setSrc } = useContext(GlobalContext);
  const router = useRouter();

  if (!isVisible) {
    return null;
  }

  const handleClick = (e) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };

  const closeForm = () => {
    setShowForm(false);
  };
  // console.log(src)
  //cart logic

  const add = async (num) => {
    setCart([...cart, num]);
  };

  const remove = async (num) => {
    setCart(cart.filter((a) => a !== num));
  };

  // console.log(cart)
  if (isDesktop) {
    return (
      <>
        <div
          id="wrapper"
          className="z-40 fixed inset-0 flex flex-col bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
          onClick={handleClick}
        >
          <div className="flex flex-col rounded-sm bg-slate-50 ">
            <button
              className=" text-xl place-self-end mr-8"
              onClick={() => {
                onClose();
              }}
            >
              x
            </button>
            <div className="w-fit flex  flex-col md:p-4   md:flex-row">
              <div id="modal-image" className="bg-white flex flex-col items-center my-auto mx-2 p-2 rounded">
                <Image
                  alt="painting"
                  src={src}
                  height="300"
                  width="250"
                  loading="eager"
                  priority={true}
                  className="hover:cursor-grabbing h-fit w-full object-cover object-left-top rounded-lg gap-10   "
                />
                <div className="">
                <span className="text-xl italic">{paintings[id].title}</span>
                </div>
                {paintings[id].Sold?<Image
                 alt="sold"
                 src={"/sold.jpg"}
                 width={100}
                 height={100}
                 loading="eager"
                 className="self-center my-auto"
                />:null
              }
              </div>
              <div className="flex flex-col">
                <Tabs defaultValue="Details" className="w-[400px]">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="Description">Description</TabsTrigger>
                    <TabsTrigger value="Details">Details</TabsTrigger>
                  </TabsList>
                  <TabsContent value="Details">
                    <Card>
                      <CardContent className="space-y-2">
                        <div className="space-y-1 m-1 my-2">
                          <Label>Size:</Label>
                          <span className="ml-2">{paintings[id].size}</span>
                        </div>
                        <div className="space-y-1 m-1">
                          <Label>Price:</Label>{" "}
                          <span className="ml-2">₹{paintings[id].price} + Shipping Charges</span>
                        </div>
                        <div className="space-y-1 m-1">
                          <Label>Medium:</Label>
                          <span className="ml-2">{paintings[id].Medium}</span>
                        </div>
                        <div className="space-y-1 m-1">
                          <Label>Surface:</Label>
                          <span className="ml-2">{paintings[id].Surface}</span>
                        </div>

                        <div className="space-y-1 m-1">
                          <Label>To be delivered as:</Label>
                          <span className="ml-2">{paintings[id].ToBeDeliveredAs}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="Description">
                    <Card>
                      <CardContent className="space-y-2">
                        <div className="space-y-1 m-1">
                          <Label>{paintings[id].description}</Label>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
                <div className="flex flex-col">
                  <Button
                    onClick={() => {
                      setShowForm(true);
                    }}
                    className="m-2 p-1"
                  >
                    Enquire
                  </Button>
                  {!cart.includes(src) ? (
                    <Button
                      onClick={() => {
                        add(src);
                        // console.log(cart);
                      }}
                      className="m-1 p-4"
                    >
                      Add To Cart
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        remove(src);
                        // console.log(cart);
                      }}
                      className="m-1 p-4"
                    >
                      Remove From Cart
                    </Button>
                  )}

                  <Button
                    onClick={() => {
                      setShowForm(true);
                    }}
                    className="m-1 p-4"
                  >
                    Make An Offer to the Artist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Form
          id={id}
          src={src}
          price={paintings[id].price}
          size={paintings[id].size}
          showForm={showForm}
          setShowForm={setShowForm}
          closeForm={closeForm}
        />
      </>
    );
  }
  return (
    <>
      <Form
        id={id}
        src={src}
        price={paintings[id].price}
        size={paintings[id].size}
        showForm={showForm}
        setShowForm={setShowForm}
        closeForm={closeForm}
      />
      <Drawer open={isVisible} onOpenChange={setIsVisible}>
        <Tabs defaultValue="Details">
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="Description">Description</TabsTrigger>
                  <TabsTrigger value="Details">Details</TabsTrigger>
                </TabsList>
              </DrawerTitle>
              <DrawerDescription>
                <TabsContent value="Details">
                  <Card>
                    <CardContent className="pb-2 space-y-1 text-lg">
                      <div
                        id="modal-image"
                        className="bg-white m-2 p-2 rounded"
                      >
                        <Image
                          alt="painting"
                          src={src}
                          height="50"
                          width="250"
                          loading="eager"
                          priority={true}
                          className="hover:cursor-grabbing h-fit w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                        />
                      </div>
                      <div className="mx-1 my-auto">
                        <span className="text-xl italic">{paintings[id].title}</span>
                      </div>
                      <div className="space-y-1 m-1 my-2">
                        <Label className="text-lg">Size:</Label>
                        <span className="ml-1 text-xl">{paintings[id].size}</span>
                      </div>
                      <div className="space-y-1 m-1">
                        <Label className="text-lg">Price:</Label>
                        <span className="ml-1 text-xl">₹{paintings[id].price} + Shipping Charges</span>
                      </div>
                      <div className="space-y-1 m-1">
                        <Label className="text-lg">Medium:</Label>
                        <span className="ml-1 text-xl">{paintings[id].Medium}</span>
                      </div>
                      <div className="space-y-1 m-1">
                        <Label className="text-lg">Surface:</Label>
                        <span className="ml-1 text-xl">{paintings[id].Surface}</span>
                      </div>

                      <div className="space-y-0.5 m-1">
                        <Label className="text-lg">To be delivered as:</Label>
                        <span className="ml-1 text-xl">{paintings[id].ToBeDeliveredAs}</span>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="Description">
                  <Card>
                    <CardContent className="space-y-2">
                      <Label className="m-1">
                        <span className="text-[15px]">{paintings[id].description}</span>
                      </Label>
                    </CardContent>
                  </Card>
                </TabsContent>
              </DrawerDescription>
            </DrawerHeader>

            <DrawerFooter className="pt-0 m-0">
              {!paintings[id].Sold ?
              <>
                <Button  onClick={()=>{
                              setId(id);
                              setSrc(src);
                                router.push("Gallery/Enquire")
                            }} className=" p-1">Enquire</Button>
              
              
              {!cart.includes(src) ? (
                <Button
                  onClick={() => {
                    add(src);
                    // console.log(cart);
                  }}
                  className=" p-1"
                >
                  Add To Cart
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    remove(src);
                    // console.log(cart);
                  }}
                  className=" p-1"
                >
                  Remove From Cart
                </Button>
              )}
              </>
              :
              <Image
              alt="sold"
              src={"/sold.jpg"}
              width={90}
              height={90}
              loading="eager"
              className="self-center my-auto"
             />
            }
            
              
              {/* <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose> */}
              <Button onClick={()=>{
                               setId(id);
                               setSrc(src);
                               router.push("Gallery/Enquire")
                            }} className=" p-1">Make An Offer to the Artist</Button>
            </DrawerFooter>
          </DrawerContent>
        </Tabs>
      </Drawer>
    </>
  );
};

export default Modal;

