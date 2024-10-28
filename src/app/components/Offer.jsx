"use client"
import React, { useState } from 'react'
import { MdCancel } from 'react-icons/md';

const Offer = () => {
    const [showOffer,setShowOffer] = useState(true);
  if(showOffer){
  return (
    <div className='z-50 bg-amber-300 flex justify-center'>
        <div className='m-1 p-1.5'>
            Free Shipping for Orders in Jaipur
        </div>
        <div className='hover:cursor-pointer p-3 text-white text-xl'>
            <MdCancel onClick={()=>{setShowOffer(false)}} />
        </div>
    </div>
  )
}
}

export default Offer