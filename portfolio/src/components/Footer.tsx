import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
const Footer = ({isDarkMode}:any) => {
  return (
    <div className='mt-20'>
      <div className='text-center'>
        <Image alt='' src={isDarkMode?assets.logo_dark:assets.logo} className='w-36 mx-auto mb-2'/>
     
       <div className='w-max flex items-center gap-2 mx-auto'>
        <Image src={isDarkMode?assets.mail_icon_dark:assets.mail_icon} alt='' className='w-6' />
        tridibroychowdhury9@gmail.com
         
        </div>
      </div>
      <div className='text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6'>
        <p>© 2025 Tridib Roy Chowdhury. All rights reserved.</p>
        <ul className='flex items-center gap-10 justify-center mt-4 sm:mt-0'>
            <li><a target='_blank' href="https://github.com/Tridib2510">Github</a></li>
        {/* target='_blank' opens the page in a new tab */}
            <li><a target='_blank' href="https://www.linkedin.com/in/tridib-roy-chowdhury-13a9b42a4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">LinkedIn</a></li>
            <li><a target='_blank' href="https://x.com/Tridib2510">Twitter</a></li>


        </ul>


      </div>
    </div>
  )
}

export default Footer