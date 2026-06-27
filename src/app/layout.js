import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/common/Navbar";
import { Providers } from "@/component/Items/providers";
import { Toaster } from "react-hot-toast";
import Footer from "@/component/common/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CookLy- Share Your Recipe",
  description: "Share & also Purchased your favorite recipe",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar></Navbar>
          <main>
            <Toaster
  position="top-center"
  reverseOrder={false}
/>

          {children}
          </main>
          <Footer></Footer>
        </Providers>
      </body>
    </html>
  );
}
