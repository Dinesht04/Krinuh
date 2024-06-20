import Image from 'next/image';
import React from 'react'

const paintings = [
    { id: 1, title: "Acrylic Painting on canvas (glass frame)", price: "5000/-", size: "23.5x19.5 inches", description: "Acrylic Painting on canvas with glass frame" },
    { id: 2, title: "Acrylic Painting on canvas (glass framed)", price: "3500/-", size: "18.5x14.5 inches", description: "Acrylic Painting on canvas with glass frame" },
    { id: 3, title: "Acrylic Painting on canvas (glass framed)", price: "3500/-", size: "18x15 inches", description: "Acrylic Painting on canvas with glass frame" },
    { id: 4, title: "Acrylic Painting on canvas (glass framed)", price: "4500/-", size: "18.5x14.5 inches", description: "Acrylic Painting on canvas with glass frame" },
    { id: 5, title: "Acrylic Painting on canvas (glass framed)", price: "5000/-", size: "23.5x19.5 inches", description: "Acrylic Painting on canvas with glass frame" },
    { id: 6, title: "Acrylic Painting on canvas (framed)", price: "4500/-", size: "23.5x15.5 inches", description: "Acrylic Painting on canvas with frame" },
    { id: 7, title: "Acrylic Painting on canvas (framed)", price: "3500/-", size: "23.5x17.5 inches", description: "Acrylic Painting on canvas with frame" },
    { id: 8, title: "Acrylic Painting on canvas (framed)", price: "2000/-", size: "11.5x11.5 inches", description: "Acrylic Painting on canvas with frame" },
    { id: 9, title: "Acrylic Painting on canvas (framed)", price: "3000/-", size: "15.5x11.5 inches", description: "Acrylic Painting on canvas with frame" },
    { id: 10, title: "Acrylic Painting on canvas (framed)", price: "3000/-", size: "17.5x7.5 inches", description: "Acrylic Painting on canvas with frame" },
    { id: 11, title: "Acrylic Painting on canvas (framed)", price: "3500/-", size: "19.5x15.5 inches", description: "Acrylic Painting on canvas with frame" },
    { id: 12, title: "Acrylic Painting on canvas (framed)", price: "4500/-", size: "23.5x17.5 inches", description: "Acrylic Painting on canvas with frame" },
    { id: 13, title: "Acrylic Painting on canvas (framed)", price: "1000/-", size: "11.5x11.5 inches", description: "Acrylic Painting on canvas with frame" },
    { id: 14, title: "Acrylic Painting on canvas (framed)", price: "1500/-", size: "15x11 inches", description: "Acrylic Painting on canvas with frame" },
    { id: 15, title: "Acrylic Painting on canvas (framed)", price: "4500/-", size: "18x15 inches", description: "Acrylic Painting on canvas with frame" },
    { id: 16, title: "Acrylic Painting on canvas (framed)", price: "2500/-", size: "15x11 inches", description: "Acrylic Painting on canvas with frame" },
    { id: 17, title: "Acrylic Painting on paper (glass framed)", price: "3500/-", size: "21x15 inches", description: "Acrylic Painting on paper with glass frame" },
    { id: 18, title: "Acrylic Painting on canvas (glass framed)", price: "1500/-", size: "11x7.5 inches", description: "Acrylic Painting on canvas with glass frame" },
    { id: 19, title: "Acrylic Painting on canvas (glass framed)", price: "1500/-", size: "11x9 inches", description: "Acrylic Painting on canvas with glass frame" },
    { id: 20, title: "Acrylic Painting on canvas (glass framed)", price: "1500/-", size: "11x7 inches", description: "Acrylic Painting on canvas with glass frame" },
    { id: 21, title: "Acrylic Painting on paper (glass framed)", price: "500/-", size: "11x7.5 inches", description: "Acrylic Painting on paper with glass frame" },
    { id: 22, title: "Acrylic Painting on canvas (glass framed)", price: "2000/-", size: "9x7 inches", description: "Acrylic Painting on canvas with glass frame" },
    { id: 23, title: "Acrylic Painting on paper (glass framed)", price: "400/-", size: "9x7 inches", description: "Acrylic Painting on paper with glass frame" },
    { id: 24, title: "Acrylic Painting on paper (glass framed)", price: "400/-", size: "9x7 inches", description: "Acrylic Painting on paper with glass frame" },
    { id: 25, title: "Acrylic Painting on paper (glass framed)", price: "400/-", size: "9x7 inches", description: "Acrylic Painting on paper with glass frame" },
    { id: 26, title: "Acrylic Painting on paper (glass framed)", price: "400/-", size: "9x7 inches", description: "Acrylic Painting on paper with glass frame" },
    { id: 27, title: "Acrylic Painting on paper (glass framed)", price: "400/-", size: "9x7 inches", description: "Acrylic Painting on paper with glass frame" },
    { id: 28, title: "Acrylic Painting on canvas (glass framed)", price: "500/-", size: "9x7 inches", description: "Acrylic Painting on canvas with glass frame" },
    { id: 29, title: "Acrylic Painting on canvas (glass framed)", price: "700/-", size: "9x7 inches", description: "Acrylic Painting on canvas with glass frame" },
    { id: 30, title: "Acrylic Painting on canvas (glass framed)", price: "1000/-", size: "9x7 inches", description: "Acrylic Painting on canvas with glass frame" },
    { id: 31, title: "Acrylic Painting on canvas (glass framed)", price: "700/-", size: "9x7 inches", description: "Acrylic Painting on canvas with glass frame" },
    { id: 32, title: "Acrylic Painting on canvas (glass framed)", price: "700/-", size: "9x7 inches", description: "Acrylic Painting on canvas with glass frame" },
    { id: 33, title: "Acrylic Painting on canvas (glass framed)", price: "700/-", size: "9x7 inches", description: "Acrylic Painting on canvas with glass frame" },
    { id: 34, title: "Acrylic Painting on canvas (glass framed)", price: "700/-", size: "9x7 inches", description: "Acrylic Painting on canvas with glass frame" },
    { id: 35, title: "Acrylic Painting on canvas (glass framed)", price: "700/-", size: "9x7 inches", description: "Acrylic Painting on canvas with glass frame" },
    { id: 36, title: "Acrylic Painting on canvas (glass framed)", price: "700/-", size: "9x7 inches", description: "Acrylic Painting on canvas with glass frame" },
    { id: 37, title: "Acrylic Painting on canvas (glass framed)", price: "1000/-", size: "9x7 inches", description: "Acrylic Painting on canvas with glass frame" },
    { id: 38, title: "Acrylic Painting on canvas (glass framed)", price: "500/-", size: "9x7 inches", description: "Acrylic Painting on canvas with glass frame" },
    { id: 39, title: "Acrylic Painting on canvas (glass framed)", price: "500/-", size: "9x7 inches", description: "Acrylic Painting on canvas with glass frame" },
    { id: 40, title: "Acrylic Painting on paper (glass framed)", price: "300/-", size: "7x5 inches", description: "Acrylic Painting on paper with glass frame" },
    { id: 41, title: "Acrylic Painting on paper (glass framed)", price: "300/-", size: "7x5 inches", description: "Acrylic Painting on paper with glass frame" },
    { id: 42, title: "Passion", price:"8000/-",size:"47x78 inches", description:"Acrylic Painting"}
];


const Modal = ({isVisible,src,onClose}) =>{

    if(!isVisible){
        return null;
    }

    const handleClick = (e) =>{
        if(e.target.id === 'wrapper') {
            onClose();
        };
    }

    function extractNumber(src) {
        const match = src.match(/\/(\d+)\.jpg/);
        return match ? parseInt(match[1], 10) : null;
    }
    const id = extractNumber(src)-1
    

    return(
        <div id='wrapper' className=' fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={handleClick} >
            <div className='w-fit flex flex-col'>
                <button className='text-white text-xl place-self-end' onClick={()=>{onClose()}}>x</button>
                <div className='bg-white p-2 rounded flex flex-col md:flex-row'>
                    <div className='bg-white p-2 rounded'>
                        <Image
                            alt='painting'
                            src={src}
                            height="300"
                            width="350"
                            className="hover:cursor-grabbing h-fit w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                        />
                    </div>
                    <div id='info' className='m-2 p-2'>
                        <div id='title' className='text-xl p-2'>
                                {paintings[id].title}
                        </div>
                        
                        <div id='description' className='p-2 md:p-2 md:py-4'>
                               <span>{paintings[id].description}</span> 
                        </div>
                        <div id='size' className='p-2 flex md:p-2 md:py-4'>
                            <div><span className='font-semibold rounded bg-zinc-300 px-2'>Size</span></div>    
                            <div className=' pl-2'>{paintings[id].size}</div>
                        </div>
                        <div id='price' className='p-2 flex md:p-2 md:py-4'>
                            <div className=' rounded bg-green-300 px-2 '>Cost</div>
                            <div className='pl-2'>₹{paintings[id].price}</div>    
                        </div>
                        <div id='enquire' className='p-2 flex md:p-2 md:py-4 justify-center '>
                            <button className=' rounded bg-red-600 px-2 text-white'>Enquire</button>    
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default Modal;