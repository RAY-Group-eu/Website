import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google"; // eslint-disable-line @typescript-eslint/no-unused-vars
import "./globals.css";
import Header from '@/components/layout/Header';


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ray Group",
  description: "A venture studio building trustworthy digital products.",
  icons: {
    icon: '/favicon.ico',
  }
};

import { Suspense } from "react";
import DebugHud from "@/components/DebugHud";
import Preloader from "@/components/ui/Preloader";
import BackgroundChrome from "@/components/ui/BackgroundChrome";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased min-h-screen bg-ray-dark text-foreground flex flex-col overflow-x-hidden selection:bg-ray-blue/30`}
      >
        <Suspense fallback={null}>
          <DebugHud />
          <Preloader />
          <BackgroundChrome />
        </Suspense>
        <Header />
        {children}
      </body>
    </html>
  );
}

