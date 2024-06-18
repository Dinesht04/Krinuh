
"use client"
import Image from "next/image";
import GalleryImages from '../Components/GalleryImages';

const opusPaintings = [];
//change this value to the number of paintings, if more paintings are added in future.
//also if you add more pictures, start by naming the picture 43.jpg and so on.
const numberOfPaintings = 42;

for( let i = 1;i<=numberOfPaintings;i++){
  opusPaintings.push(i);
}


export default function Home() {


  return (
    
      <>
      
        {/* <div id="gallerySampleLayout" className="grid group px-4 my-8 mx-12 gap-2 grid-cols-gallery ">
          {opusPaintings.map((painting)=>{
            return(
              <div key={painting} id={painting} className="h-fit bg-zinc-200 rounded border-2 hover:scale-110 transition duration-300 ease-in-out border border-black m-4 p-4  mx-2"> 
                <Image
                  src={`/${painting}.jpg`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width:'fit-content', height: 'fit-content' }}
                />
              </div>
            )
          })}
                
        </div> */}
        <GalleryImages/>
      </>
    
  );
}
