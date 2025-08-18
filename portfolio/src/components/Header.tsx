import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import { motion } from "motion/react"
const Header = ({isDarkMode}:{isDarkMode:boolean}) => {
  return (
    <div className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col
    items-center justify-center gap-4
    '>
        <motion.div 
        initial={{scale:0}}
        whileInView={{scale:1}}
        transition={{duration:0.8,type:'spring',stiffness:100}}
        // created a pop of animation for the first image in our page

        >
            <Image alt="" src={assets.profile_img} 
            className='rounded-full w-32'/>       
        </motion.div>
         <motion.h3
         initial={{y:-20,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{duration:0.6,delay:0.3}}
         className="flex items-end gap-2 text-xl md:text-2xl mb-3 font-ovo">
            Hi! I'm Tridib Roy Chowdhury <Image alt="" src={assets.hand_icon} 
            className='w-6'/></motion.h3>
{/* side to buttom animation  */}
    <motion.h1 
    initial={{y:-20,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{duration:0.8,delay:0.5}}
    className='text-3xl sm:text-6xl lg:text-[66px] font-ovo'>
        Full Stack Web Developer based in India.</motion.h1>
        <motion.p 
        initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{duration:0.6,delay:0.7}}
        className='max-w-2xl mx-auto font-ovo'>
    I am a fullstack developer with knowledge about AI and 
    Machine Learning
        </motion.p>
        <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
            
            <motion.a
            initial={{y:30,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{duration:0.6,delay:1}}
        // comes from down to top animation
            href="#contact"
            className={`px-10 py-3 border border-white rounded-full bg-black
           text-white flex items-center gap-2 ${isDarkMode?'bg-transparent':''}`}
            >contact me <Image alt="" src={assets.right_arrow_white}/> </motion.a>
            
             {/* download is used to download the pdf named sample-reusme in the public folder */}
             
             <motion.a
              initial={{y:30,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{duration:0.6,delay:1.2}}
             href="/sample-resume.pdf" download 
             className={`px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 ${isDarkMode?'bg-white text-black':''} `}
             >my resume <Image alt="" src={assets.download_icon} 
            className='w-4'/> </motion.a>
        </div>
   
    </div>
  )
}

export default Header