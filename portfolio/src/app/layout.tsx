import type { Metadata } from "next";
//importing fonts for our webpage
import { Outfit, Ovo } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight:["400","500","600","700"]//contains the font weight
});

const ovo = Ovo({
  subsets: ["latin"],
  weight:["400"]
});

export const metadata: Metadata = {
  title: "Portfolio",//changes the title at the top
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* Whem we click on any link now the scrolling is smooth */}
      <body
        className={`${outfit.className} ${ovo.className} antialiased leading-8
        overflow-x-hidden`}// overflow-x-hidden:so that it would not scroll
        // webpage on smaller screen when we move the sidebar out
        // of the viewport width
      >
        {children}
      </body>
    </html>
  );
}
