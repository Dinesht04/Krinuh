import React from 'react'
import Link from 'next/link'
import ShoppingCart from './ShoppingCart'
import { FaShoppingCart } from 'react-icons/fa'
import Search from './Search'

const Navbar = () => {
  return (
    <div>
        <nav className="md:mx-16 mt-4 flex text-center justify-center  ">
          <div className="w-fit flex">
            <div className="md:text-2xl text-left  md:mx-4 md:px-4 py-2 px-2 cursor-pointer transition-all duration-300 ease-in-out group">
              <Link href="/">
                <span className=" bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  Home
                </span>
              </Link>
            </div>

            <div className="py-2 ml-2 mr-2  md:mx-4  md:px-4 md:py-3 cursor-pointer md:transition-all md:duration-300 md:ease-in-out group">
              <Link href="/Gallery">
                <span className="bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out md:hover:text-2xl transition duration-300 ease-in-out">
                  Gallery
                </span>
              </Link>
            </div>

            <div className="py-2 ml-2 mr-4  md:mx-4  md:px-4 md:py-3 cursor-pointer md:transition-all md:duration-300 md:ease-in-out group">
              <Link href="/Decorations">
                <span className="bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out md:hover:text-2xl transition duration-300 ease-in-out">
                  Decorations
                </span>
              </Link>
            </div>

          </div>
          <div id="input" className="flex md:py-2">
           <Search/>
          </div>
          <div className="static md:place-self-end pl-2 py-2 md:mx-4 md:px-4 pb-[20px]  cursor-pointer md:transition-all md:duration-300 md:ease-in-out group">
            <Link href="/Cart" aria-label="Cart">
              <span className="bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out hover:text-2xl transition duration-300 ease-in-out">
                <FaShoppingCart />
                <div id="num" className="relative left-2 bottom-6">
                <ShoppingCart  />
                </div>
                
              </span>
            </Link>
          </div>
          
        </nav>
    </div>
  )
}

export default Navbar