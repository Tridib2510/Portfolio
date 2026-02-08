//use rafce to add component structure
import React,{useEffect, useRef, useState} from 'react'
import Image  from 'next/image'
import {assets} from "@/assets/assets"
const Navbar = ({isDarkMode,setIsDarkMode}:{isDarkMode:boolean,setIsDarkMode:React.Dispatch<React.SetStateAction<boolean>>;
}) => {

const [isScroll,setIsScroll]=useState(false)

 const sideMenuRef = useRef<HTMLUListElement>(null);//We use HTMLUListElement
 // since we are using it in list
  const [isMenuOpen, setIsMenuOpen] = useState(false);

      const openMenu=()=>{
          setIsMenuOpen(true);
          if(sideMenuRef.current)
          sideMenuRef.current.style.transform='translateX(0)'

      }

      const closeMenu=()=>{
          setIsMenuOpen(false);
          if(sideMenuRef.current)
           sideMenuRef.current.style.transform='translateX(100%)'
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

     useEffect(()=>{
         const handleEscape = (e:KeyboardEvent) => {
             if(e.key === 'Escape' && isMenuOpen) {
                 closeMenu();
             }
         };

         if(isMenuOpen) {
             window.addEventListener('keydown', handleEscape);
         }

         return () => {
             window.removeEventListener('keydown', handleEscape);
         };
     },[isMenuOpen])
    //don't directly use window.addEventListener inside useEffect

   return (
     <>
     <div className={`fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] ${isDarkMode?'hidden':''}`}>
         <Image alt="" src={assets.header_bg_color} className='w-full'/>
     </div>
     <div onClick={closeMenu} className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}></div>
     <nav className={`w-full fixed px-4 sm:px-5 lg:px-8 xl:px-[8%] py-3 sm:py-4 flex items-center justify-between z-50 ${isScroll?"bg-white/50 backdrop-blur-lg shadow-sm ":""}`}>
         <a href="#top">
             {/* Image is used to display an image */}
             <Image alt="" src={isDarkMode?assets.logo_dark:assets.logo} className='w-20 sm:w-24 md:w-28 cursor-pointer'/>
             {/* alt attribute is needed for this Image */}
         </a>
        {/* This ul tag will be hidden for smaller devices */}
        <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3
             ${isScroll ? "": `${isDarkMode?'bg-white/50':''} shadow-sm border border-white/50 dark:bg-transparent`}`}>
            <li><a href="#top" className='font-Ovo'>Home</a></li>
            <li><a href="#about"className='font-Ovo' >About me</a></li>
            <li><a href="#services" className='font-Ovo'>Services</a></li>
            <li><a href="#experience" className='font-Ovo'>Experience</a></li>
            <li><a href="#work" className='font-Ovo'>My Work</a></li>
            <li><a href="#github" className='font-Ovo'>My Contributions</a></li>
            <li><a href="#contact" className='font-Ovo'>Contact me</a></li>
        </ul>
         <div className='flex items-center gap-3 sm:gap-4'>

        <button onClick={()=>setIsDarkMode((prev:boolean)=>!prev)}>
             <Image src={isDarkMode?assets.sun_icon:assets.moon_icon} alt='' className='w-5 sm:w-6' />
         </button>

             <a href="#contact" className={`hidden lg:flex items-center gap-2 sm:gap-3 px-6 sm:px-8 lg:px-10 py-2 sm:py-2.5 border border-gray-500 rounded-full ml-2 sm:ml-4 font-Ovo ${isDarkMode?`dark:border-white/50`:''}`}>Contact <Image alt="" src={isDarkMode?assets.arrow_icon_dark:assets.arrow_icon} className='w-2 sm:w-3'/></a>

             <button className='block md:hidden ml-2' onClick={openMenu}>
                 {/* This will be visible only for mobile users */}
                 <Image src={isDarkMode?assets.menu_white: assets.menu_black} alt='' className='w-5 sm:w-6' />
             </button>
          {/* ---------mobile menu ------------ */}
          {/* if we give -right-0 the mobile navigation appears and when we give -right-64 it disappers */}

           <ul ref={sideMenuRef} className={`flex md:hidden flex-col gap-3 sm:gap-4 py-24 sm:py-20 px-8 sm:px-10 fixed right-0 top-0 bottom-0 w-72 sm:w-64 z-50 h-screen bg-rose-50/95 backdrop-blur-lg transition-transform duration-500 ${isDarkMode?`bg-violet-950/95 text-white`:''}`} style={{transform: 'translateX(100%)'}}>
         
         <div className='absolute right-4 sm:right-6 top-4 sm:top-6' onClick={closeMenu}>
             <Image src={isDarkMode?assets.close_black:assets.close_black} alt='' className='w-5 sm:w-6 cursor-pointer p-1 hover:bg-gray-200/20 rounded-full transition-colors invert dark:invert-0'  />
        </div>
           <li><a href="#top" className='font-Ovo text-lg sm:text-base py-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors' onClick={closeMenu}>Home</a></li>
              <li><a href="#about"className='font-Ovo text-lg sm:text-base py-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors' onClick={closeMenu} >About me</a></li>
              <li><a href="#services" className='font-Ovo text-lg sm:text-base py-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors' onClick={closeMenu}>Services</a></li>
              <li><a href="#experience" className='font-Ovo text-lg sm:text-base py-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors' onClick={closeMenu}>Experience</a></li>
              <li><a href="#work" className='font-Ovo text-lg sm:text-base py-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors' onClick={closeMenu}>My Work</a></li>
              <li><a href="#github" className='font-Ovo text-lg sm:text-base py-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors' onClick={closeMenu}>My Contributions</a></li>
              <li><a href="#contact" className='font-Ovo text-lg sm:text-base py-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors' onClick={closeMenu}>Contact me</a></li>
              <li className="pt-4 border-t border-gray-300 dark:border-gray-700 mt-2">
                  <a href="#contact" className={`flex items-center justify-center gap-2 px-6 py-2.5 border border-gray-500 rounded-full font-Ovo transition-all hover:border-purple-500 ${isDarkMode?`dark:border-white/50`:''}`} onClick={closeMenu}>Contact <Image alt="" src={isDarkMode?assets.arrow_icon_dark:assets.arrow_icon} className='w-3'/></a>
              </li>
           </ul>
        </div>
    </nav>
    </>
  )
}

export default Navbar
