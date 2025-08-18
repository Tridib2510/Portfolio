import React from 'react'
import Image from 'next/image'
import {motion} from "motion/react"
import { assets, infoList ,toolsData} from '@/assets/assets'
const About = ({isDarkMode}:any) => {
  return (
    // we add and id since when we click a link it scroll
    // to this about section
    <motion.div 
     initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{duration:1}}
        // fade to not fade animation
    id="about" className='w-full px-[12%] py-10 scroll-mt-20'>
        <motion.h4 
        initial={{opacity:0,y:-20}}
        whileInView={{opacity:1,y:0}}
        transition={{duration:0.5,delay:0.5}}
        className='text-center mb-2 text-lg font-ovo'>Introduction</motion.h4>
        <motion.h2 className='text-center text-5xl font-ovo'>About me</motion.h2>
        
        < motion.div 
        initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{duration:0.8}}
        className='flex w-full flex-col lg:flex-row items-center
    gap-20 my-20'>
            {/* Now we try to create some columns in the left side we add the image
            and in the right side we try to add some information
             */}
    <motion.div
    initial={{opacity:0,scale:0.9}}
        whileInView={{opacity:1,scale:1}}
        transition={{duration:0.6}}
    className='w-64 sm:w-80 rounded-3xl max-w-none'>
        <Image alt="user" src={assets.user_image} 
        className='w-full rounded-3xl'
        />
    </motion.div>
    <motion.div 
    initial={{opacity:0}}
    whileInView={{opacity:1}}
    transition={{duration:0.6,delay:1}}
    
    className='flex-1'>
      <p className='mb-10 max-w-2xl font-ovo'>
        I am a Fullstack Developer with with knowledge about web development,AI,Machine Learning.
      </p>
      <motion.ul
      initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{duration:1}}
      className='grid grid-cols-1 sm:grid-cols-3 gap-6 
      max-w-2xl'>
        {/* In the assets we have the info list where
        which contain ouor tect task with icons
        */}
        {infoList.map(({icon,iconDark,title,description},index)=>(
           <motion.li key={index}            
        whileHover={{scale:1.05}}
      //  size increases a little bit on hovering
           className={`border-[0.5px] border-gray-400 rounded-xl p-6 cursor pointer hover:bg-purple-100 hover:-translate-y-1 duration-500 shadow-black hover:shadow-black hover:shadow-lg ${isDarkMode?'border-white hover:shadow-white hover:bg-darkHover/50':''}`}//we try to change it's color and move it up when we hover over it
          //we also apply a shadow
          >
            <Image src={isDarkMode?iconDark:icon} alt={title} className='w-7 mt-3' />
            <h3 className={`my-4 font-semibold text-gray-700 ${isDarkMode?'text-white':''}`}>{title}</h3>
            <p className={`text-gray-600 text-sm ${isDarkMode?'text-white':''}`}>{description}</p>
           </motion.li>
        ))}
      </motion.ul>
      {/* Adding icons for the tools we use */}
      <motion.h4 
      initial={{y:20,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{delay:1.3,duration:0.5}}
      className={`my-6 text-gray-700 ${isDarkMode?'text-white/80':''}`}>Tools I use</motion.h4>
      <motion.ul
     initial={{y:20,opacity:0}}
        whileInView={{opacity:1}}
        transition={{delay:1.5,duration:0.6}}
      className='flex items-center gap-3 sm:gap-5'>
        {toolsData.map((tool,index)=>(
          <motion.li 
           whileHover={{scale:1.1}}
          className='flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:-translate-y-1 duration-500'>
          <Image src={tool} alt='Tool' className='w-5 sm:w-7'/>
          </motion.li>
        ))}
        
      </motion.ul>
    </motion.div>
        </motion.div>
    </motion.div>
  )
}

export default About