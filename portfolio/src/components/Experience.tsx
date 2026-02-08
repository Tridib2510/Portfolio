import React from 'react'
import {motion} from "motion/react"
import { experienceData } from '@/assets/assets'

const Experience = ({isDarkMode}:{isDarkMode:boolean}) => {
  return (
    <motion.div 
     initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{duration:1}}
    id="experience" className='w-full px-[12%] py-10 scroll-mt-20'>
        <motion.h4 
        initial={{opacity:0,y:-20}}
        whileInView={{opacity:1,y:0}}
        transition={{duration:0.5,delay:0.5}}
        className='text-center mb-2 text-lg font-ovo'>Career Journey</motion.h4>
        <motion.h2 
        initial={{opacity:0,y:20}}
        whileInView={{opacity:1,y:0}}
        transition={{duration:0.5,delay:0.7}}
        className='text-center text-5xl font-ovo mb-16'>My Experience</motion.h2>
        
        <motion.div 
        initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{duration:0.8,delay:0.9}}
        className="max-w-4xl mx-auto">
            <div className="relative">
                {/* Timeline line */}
                <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${isDarkMode ? 'bg-white/20' : 'bg-gray-300'}`} />
                
                {experienceData.map((item, index) => (
                    <motion.a
                        key={index}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{opacity:0, x: -50}}
                        whileInView={{opacity:1, x: 0}}
                        transition={{duration: 0.6, delay: index * 0.2}}
                        className="relative pl-20 pb-12 last:pb-0 block"
                    >
                        {/* Timeline dot */}
                        <div className={`absolute left-6 w-5 h-5 rounded-full border-4 ${isDarkMode ? 'bg-purple-500 border-white/20' : 'bg-purple-600 border-white'}`} />
                        
                        <motion.div
                            whileHover={{scale: 1.02}}
                            className={`rounded-xl p-6 border-2 transition-all duration-300 hover:shadow-xl ${
                                isDarkMode 
                                    ? 'bg-white/5 border-white/20 hover:border-purple-500/50 hover:shadow-purple-500/20' 
                                    : 'bg-white border-gray-200 hover:border-purple-500 hover:shadow-purple-500/10'
                            }`}
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {item.title}
                                </h3>
                                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                                    isDarkMode 
                                        ? 'bg-purple-500/20 text-purple-400' 
                                        : 'bg-purple-100 text-purple-600'
                                }`}>
                                    {item.period}
                                </span>
                            </div>
                            
                            <h4 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                                {item.company}
                            </h4>
                            
                            <ul className="space-y-2">
                                {item.description.map((desc, idx) => (
                                    <li key={idx} className={`flex items-start gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isDarkMode ? 'bg-purple-400' : 'bg-purple-600'}`} />
                                        <span className="text-sm leading-relaxed">{desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.a>
                ))}
            </div>
        </motion.div>
    </motion.div>
  )
}

export default Experience