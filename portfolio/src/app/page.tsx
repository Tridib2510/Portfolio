"use client"
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import About from "@/components/About";
import Services from "@/components/Services";
import Work from "@/components/Work"
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
export default function Home() {

  const [isDarkMode,setIsDarkMode]=useState(false)

  useEffect(()=>{
    if(isDarkMode){
      document.documentElement.classList.add('dark')
      localStorage.theme='dark'//theme is the key name
    }
    else{
      document.documentElement.classList.remove('dark')
      localStorage.theme=''
    }
  },[isDarkMode])

  return (
    <>
    <Navbar/>
    <Header />
    <About />
    <Services />
    <Work />
    <Contact />
    <Footer />
    </>
  );
}
