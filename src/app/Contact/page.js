import Image from "next/image";




export default function Home() {


  

  return (
    <>
    <div id="hero-image" className=" m-4 p-4 flex">
    <div className=" overflow-hidden bg-gray-600 rounded-xl mx-2"> 
    <Image
                  src={`/42.jpg`}
                  width={900}
                  height={400}
                  sizes=""
                  // objectFit="cover"
                  // style={{ objectPosition:'left' }}
      />
    </div>
      </div>
    <div id="contact-information" className="flex flex-col mx-12">
    <div className="text-2xl mt-4  p-4">Contact</div>
    <div className="text-xl px-4">For general enquiries, images of available works, and a price list, email my studio manager at <span className="font-semibold">contact.soundofcolours@gmail.com</span> .</div>
    </div>
    </>
  );
}
