import { assets, serviceData } from '@/assets/assets'
import React from 'react'
import Image from 'next/image'
const Services = ({isDarkMode}:any) => {
  return (
    <div id="services" className='w-full px-[12%] py-10 scroll-mt-20'>
    <h4 className='text-center mb-2 text-lg font-ovo'>What I offer</h4>
    <h2 className='text-center text-5xl font-ovo'>My Services</h2>
    
    <p className="text-center max-w-2xl mx-auto mt-5 mb-12">
     I am a fullstack developer that has a variety of opensource contributions

    </p>

    <div className="grid grid-cols-auto gap-6 my-10">{/* Here me need 4 cols with a gap of 6 between them */}
      {/* We will provide the grid layout so that */}
      {serviceData.map(({icon,title,description,link},index)=>(
        <div key={index}
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
        </div>
      ))}
    </div>

    </div>
  )
}

export default Services