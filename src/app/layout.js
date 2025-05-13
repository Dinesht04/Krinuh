import Link from "next/link";
import "./globals.css";
import { FaShoppingCart } from "react-icons/fa";
import {GlobalContextProvider} from './Context/store';
import Search from "./components/Search";
import Offer from "./components/Offer";
import ShoppingCart from "./components/ShoppingCart";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./components/Navbar";
import TonotoNavbar from "./components/TonotoNavbar";
import TonotoOfferCarousel from "./components/TonotoOfferCarousel";
import TonotoFooter from "./components/TonotoFooter";


export const metadata = {
  title: "Krinuh",
  description: "Explore the Art by the Artist Shweta Tyagi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-[#ffffff]">
        <GlobalContextProvider>
          <TonotoNavbar/>
          <TonotoOfferCarousel/>
        {children}
        <TonotoFooter/>
        </GlobalContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
