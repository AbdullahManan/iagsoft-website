import { Inter } from "next/font/google";

import Navbar from "@/components/Shared/Navbar";
import Footer from "@/components/shared/Footer";
import SmoothScroll from "@/components/Shared/SmoothScroll";
import Preloader from "@/components/Shared/Preloader";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});

export const metadata = {
  title: "IAG Soft — Intelligent Software Solutions",
  description:
    "IAG Soft delivers custom software, ERP, and automation solutions for over 1000 clients since 1989.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Preloader />

        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
