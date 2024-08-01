"use client"

import Enquire from '@/components/Enquire'
import  {GlobalContext}  from '@/Context/store'
import React, {useContext} from 'react'

const Page = () => {

    const {src,id} = useContext(GlobalContext)

    function extractNumber(filename) {
        if(!filename) return 1
        const hatch = filename.match(/\d+/g); // Using the global flag 'g' to match all occurrences
        return hatch ? hatch[0] : 1;
      }

    return (
    <div>
        <Enquire src={src} id={extractNumber(src)} />
    </div>
  )
}

export default Page