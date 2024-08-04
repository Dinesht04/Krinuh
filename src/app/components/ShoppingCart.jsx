"use client"

import React,{useContext} from 'react'
import { GlobalContext } from '@/Context/store'

const ShoppingCart = () => {

    const {cart} = useContext(GlobalContext);
  if(cart.length==0){
    return null
  }
  return (
    <div className='text-xs text-white rounded-full bg-black'>
        {cart.length}
    </div>
  )
}

export default ShoppingCart