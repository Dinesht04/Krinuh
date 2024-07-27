"use client"
import Image from 'next/image';
import React, { useState,useContext } from 'react'
import {GlobalContext} from '../Context/store'
import Form from './Form'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


export const paintings = [
    { id: 1, title: "Acrylic Painting on canvas (glass frame)", price: "5000/-", size: "23.5x19.5 inches", description: "This is a beautiful painting depicting a serene mountain scene with a river flowing through it. The artist has captured the majestic mountains in the background, with their peaks stretching towards the sky. The river winds its way through the valley, reflecting the surrounding greenery and adding a sense of movement to the scene. Lush forests can be seen in the distance, adding depth and texture to the landscape. The painting is framed, enhancing its artistic presentation. The colors used are predominantly earthy tones, creating a peaceful and harmonious atmosphere. The attention to detail in this artwork is truly remarkable, making it a  captivating piece for any art enthusiast" },
    { id: 2, title: "Acrylic Painting on canvas (glass framed)", price: "3500/-", size: "18.5x14.5 inches", description: "A serene painting of a house nestled in a lush forest setting. The artwork showcases a tranquil scene with vibrant green grass and trees surrounding the quaint house. The colors of the painting include shades of dark green, light green, and neutral tones. The composition is peaceful and inviting, evoking a sense of calm and tranquility. The attention to detail in the artwork is evident, with intricate brushstrokes capturing the beauty of nature. This painting would be a lovely addition to any art collection, capturing the essence of a peaceful forest retreat." },
    { id: 3, title: "Acrylic Painting on canvas (glass framed)", price: "3500/-", size: "18x15 inches", description: "The painting depicts a sunlit forest path. The painting is dominated by a lush green forest, with tall trees lining a winding path that leads into the distance. The sun shines brightly through the trees, creating a warm and inviting atmosphere. The light falls across the woodland floor, creating dappled light and shade effects. Scattered leaves lie on the ground, adding to the sense of tranquility and peace. The overall mood of the painting is one of serenity and beauty." },
    { id: 4, title: "Acrylic Painting on canvas (glass framed)", price: "4500/-", size: "18.5x14.5 inches", description: "The painting depicts a serene, winding stream flowing through a lush forest. The painting is framed in a black frame and shows a stream flowing through a forest. The stream is a light blue color with white highlights that suggest sunlight reflecting on the water. The stream flows through the center of the painting from the top to the bottom, and it is surrounded by lush, green trees and bushes on both sides. The trees have dark green leaves and branches, and their foliage is so dense that it creates a sense of mystery and seclusion. The trees are adorned with white and pink flowers, which add a touch of color and vibrancy to the scene. The overall effect of the painting is one of peace and tranquility. The gentle curves of the stream, the dense foliage of the trees, and the soft colors all contribute to a sense of calm and serenity. The painting evokes a feeling of being lost in nature, far away from the hustle and bustle of everyday life." },
    { id: 5, title: "Acrylic Painting on canvas (glass framed)", price: "5000/-", size: "23.5x19.5 inches", description: "The painting depicts a serene and contemplative Buddha. The painting is a close-up portrait of Buddha's face, set against a yellow background. The focus is on Buddha's face, with his eyes closed and a gentle expression. His nose is straight and his lips are slightly parted, giving the impression of peace and tranquility. The painting is done in an Impressionistic style, with thick brushstrokes and a textured surface. The mood of the painting is one of peace, serenity, and contemplation. The warm yellow background further enhances the sense of calmness and peace.  The artist's signature is visible in the bottom right corner of the painting." },
    { id: 6, title: "Acrylic Painting on canvas (framed)", price: "4500/-", size: "23.5x15.5 inches", description: "The painting depicts a peaceful scene of a river flowing through a lush green forest. The painting shows a rushing river flowing through a narrow gorge. The river is a bright, vibrant green, and the water is clear and sparkling. On either side of the river are steep cliffs covered in lush green foliage. The cliffs are a mix of brown and gray rock, and there are some patches of white that represent fallen snow or rock. The painting is done in a realistic style, and the colors are bright and cheerful. The atmosphere of the painting is peaceful and serene, and the mood is one of tranquility and beauty. The painting is a celebration of nature and the beauty of the natural world." },
    { id: 7, title: "Acrylic Painting on canvas (framed)", price: "3500/-", size: "23.5x17.5 inches", description: "This painting depicts a serene forest scene featuring a cascading stream. The composition is dominated by lush green foliage, creating a dense, verdant canopy that frames the water. The stream flows diagonally from the top center to the bottom left, with water tumbling over rocks and forming small white rapids. The artist has used various shades of green to depict the forest, giving depth and texture to the foliage. Darker greens and blacks highlight the rocks and shadows, contrasting with the vibrant green leaves. The painting is enclosed in a simple black frame, which focuses attention on the tranquil natural landscape." },
    { id: 8, title: "Acrylic Painting on canvas (framed)", price: "2000/-", size: "11.5x11.5 inches", description: "This painting portrays a tranquil forest scene with trees standing in a shallow body of water. The foreground features several tall, brown tree trunks with varying shades of green foliage, reflecting in the calm water below. The water extends into the background, blending seamlessly with a lush green landscape. On the left side, there is a willow tree with long, drooping branches cascading towards the water. The artist has used a range of greens to depict the dense foliage, creating a sense of depth and richness in the forest. The painting is framed in a simple black frame, which accentuates the vibrant natural scenery. The overall atmosphere of the artwork is serene and peaceful, capturing the beauty of a forested wetland." },
    { id: 9, title: "Acrylic Painting on canvas (framed)", price: "3000/-", size: "15.5x11.5 inches", description: "This painting depicts a cluster of pink and white flowers with yellow centers, accompanied by lush green leaves. The flowers and leaves are painted with a high level of detail and realism, giving them a three-dimensional appearance. The background features a gradient of green and blue hues, suggesting a natural setting. The painting is framed with a black border and a white inner frame, which contrasts with the natural elements and makes them stand out. The signature of the artist, 'Shweta Tyagi' is visible in the bottom right corner. The outer frame has a wood-like texture with shades of brown, adding an earthy feel to the overall composition." },
    { id: 10, title: "Acrylic Painting on canvas (framed)", price: "3000/-", size: "17.5x7.5 inches", description: "This painting portrays a lush forest scene with tall trees, vibrant foliage, and a sunlit clearing. The tall trees dominate the composition, their trunks stretching upwards and creating a sense of depth. The forest floor is rich with various plants and flowers, showcasing a spectrum of greens, yellows, blues, and purples. The sunlight filters through the trees, casting dappled light and shadows across the landscape, enhancing the sense of realism. The background features a darker, dense part of the forest, gradually transitioning to a brighter, sunlit area in the foreground. The painting is framed with a black border, and the artist's signature, 'Shaneika Tuazon', is visible in the bottom right corner. The overall effect is serene and inviting, capturing the beauty and tranquility of a forest environment." },
    { id: 11, title: "Acrylic Painting on canvas (framed)", price: "3500/-", size: "19.5x15.5 inches", description: "This image depicts a framed painting of a waterfall in a forested area during autumn. The waterfall cascades down a rocky ledge, creating a white, frothy appearance as the water hits the lower pool. Surrounding the waterfall are trees with autumn foliage, predominantly in shades of orange and red, contrasting with the lush green background. The painting captures the serene and vibrant beauty of the natural scene. The artist's signature is visible in the lower right corner, indicating the painting was completed in 2023." },
    { id: 12, title: "Acrylic Painting on canvas (framed)", price: "4500/-", size: "23.5x17.5 inches", description: "This image depicts a framed painting of a waterfall in a forested area during autumn. The waterfall cascades down a rocky ledge, creating a white, frothy appearance as the water hits the lower pool. Surrounding the waterfall are trees with autumn foliage, predominantly in shades of orange and red, contrasting with the lush green background. The painting captures the serene and vibrant beauty of the natural scene. The artist's signature is visible in the lower right corner, indicating the painting was completed in 2023." },
    { id: 13, title: "Acrylic Painting on canvas (framed)", price: "1000/-", size: "11.5x11.5 inches", description: "This image shows a framed painting of a peaceful forest scene. In the foreground, tall trees with thick trunks are depicted, their leaves creating a canopy overhead. Sunlight filters through the branches, casting dappled light onto the forest floor covered in green foliage and yellowed ground, suggesting either early fall or late summer.In the background, there is a calm body of water reflecting the greenery around it. The sunlight creates beams of light that illuminate the water and the surrounding vegetation, adding a serene and almost magical quality to the scene. The artist's signature is visible in the lower right corner of the painting, indicating the artwork was completed in 2023." },
    { id: 14, title: "Acrylic Painting on canvas (framed)", price: "1500/-", size: "15x11 inches", description: "This image shows a framed painting of flowers. The painting features a bouquet of flowers with purple and yellow petals and green leaves, set against a background with shades of green. The painting is bordered by a white edge, and the overall frame has a black border. The background outside the white border has a pattern with diagonal lines in brown and yellow hues. There is a signature on the bottom right corner of the painting, which appears to be by the artist." },
    { id: 15, title: "Acrylic Painting on canvas (framed)", price: "4500/-", size: "18x15 inches", description: "This image shows a framed painting of a forest scene. The artwork depicts a path leading through a dense forest, with tall trees on both sides. The trees are in various shades of green, yellow, and orange, suggesting a scene in autumn. Sunlight filters through the trees, casting rays of light and creating a serene atmosphere. The path is rendered in earthy tones, with shadows and light patches indicating the texture of the ground. The frame is black, and the painting is signed by the artist in the bottom right corner." },

    { id: 16, title: "Acrylic Painting on canvas (framed)", price: "2500/-", size: "15x11 inches", description: "This image shows a framed painting of a forest scene. The artwork depicts a path leading through a dense forest, with tall trees on both sides. The trees are in various shades of green, yellow, and orange, suggesting a scene in autumn. Sunlight filters through the trees, casting rays of light and creating a serene atmosphere. The path is rendered in earthy tones, with shadows and light patches indicating the texture of the ground. The frame is black, and the painting is signed by the artist in the bottom right corner." },
    { id: 17, title: "Acrylic Painting on paper (glass framed)", price: "3500/-", size: "21x15 inches", description: "This painting depicts a serene landscape featuring a winding path or stream surrounded by lush greenery and tall trees. The scene appears to be set in a forest or a park, with sunlight filtering through the leaves, casting dappled shadows on the ground and water. The trees, with their trunks and branches forming dynamic shapes, create a sense of depth and movement. The foliage is rendered in various shades of green, with hints of autumn colors like orange and brown, suggesting a transition between seasons.In the foreground, the path or stream reflects the surrounding greenery and the sky, adding a tranquil and reflective quality to the painting. The background shows a continuation of the forest, with trees becoming more blurred and blue, indicating distance and atmospheric perspective.The painting is framed in a dark, wooden frame that complements the earthy tones of the artwork, enhancing its natural and calming aesthetic. The overall composition and use of light and color evoke a peaceful and inviting atmosphere, encouraging the viewer to immerse themselves in the beauty of nature." },
    { id: 18, title: "Acrylic Painting on canvas (glass framed)", price: "1500/-", size: "11x7.5 inches", description: "This painting depicts a sunlit forest scene with tall trees and a path or forest floor covered in leaves and greenery. The light from the sun streams through the canopy, creating dramatic rays of light that illuminate the scene and cast long shadows. The trees are tall and straight, with a mix of green and autumn-colored leaves, indicating a transitional season.The path or forest floor is lush with green foliage and scattered with fallen leaves, suggesting a peaceful and natural setting. The light filtering through the trees enhances the depth and perspective of the painting, drawing the viewer's eye towards the center where the light is brightest. The use of light and shadow creates a sense of movement and dynamism in the scene.The painting is framed in a simple, dark frame that complements the natural tones of the artwork. The overall composition and use of light create a serene and enchanting atmosphere, inviting the viewer to step into the tranquil beauty of the forest. The signature of the artist is visible in the lower right corner, adding a personal touch to the artwork." },
    { id: 19, title: "Acrylic Painting on canvas (glass framed)", price: "1500/-", size: "11x9 inches", description: "This painting features a stunning mountain range with snow-covered peaks. The mountains, in shades of blue, white, and gray, showcase a rugged terrain with detailed textures. In the foreground, a lush meadow with green and golden hues stretches across, dotted with small shrubs. The vibrant meadow contrasts beautifully with the cool tones of the mountains, highlighting the landscape's grandeur.A clear, pale blue sky completes the scene, evoking tranquility and awe. The painting is framed in a simple black frame, with the artist's signature in the lower right corner." },
    { id: 20, title: "Acrylic Painting on canvas (glass framed)", price: "1500/-", size: "11x7 inches", description: "This painting depicts a single tall flower with delicate purple petals standing prominently against a vibrant, blurred green background. The background appears to have bokeh-like light effects, creating a sense of depth and illumination. The painting is enclosed in a simple black frame, which contrasts with the vivid colors of the artwork. The flower seems to be bathed in sunlight, enhancing its delicate beauty and making it the focal point of the composition" },
    { id: 21, title: "Acrylic Painting on paper (glass framed)", price: "500/-", size: "11x7.5 inches", description: "This painting portrays a forest scene viewed from the perspective of looking up towards the canopy. The scene is filled with the warm colors of autumn, with branches and leaves in shades of orange, yellow, and brown. The branches stretch upwards and outwards, creating a web-like pattern against a light sky. The light filtering through the leaves gives a sense of warmth and tranquility. The painting is framed with a simple black border that contrasts with the vibrant colors of the artwork, drawing the viewer's focus to the detailed depiction of the trees and leaves." },
    { id: 22, title: "Acrylic Painting on canvas (glass framed)", price: "2000/-", size: "9x7 inches", description: "This painting features a vibrant bouquet of blue flowers with green leaves against a striking yellow background. The flowers are detailed with delicate petals and green centers, and the leaves are depicted with various shades of green, adding depth and texture to the composition. The contrast between the cool blue flowers and the warm yellow background creates a lively and cheerful effect. The artwork is framed in a simple black frame, which highlights the vivid colors and draws attention to the intricate details of the floral arrangement. The painting also appears to be signed by the artist in the bottom right corner." },
    { id: 23, title: "Acrylic Painting on paper (glass framed)", price: "400/-", size: "9x7 inches", description: "The image is a framed painting depicting a large wave, reminiscent of the famous 'Great Wave off Kanagawa' by Hokusai. The wave is cresting with a significant curl, and the colors primarily include deep blues and greens, with some hints of yellow and white, creating a dynamic and textured effect. The background shows a subtle sky with light shades of yellow, suggesting either sunrise or sunset. The black frame contrasts with the vibrant colors of the painting, making the artwork stand out." },
    { id: 24, title: "Acrylic Painting on paper (glass framed)", price: "400/-", size: "9x7 inches", description: "The image is a framed painting of a floral subject. It features a stem with two large pink flowers and several buds. The flowers are detailed with varying shades of pink, giving them a sense of depth and realism. The leaves and stem are painted in vibrant green tones. The background is a solid bright yellow, which makes the pink flowers stand out vividly. The painting is signed by the artist 'Shweta Tyagi' at the bottom. The frame is black, which contrasts with the bright colors of the artwork." },
    { id: 25, title: "Acrylic Painting on paper (glass framed)", price: "400/-", size: "9x7 inches", description: "The image is a framed painting featuring a cluster of bright orange flowers set against a dark background. The flowers are vibrant and detailed, with various shades of orange giving them depth and texture. They are surrounded by lush green leaves and stems, with some hints of brown foliage, adding to the natural feel of the composition. The background is predominantly dark, creating a stark contrast that makes the flowers stand out prominently. The painting is signed by the artist 'Shweta Tyagi' at the bottom. The frame is black, which complements the dark background of the painting." },
    { id: 26, title: "Acrylic Painting on paper (glass framed)", price: "400/-", size: "9x7 inches", description: "The image shows a framed painting of a blue floral arrangement against a green background. The painting features several blue flowers with green stems and leaves. The painting is signed by the artist at the bottom, with the signature reading 'Shweta Tyagi' The frame is black, providing a simple and elegant border to the artwork." },
    { id: 27, title: "Acrylic Painting on paper (glass framed)", price: "400/-", size: "9x7 inches", description: "" },
    { id: 28, title: "Acrylic Painting on canvas (glass framed)", price: "500/-", size: "9x7 inches", description: "The image shows a framed painting of an arrangement of yellow and orange flowers against a dark background. The flowers are clustered together in the center, surrounded by green foliage that radiates outward. The painting is vibrant, with the bright colors of the flowers contrasting sharply against the dark background. The frame is black, complementing the overall aesthetic and focusing attention on the floral artwork." },
    { id: 29, title: "Acrylic Painting on canvas (glass framed)", price: "700/-", size: "9x7 inches", description: "The image depicts a framed painting featuring vibrant yellow and orange flowers. The flowers are rendered in a lively, somewhat abstract style with a focus on bright, warm colors. The background is white, which makes the colors of the flowers stand out. The frame is black, providing a stark contrast to the vivid colors of the painting. At the bottom right corner of the painting, there appears to be a signature, possibly of the artist, though the name is not entirely clear from the image." },
    { id: 30, title: "Acrylic Painting on canvas (glass framed)", price: "1000/-", size: "9x7 inches", description: "The image shows a framed artwork with a green-dominated background and floral elements. The frame is black, providing a contrasting border to the colorful painting. The lower right corner of the painting contains a signature." },
    { id: 31, title: "Acrylic Painting on canvas (glass framed)", price: "700/-", size: "9x7 inches", description: "The image depicts a framed painting of a vibrant nature scene. The foreground is filled with bright yellow flowers and lush green foliage. In the background, there are distant mountains under a clear blue sky with a few scattered clouds. The painting is signed by the artist, whose name is 'Shweta Tyagi' in the bottom right corner. The frame is black and has a simple, clean design. The overall composition conveys a sense of natural beauty and tranquility." },
    { id: 32, title: "Acrylic Painting on canvas (glass framed)", price: "700/-", size: "9x7 inches", description: "The image shows a framed artwork with a green-dominated background and floral elements. The frame is black, providing a contrasting border to the colorful painting. The lower right corner of the painting contains a signature." },
    { id: 33, title: "Acrylic Painting on canvas (glass framed)", price: "700/-", size: "9x7 inches", description: "The image shows a framed artwork with a green-dominated background and floral elements. The frame is black, providing a contrasting border to the colorful painting. The lower right corner of the painting contains a signature." },
    { id: 34, title: "Acrylic Painting on canvas (glass framed)", price: "700/-", size: "9x7 inches", description: "The image shows a framed artwork with a green-dominated background and floral elements. The frame is black, providing a contrasting border to the colorful painting. The lower right corner of the painting contains a signature." },
    { id: 35, title: "Acrylic Painting on canvas (glass framed)", price: "700/-", size: "9x7 inches", description: "The image shows a framed artwork with a green-dominated background and floral elements. The frame is black, providing a contrasting border to the colorful painting. The lower right corner of the painting contains a signature." },
    { id: 36, title: "Acrylic Painting on canvas (glass framed)", price: "700/-", size: "9x7 inches", description: "The image shows a framed artwork with a green-dominated background and floral elements. The frame is black, providing a contrasting border to the colorful painting. The lower right corner of the painting contains a signature." },
    { id: 37, title: "Acrylic Painting on canvas (glass framed)", price: "1000/-", size: "9x7 inches", description: "The image shows a framed artwork with a green-dominated background and floral elements. The frame is black, providing a contrasting border to the colorful painting. The lower right corner of the painting contains a signature." },
    { id: 38, title: "Acrylic Painting on canvas (glass framed)", price: "500/-", size: "9x7 inches", description: "The image features a framed painting of a single, delicate dandelion seed head with dew drops clinging to its thin strands. The background is a soft blend of pastel colors, primarily light blue, orange, and green, creating a dreamy and ethereal atmosphere. The frame is black, which contrasts with the light and airy feel of the artwork. The bottom right corner of the painting has a clear signature from the artist, 'Shweta Tyagi'." },
    { id: 39, title: "Acrylic Painting on canvas (glass framed)", price: "500/-", size: "9x7 inches", description: "The image is a photograph of a framed painting featuring vibrant flowers. The flowers are painted in shades of blue and red with green leaves surrounding them. The background is white, which highlights the bright colors of the flowers. The frame is black and contrasts with the colorful artwork inside. The painting style appears to be impressionistic, with soft brush strokes creating a sense of movement and texture in the petals and leaves. At the bottom right corner of the painting, there is a signature." },
    { id: 40, title: "Acrylic Painting on paper (glass framed)", price: "300/-", size: "7x5 inches", description: "The image is a photograph of another framed painting featuring bright orange flowers and butterflies. The painting has a white background, which makes the vibrant colors of the flowers and butterflies stand out. The flowers are depicted with various shades of orange and yellow, and the butterflies are in matching colors, creating a harmonious composition. Green leaves and stems add contrast and depth to the scene. The black frame surrounding the painting provides a strong contrast to the bright and colorful artwork. In the bottom right corner, there is a signature, which appears to read 'Shweta Tyagi'." },
    { id: 41, title: "Acrylic Painting on paper (glass framed)", price: "300/-", size: "7x5 inches", description: "The image depicts a framed painting of white roses with green leaves against a light-colored background. The painting is signed by the artist, whose name is 'Shweta Tyagi', in the bottom right corner. The frame is black and has a simple, clean design. The overall appearance of the painting is vibrant, with the white roses and green leaves standing out vividly against the background." },
    { id: 42, title: "Acrylic Painting on paper (glass framed)", price:"300/-",size:"7x5 inches", description:"The image is a photograph of a framed painting depicting yellow and orange flowers with green foliage. The flowers are clustered together and arranged in a bouquet-like composition, with some blossoms fully open and others in various stages of blooming. The background is a light grey, which contrasts nicely with the vibrant colors of the flowers and leaves. The painting is framed with a black border, and there is a signature at the bottom right corner that reads 'Shweta Tyagi'. The overall style of the painting is delicate and detailed, focusing on the natural beauty of the flowers."},
    { id: 43, title: "Passion", price:"8000/-",size:"47x78 inches", description:"Acrylic Painting"}
];

export const extractNumber = async(src) => {
    const match =  src.match(/\/(\d+)\.jpg/);
    return match ? parseInt(match[1], 10) : null;
}

const Modal =  ({isVisible,src,onClose}) =>{
    const {cart,setCart,cartStatus,setCartStatus} = useContext(GlobalContext);
    const [showForm,setShowForm] = useState(false);
    var id = 0;
    
    useState(async()=>{

        const extractNumber = async(src) => {
            const match =  src.match(/\/(\d+)\.jpg/);
            return match ? parseInt(match[1], 10) : null;
        }
        id = await extractNumber(src)-1;
    },[])
    
    
    

    if(!isVisible){
        return null;
    }

    const handleClick = (e) =>{
        if(e.target.id === 'wrapper') {
            onClose();
        };
    }

    
    
    const closeForm = () =>{
        setShowForm(false)
    }
    // console.log(src)
    //cart logic 
    

    const add = async (num) =>{
        setCart([...cart,num])
        
        }
    
    const remove = async (num) => {
        setCart(
            cart.filter(a =>
              a !== num
            )
          );
        
    }

    // console.log(cart)
   
    return(
        <>
        <div id='wrapper' className='z-50 fixed inset-0 flex flex-col bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={handleClick} >
            
            <div className='flex flex-col rounded-sm bg-slate-50 '>
            <button className=' text-xl place-self-end mr-8' onClick={()=>{onClose()}}>x</button>
            <div className='w-fit flex  flex-col md:p-4   md:flex-row'>
                
                <div id='modal-image' className='bg-white m-2 p-2 rounded'>
                        <Image
                            alt='painting'
                            src={src}
                            height="300"
                            width="250"
                            loading='eager'
                            priority={true}
                            className="hover:cursor-grabbing h-fit w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                        />
                </div>
                <div className='flex flex-col'>
                <Tabs defaultValue="Details" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        
                        <TabsTrigger value="Description">Description</TabsTrigger>
                        <TabsTrigger value="Details">Details</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Details">
                        <Card>
                        
                        <CardContent className="space-y-2">
                            <div className="space-y-1 m-1 my-2">
                            <Label >Size:</Label>
                            <span className='ml-2'>{paintings[id].size}</span>
                            </div>
                            <div className="space-y-1 m-1">
                            <Label >Medium:</Label>
                            
                            </div>
                            <div className="space-y-1 m-1">
                            <Label >Surface:</Label>
                            
                            </div>
                            <div className="space-y-1 m-1">
                            <Label >Created in:</Label>
                            </div>

                            <div className="space-y-1 m-1">
                            <Label >To be delivered as:</Label>
                            </div>
                            
                        </CardContent>
                        
                        </Card>
                    </TabsContent>
                    <TabsContent value="Description">
                        <Card>
                        <CardContent className="space-y-2">
                            <div className="space-y-1 m-1">
                            <Label >{paintings[id].description}</Label>
                            </div>
                        </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
                <div className='flex flex-col'>
                                
                                <Button  onClick={()=>{
                                    setShowForm(true);
                                }} className="m-2 p-1">Enquire</Button>
                                {!cart.includes(src)?<Button onClick={()=>{
                                    add(src);
                                    // console.log(cart);
                                }} className="m-1 p-4">Add To Cart</Button>:<Button onClick={()=>{
                                    remove(src);
                                    // console.log(cart);
                                }} className="m-1 p-4">Remove From Cart</Button>}
                                
                                <Button onClick={()=>{
                                    setShowForm(true);
                                }} className="m-1 p-4">Make An Offer to the Artist</Button>
                            </div>
                </div>
                
                    
                {/* <div className='bg-white p-2 rounded flex flex-col md:flex-row'>
                    
                    
                
                    <div id='info' className='m-2 p-2'>
                    

                        
                        <div id='enquire' className='p-2 flex md:p-2 md:py-4 justify-center '>
                            <button className=' rounded bg-red-600 px-2 text-white' onClick={()=>{
                                // console.log("passing value",src)
                                
                                setShowForm(true);
                            }}>Enquire</button>    
                        </div>
                    </div>  
                </div> */}
            </div>
            </div>
            
        </div>
       
        <Form id={id} src={src} price={paintings[id].price} size={paintings[id].size} showForm={showForm} setShowForm={setShowForm} closeForm={closeForm}  />
        </>
    )
    
}

export default Modal;


                          