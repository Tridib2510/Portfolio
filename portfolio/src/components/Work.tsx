"use client"
import { assets, workData } from '@/assets/assets'
import React,{useState} from 'react'
import Image from 'next/image'
import {motion} from "motion/react"
import Link from 'next/link'
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
const Work = ({isDarkMode}:{isDarkMode:boolean}) => {
  const [work,setWork]=useState(workData.slice(0,4))
  const [showmore,setShowMore]=useState(false)

  function showMore(){
    setWork(workData)
    setShowMore(true)
  }

  function showLess(){
    setWork(workData.slice(0,4))
    setShowMore(false)
  }


  return (
    
    <motion.div 
     initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{duration:1}}
    id='work' className='w-full px-[12%] py-10 scroll-mt-20'>
         <motion.h4 
          initial={{y:-20,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{delay:0.3,duration:0.5}}
         className='text-center mb-2 text-lg font-ovo'>My portfolio</motion.h4>
    <motion.h2
     initial={{y:20,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{delay:0.5,duration:0.5}}
    className='text-center text-5xl font-ovo'>My latest work</motion.h2>
    
    <motion.p 
     initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{delay:0.7,duration:0.5}}
    className="text-center max-w-2xl mx-auto mt-5 mb-12">
    Welcome to my web development portfolio! Explore collectioon of projects
    showcasing my expertise in full stack development
    </motion.p>
    <motion.div 
     initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{delay:0.9,duration:0.6}}
      className={`grid grid-cols-1 sm:grid-cols-2 my-10 gap-5 ${isDarkMode ? 'text-black' : ''}`}
>
        {/* {work.map((project,index)=>(
          <div
          key={index}
          >
            <motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.3 }}
  className="aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group"
  style={{ backgroundImage: `url(${project.bgImage})` }}
>
  <div className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7">
    <div>
      <h2 className="font-semibold">{project.title}</h2>
      <p className="text-sm text-gray-700">{project.description}</p>
    </div>

    <div className="flex gap-3"> */}
      
      {/* noopener noreferrer is needed for security */}
      {/* <div className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition">
        <Link href={project.github} target="_blank" rel="noopener noreferrer">
   
    <Image src={assets.github_logo} alt="GitHub icon" className="w-5" />
    
        </Link>
      </div>

      
      <div className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition">
        <Link href={project.link} target="_blank" rel="noopener noreferrer">
          <Image src={assets.send_icon} alt="Live link icon" className="w-5" />
        </Link>
      </div>
    </div>
  </div>
</motion.div>

          
            </div>
        ))} */}


         {work.map((project,index)=>(
          <div
          key={index}
          >
           
          <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                   {project.title}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    {project.description}
                  </CardItem>
                  <CardItem
                    translateZ="100"
                    rotateX={20}
                    rotateZ={-10}
                    className="w-full mt-4"
                  >
                    <Image
                    src={project.bgImage}
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                  </CardItem>
                  <div className="flex justify-between items-center mt-20">
                    <CardItem
                      translateZ={20}
                      translateX={-40}
                      as="button"
                      className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white cursor-pointer"
                    >
                       <Link href={project.link}>Try now →</Link>
                      
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      translateX={40}
                      as="button"
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold cursor-pointer"
                    >
                      <Link href={project.github}>
                      <Image src={assets.github_logo}  alt="GitHub icon" className="w-5" />
                      </Link>
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
          
            </div>
        ))}
    </motion.div>
    <motion.a
    onClick={showmore===false?showMore:showLess}
     initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{delay:1.1,duration:0.5}}
    href="#work" className={`w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-lightHover duration-500 ${isDarkMode?'text-white border-white hover:bg-violet-950':""}`}>
      {showmore===false?'Show more':'Show less'} <Image src={isDarkMode?assets.right_arrow_bold_dark:assets.right_arrow_bold} alt="Right arrow" className='w-4'/>
    </motion.a>
    </motion.div>
  )
}

export default Work