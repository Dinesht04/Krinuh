import { Limelight } from "next/font/google";
import { Pacifico } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const limelight = Limelight(
  {
    preload: false,
    subsets:['latin'],
    weight:['400']
  }
);

const pacifico = Pacifico(
  {
    preload: false,
    subsets:['cursive'],
    weight:['400']
  
  }
)

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
      <body className= {`bg-slate-200 ${pacifico.className}`} >
      <div className=" text-center text-4xl mt-16 p-2 ">
        Shweta Tyagi
      </div>
      <nav className="text-2xl flex text-center justify-center flex-wrap">
          <div className="m-4 px-4 py-2 cursor-pointer transition-all duration-300 ease-in-out group">
            <Link href="/">
              <span className="bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                HOME
              </span>
            </Link>
          </div>
          <div className="m-4 px-4 py-2 cursor-pointer transition-all duration-300 ease-in-out group">
            <Link href="/Opus">
              <span className="bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                OPUS
              </span>
            </Link>
          </div>
          <div className="m-4 p-2 cursor-pointer transition-all duration-300 ease-in-out group">
            <Link href="/Contact">
              <span className="bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                CONTACT
              </span>
            </Link>
          </div>
        </nav>
        {children}</body>
    </html>
  );
}
