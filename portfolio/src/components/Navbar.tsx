//use rafce to add component structure
import React,{useEffect, useRef, useState} from 'react'
import Image  from 'next/image'
import {assets} from "@/assets/assets"
const Navbar = ({isDarkMode,setIsDarkMode}:{isDarkMode:boolean,setIsDarkMode:React.Dispatch<React.SetStateAction<boolean>>;
}) => {

const [isScroll,setIsScroll]=useState(false)

const sideMenuRef = useRef<HTMLUListElement>(null);//We use HTMLUListElement
// since we are using it in list

    const openMenu=()=>{
        if(sideMenuRef.current)
        sideMenuRef.current.style.transform='translateX(-16rem)'//shifts the side bar to the left side

    }

    const closeMenu=()=>{
        if(sideMenuRef.current)
         sideMenuRef.current.style.transform='translateX(16rem)'
    }
 //based on this setIsScroll we will change the css
//  property for the navigation bar
    useEffect(()=>{
       const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  window.addEventListener('scroll', handleScroll);

  // Cleanup function to remove the listener
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
    },[])
    //don't directly use window.addEventListener inside useEffect

  return (
    <>
    <div className={`fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] ${isDarkMode?'hidden':''}`}>
        <Image alt="" src={assets.header_bg_color} className='w-full'/>
    </div>
    <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 ${isScroll?"bg-white/50 backdrop-blur-lg shadow-sm ":""}`}>
        <a href="#top">
            {/* Image is used to display an image */}
            <Image alt="" src={isDarkMode?assets.logo_dark:assets.logo} className='w-28 cursor-pointer mr-14'/>
            {/* alt attribute is needed for this Image */}
        </a>
        {/* This ul tag will be hidden for smaller devices */}
        <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3
             ${isScroll ? "": `${isDarkMode?'bg-white/50':''} shadow-sm border border-white/50 dark:bg-transparent`}`}>
            <li><a href="#top" className='font-Ovo'>Home</a></li>
            <li><a href="#about"className='font-Ovo' >About me</a></li>
            <li><a href="#services" className='font-Ovo'>Services</a></li>
            <li><a href="#work" className='font-Ovo'>My Work</a></li>
            <li><a href="#github" className='font-Ovo'>My Contributions</a></li>
            <li><a href="#contact" className='font-Ovo'>Contact me</a></li>
        </ul>
        <div className='flex items-center gap-4'>

        <button onClick={()=>setIsDarkMode((prev:boolean)=>!prev)}>
            <Image src={isDarkMode?assets.sun_icon:assets.moon_icon} alt='' className='w-6' />
        </button>

            <a href="#contact" className={`hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4 font-Ovo ${isDarkMode?`dark:border-white/50`:''}`}>Contact <Image alt="" src={isDarkMode?assets.arrow_icon_dark:assets.arrow_icon} className='w-3'/></a>

            <button className='block md:hidden ml-3' onClick={openMenu}>
                {/* This will be visible only for mobile users */}
                <Image src={isDarkMode?assets.menu_white: assets.menu_black} alt='' className='w-6' />
            </button>
          {/* ---------mobile menu ------------ */}
          {/* if we give -right-0 the mobile navigation appears and when we give -right-64 it disappers */}

          <ul ref={sideMenuRef} className={`flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 ${isDarkMode?`bg-violet-950 text-white`:''}`}>
        
        <div className='absolute right-6 top-6' onClick={closeMenu}>
            <Image src={assets.close_black} alt='' className='w-5 cursor pointer'  />
        </div>
           {/* We also used onClick for everyElement on the menu since when we
           click on them then the menu should close and our page should
           be directed to it's appropriate postion
           */}
           <li><a href="#top" className='font-Ovo' onClick={closeMenu}>Home</a></li>
            <li><a href="#about"className='font-Ovo' onClick={closeMenu} >About me</a></li>
            <li><a href="#services" className='font-Ovo' onClick={closeMenu}>Services</a></li>
            <li><a href="#work" className='font-Ovo' onClick={closeMenu}>My Work</a></li>
            <li><a href="#contact" className='font-Ovo' onClick={closeMenu}>Contact me</a></li>
          </ul>
        </div>
    </nav>
    </>
  )
}

export default Navbar
