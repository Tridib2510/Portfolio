import React from 'react'
import Image from 'next/image'
import { assets, infoList ,toolsData} from '@/assets/assets'
const About = () => {
  return (
    // we add and id since when we click a link it scroll
    // to this about section
    <div id="about" className='w-full px-[12%] py-10 scroll-mt-20'>
        <h4 className='text-center mb-2 text-lg font-ovo'>Introduction</h4>
        <h2 className='text-center text-5xl font-ovo'>About me</h2>
        < div className='flex w-full flex-col lg:flex-row items-center
    gap-20 my-20'>
            {/* Now we try to create some columns in the left side we add the image
            and in the right side we try to add some information
             */}
    <div className='w-64 sm:w-80 rounded-3xl max-w-none'>
        <Image alt="user" src={assets.user_image} 
        className='w-full rounded-3xl'
        />
    </div>
    <div className='flex-1'>
      <p className='mb-10 max-w-2xl font-ovo'>
        I am a Fullstack Developer with with knowledge about web development,AI,Machine Learning.
      </p>
      <ul className='grid grid-cols-1 sm:grid-cols-3 gap-6 
      max-w-2xl'>
        {/* In the assets we have the info list where
        which contain ouor tect task with icons
        */}
        {infoList.map(({icon,iconDark,title,description},index)=>(
           <li key={index} 
           className='border-[0.5px] border-gray-400 rounded-xl p-6 cursor pointer hover:bg-purple-100 hover:-translate-y-1 duration-500 shadow-black hover:shadow-black hover:shadow-lg
'//we try to change it's color and move it up when we hover over it
          //we also apply a shadow
          >
            <Image src={icon} alt={title} className='w-7 mt-3' />
            <h3 className='my-4 font-semibold text-gray-700'>{title}</h3>
            <p className='text-gray-600 text-sm'>{description}</p>
           </li>
        ))}
      </ul>
      {/* Adding icons for the tools we use */}
      <h4 className='my-6 text-gray-700 '>Tools I use</h4>
      <ul className='flex items-center gap-3 sm:gap-5'>
        {toolsData.map((tool,index)=>(
          <li className='flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:-translate-y-1 duration-500'>
          <Image src={tool} alt='Tool' className='w-5 sm:w-7'/>
          </li>
        ))}
        
      </ul>
    </div>
        </div>
    </div>
  )
}

export default About