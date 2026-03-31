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
  title: "Tridib2510",//changes the title at the top
  description: "",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32" },
      { url: "/favicon.png", sizes: "192x192" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "180x180" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      {/* whenever we remove this dark class from the className we get light mode else we get dark mode */}
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
