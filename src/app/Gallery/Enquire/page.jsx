"use client"

import Enquire from '@/components/Enquire'
import  {GlobalContext}  from '@/Context/store'
import React, {useContext} from 'react'

const page = () => {

    const {src,id} = useContext(GlobalContext)

    function extractNumber(filename) {
        const match = filename.match(/\d+/g); // Using the global flag 'g' to match all occurrences
        return match ? match[0] : null;
      }

    return (
    <div>
        <Enquire src={src} id={extractNumber(src)} />
    </div>
  )
}

export default page