import { Limelight } from "next/font/google";
import { Pacifico } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import {GlobalContextProvider} from './Context/store';
import Search from "./components/Search";


const limelight = Limelight({
  preload: false,
  subsets: ["latin"],
  weight: ["400"],
});

const pacifico = Pacifico({
  preload: false,
  subsets: ["cursive"],
  weight: ["400"],
});

export const metadata = {
  title: "Shweta's Gallery",
  description: "Explore the Paintings by the Artist Shweta Tyagi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <GlobalContextProvider>
        {/* text-[#987070] */}
        <nav className="md:mx-16 mt-4 flex text-center justify-center  ">
          <div className="basis-1/2 flex">
            <div className="md:text-2xl text-left  mx-4 px-4 py-2 cursor-pointer transition-all duration-300 ease-in-out group">
              <Link href="/">
                <span className=" bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  Shweta Tyagi
                </span>
              </Link>
            </div>

            <div className="mx-4 px-4 py-3 cursor-pointer transition-all duration-300 ease-in-out group">
              <Link href="/Gallery">
                <span className="bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out hover:text-2xl transition duration-300 ease-in-out">
                  Gallery
                </span>
              </Link>
            </div>
          </div>
          <div id="input" className="flex">
           <Search/>
          </div>
          <div className="md:place-self-end mx-4 px-4 pb-[20px] m cursor-pointer transition-all duration-300 ease-in-out group">
            <Link href="/Cart">
              <span className="bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out hover:text-2xl transition duration-300 ease-in-out">
                <FaShoppingCart />
              </span>
            </Link>
          </div>
          
        </nav>
        {children}
        </GlobalContextProvider>
      </body>
    </html>
  );
}
