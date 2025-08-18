import { assets, serviceData } from '@/assets/assets'
import React from 'react'
import Image from 'next/image'
import {motion} from 'motion/react'
const Services = ({isDarkMode}:any) => {
  return (
    <motion.div 
     initial={{opacity:0}}
     whileInView={{opacity:1}}
    transition={{duration:1}}
    id="services" className='w-full px-[12%] py-10 scroll-mt-20'>
    <motion.h4 
     initial={{y:-20,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{delay:0.5,duration:0.5}}
    className='text-center mb-2 text-lg font-ovo'>What I offer</motion.h4>
  
    <motion.h2 
     initial={{y:20,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{delay:1.3,duration:0.5}}
    className='text-center text-5xl font-ovo'>My Services</motion.h2>
    
    <motion.p 
     initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{delay:0.7,duration:0.5}}
    className="text-center max-w-2xl mx-auto mt-5 mb-12">
     I am a fullstack developer that has a variety of opensource contributions

    </motion.p>

    <motion.div
     initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{delay:0.9,duration:0.6}}
    
    className="grid grid-cols-auto gap-6 my-10">{/* Here me need 4 cols with a gap of 6 between them */}
      {/* We will provide the grid layout so that */}
      {serviceData.map(({icon,title,description,link},index)=>(
        <motion.div key={index}
        whileHover={{scale:1.05}}
        className={`border border-gray-400 rounded-lg px-8 py-12 shadow-black hover:shadow-black hover:shadow-lg cursor-pointer hover:bg-purple-100 hover:-translate-y-1 duration-500 ${isDarkMode?'hover:bg-violet-950 shadow-white':''}`}
        >
           <Image src={icon} alt='' className='w-10'/>
           <h3 className={`text-lg my-4 text-gray-700 ${isDarkMode?'text-white':''}`}>{title}</h3>
           <p className={`text-sm text-gray-600 leading-5 ${isDarkMode?'text-white/80':''}`}>
            {description}
           </p>
           <a href={link} className='flex items-center gap-2 text-sm mt-5'>
            Read more <Image src={assets.right_arrow} alt="" className='w-4'/>
           </a>
        </motion.div>
      ))}
    </motion.div>

    </motion.div>
  )
}

export default Services