"use client"
import React, { useState } from 'react'
import { MdCancel } from 'react-icons/md';

const Offer = () => {
    const [showOffer,setShowOffer] = useState(true);
  if(showOffer){
  return (
    <div className='z-50 bg-[#f4f1ed] flex justify-center'>
        <div className='m-1 p-1.5'>
            Free Shipping for Orders in Jaipur
        </div>
        <div className='hover:cursor-pointer flex items-center text-[#a7a5a2] text-xl'>
            <MdCancel onClick={()=>{setShowOffer(false)}} />
        </div>
    </div>
  )
}
}

export default Offer