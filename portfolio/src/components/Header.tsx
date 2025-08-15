import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
const Header = () => {
  return (
    <div className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col
    items-center justify-center gap-4
    '>
        <div>
            <Image alt="" src={assets.profile_img} 
            className='rounded-full w-32'/>       
        </div>
         <h3 className="flex items-end gap-2 text-xl md:text-2xl mb-3 font-ovo">
            Hi! I'm Tridib Roy Chowdhury <Image alt="" src={assets.hand_icon} 
            className='w-6'/></h3>

    <h1 className='text-3xl sm:text-6xl lg:text-[66px] font-ovo'>
        fullstack web developer based in India.</h1>
        <p className='max-w-2xl mx-auto font-ovo'>
    I am a fullstack developer with knowledge about AI and 
    Machine Learning
        </p>
        <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
            
            <a href="#contact"
            className='px-10 py-3 border border-white rounded-full bg-black
           text-white flex items-center'
            >contact me <Image alt="" src={assets.right_arrow_white}/> </a>
            
             {/* download is used to download the pdf named sample-reusme in the public folder */}
             
             <a href="/sample-resume.pdf" download 
             className='px-10 py-3 border rounded-full border-gray-500 flex 
             items-center gap-2'
             >my resume <Image alt="" src={assets.download_icon} 
            className='w-4'/> </a>
        </div>
   
    </div>
  )
}

export default Header