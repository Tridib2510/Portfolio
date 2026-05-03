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
     <div onClick={closeMenu} className={`fixed inset-0 z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto bg-black/50' : 'opacity-0 pointer-events-none'}`}></div>
     <nav className={`w-full fixed px-4 sm:px-5 lg:px-8 xl:px-[8%] py-3 sm:py-4 flex items-center justify-between z-50 transition-all duration-300 ${isScroll?"bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm ":""}`}>
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
            <li><a href="#github" className='font-Ovo'>Contributions</a></li>
            <li><a href="#work" className='font-Ovo'>My Work</a></li>
            
        </ul>
         <div className='flex items-center gap-2'>

        <button onClick={()=>setIsDarkMode((prev:boolean)=>!prev)} className={`p-2 rounded-full transition-colors ${isDarkMode?'hover:bg-white/20':'hover:bg-gray-100'}`}>
             <Image src={isDarkMode?assets.sun_icon:assets.moon_icon} alt='' className='w-5 sm:w-6' />
         </button>

             <a href="#contact" className={`hidden lg:flex items-center gap-2 px-6 py-2 border rounded-full font-Ovo transition-colors ${isDarkMode?'border-gray-600 hover:border-white hover:text-white':'border-gray-400 hover:border-gray-700'}`}>Contact <Image alt="" src={isDarkMode?assets.arrow_icon_dark:assets.arrow_icon} className='w-3'/></a>

             <button className='block md:hidden p-2' onClick={openMenu}>
                 {/* This will be visible only for mobile users */}
                 <Image src={isDarkMode?assets.menu_white: assets.menu_black} alt='' className='w-6' />
             </button>
          {/* ---------mobile menu ------------ */}
          {/* if we give -right-0 the mobile navigation appears and when we give -right-64 it disappers */}

           <ul ref={sideMenuRef} className={`flex md:hidden flex-col gap-4 py-20 px-8 fixed right-0 top-0 bottom-0 w-64 z-50 h-screen backdrop-blur-xl transition-transform duration-300 ${isDarkMode?'bg-slate-900/95 text-white':'bg-white/95 shadow-lg'}`} style={{transform: 'translateX(100%)'}}>

         <div className='absolute right-4 top-4' onClick={closeMenu}>
             <Image src={assets.close_black} alt='' className={`w-6 cursor-pointer p-1 rounded-full transition-colors ${isDarkMode?'invert hover:bg-white/20':'hover:bg-gray-200'}`}  />
        </div>
           <li><a href="#top" className={`font-Ovo text-base py-2 border-b transition-colors ${isDarkMode?'border-gray-700 hover:text-purple-400':'border-gray-200 hover:text-purple-600'}`} onClick={closeMenu}>Home</a></li>
              <li><a href="#about" className={`font-Ovo text-base py-2 border-b transition-colors ${isDarkMode?'border-gray-700 hover:text-purple-400':'border-gray-200 hover:text-purple-600'}`} onClick={closeMenu}>About me</a></li>
              <li><a href="#services" className={`font-Ovo text-base py-2 border-b transition-colors ${isDarkMode?'border-gray-700 hover:text-purple-400':'border-gray-200 hover:text-purple-600'}`} onClick={closeMenu}>Services</a></li>
              <li><a href="#experience" className={`font-Ovo text-base py-2 border-b transition-colors ${isDarkMode?'border-gray-700 hover:text-purple-400':'border-gray-200 hover:text-purple-600'}`} onClick={closeMenu}>Experience</a></li>
            <li><a href="#github" className={`font-Ovo text-base py-2 border-b transition-colors ${isDarkMode?'border-gray-700 hover:text-purple-400':'border-gray-200 hover:text-purple-600'}`} onClick={closeMenu}>Contributions</a></li>  
            <li><a href="#work" className={`font-Ovo text-base py-2 border-b transition-colors ${isDarkMode?'border-gray-700 hover:text-purple-400':'border-gray-200 hover:text-purple-600'}`} onClick={closeMenu}>My Work</a></li>
              
              <li className="pt-4 mt-2">
                  <a href="#contact" className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-Ovo transition-all ${isDarkMode?'border border-gray-600 hover:border-purple-400 hover:text-purple-400':'border border-gray-400 hover:border-purple-600 hover:text-purple-600'}`} onClick={closeMenu}>Contact <Image alt="" src={isDarkMode?assets.arrow_icon_dark:assets.arrow_icon} className='w-3'/></a>
              </li>
           </ul>
        </div>
    </nav>
    </>
  )
}

export default Navbar
