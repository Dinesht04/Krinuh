
"use client"
import GalleryImages from '../components/GalleryImages';

const opusPaintings = [];
//change this value to the number of paintings, if more paintings are added in future.
//also if you add more pictures, start by naming the picture 43.jpg and so on.
const numberOfPaintings = 57;

for( let i = 1;i<=numberOfPaintings;i++){
  opusPaintings.push(i);
}


export default function Home() {


  return (
    
      <>
        <GalleryImages/>
      </>
    
  );
}
