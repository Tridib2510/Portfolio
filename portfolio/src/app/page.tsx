"use client"
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import About from "@/components/About";
import Services from "@/components/Services";
import Work from "@/components/Work"
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { useEffect, useState } from "react";
export default function Home() {

  const [isDarkMode, setIsDarkMode] = useState(false);

  
  useEffect(()=>{
    // If the color scheme is dark in the system or we have the dark key 
    // in the local storage
    if (localStorage.theme==='dark' || (!('theme' in localStorage)&& window.matchMedia('(prefers-color-scheme:dark)').matches)) {
      setIsDarkMode(true)
    }
    else{
      setIsDarkMode(false)
    }
  },[])



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
      {isDarkMode && (
        <>
          <StarsBackground
            starDensity={0.00015}
            allStarsTwinkle={true}
            twinkleProbability={0.7}
            minTwinkleSpeed={0.5}
            maxTwinkleSpeed={1}
            className="fixed inset-0"
          />
          <ShootingStars
            minSpeed={10}
            maxSpeed={30}
            minDelay={4200}
            maxDelay={8700}
            starColor="#9E00FF"
            trailColor="#2EB9DF"
            starWidth={10}
            starHeight={1}
            className="fixed inset-0"
          />
        </>
      )}
      <div className="relative z-10">
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
        <Header isDarkMode={isDarkMode} />
        <About isDarkMode={isDarkMode} />
        <Services isDarkMode={isDarkMode}/>
        <Work isDarkMode={isDarkMode} />
        <Contact isDarkMode={isDarkMode} />
        <Footer isDarkMode={isDarkMode}/>
      </div>
    </>
  );
}
