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
    <html lang="en">
      <body
        className={`${outfit.className} ${ovo.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
