import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Paint",
  description: "Dinesh Tagi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50">{children}</body>
    </html>
  );
}
