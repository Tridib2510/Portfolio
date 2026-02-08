import React from 'react'
import {motion} from "motion/react"
import { Github, Award } from "lucide-react"
import { patentData } from '@/assets/assets'

const Patents = ({isDarkMode}:{isDarkMode:boolean}) => {
  return (
    <motion.div 
     initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{duration:1}}
    id="patents" className='w-full px-[12%] py-10 scroll-mt-20'>
        <motion.h4 
        initial={{opacity:0,y:-20}}
        whileInView={{opacity:1,y:0}}
        transition={{duration:0.5,delay:0.5}}
        className='text-center mb-2 text-lg font-ovo'>Intellectual Property</motion.h4>
        <motion.h2 
        initial={{opacity:0,y:20}}
        whileInView={{opacity:1,y:0}}
        transition={{duration:0.5,delay:0.7}}
        className='text-center text-5xl font-ovo mb-16'>Patents & Publications</motion.h2>
        
        <motion.div 
        initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{duration:0.8,delay:0.9}}
        className="max-w-4xl mx-auto">
            {patentData.map((patent, index) => (
                <motion.a
                    key={index}
                    href={patent.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{opacity:0, y: 30}}
                    whileInView={{opacity:1, y: 0}}
                    transition={{duration: 0.6, delay: index * 0.2}}
                    whileHover={{scale: 1.02, y: -5}}
                    className={`block rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-2xl ${
                        isDarkMode 
                            ? 'bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30 hover:border-purple-500 hover:shadow-purple-500/30' 
                            : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-300 hover:border-purple-500 hover:shadow-purple-500/20'
                    }`}
                >
                    <div className="flex items-start justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                                <Award className={`w-8 h-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                            </div>
                            <div>
                                <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                                    isDarkMode 
                                        ? 'bg-purple-500/30 text-purple-400' 
                                        : 'bg-purple-600 text-white'
                                }`}>
                                    {patent.status}
                                </span>
                            </div>
                        </div>
                        
                        {patent.link && (
                            <Github className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                        )}
                    </div>
                    
                    <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {patent.title}
                    </h3>
                    
                    <p className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                        {patent.patentNumber}
                    </p>
                    
                    <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {patent.publicationDate}
                    </p>
                    
                    <ul className="space-y-3">
                        {patent.description.map((desc, idx) => (
                            <li key={idx} className={`flex items-start gap-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                <span className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${isDarkMode ? 'bg-purple-400' : 'bg-purple-600'}`} />
                                <span className="text-sm leading-relaxed">{desc}</span>
                            </li>
                        ))}
                    </ul>
                </motion.a>
            ))}
        </motion.div>
    </motion.div>
  )
}

export default Patents