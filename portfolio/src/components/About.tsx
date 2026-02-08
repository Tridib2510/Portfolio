import React from 'react'
import Image from 'next/image'
import {motion} from "motion/react"
import { assets, infoList ,toolsData} from '@/assets/assets'
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";

const techStack = [
  { name: 'Python', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg', link: 'https://www.python.org' },
  { name: 'Java', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg', link: 'https://www.java.com' },
  { name: 'C', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg', link: 'https://www.cprogramming.com/' },
  { name: 'JavaScript', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'TypeScript', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg', link: 'https://www.typescriptlang.org/' },
  { name: 'HTML5', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg', link: 'https://www.w3.org/html/' },
  { name: 'TailwindCSS', icon: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg', link: 'https://tailwindcss.com/' },
  { name: 'MySQL', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg', link: 'https://www.mysql.com/' },
  { name: 'MongoDB', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg', link: 'https://www.mongodb.com/' },
  { name: 'PostgreSQL', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg', link: 'https://www.postgresql.org' },
  { name: 'Jupyter', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/jupyter/jupyter-original-wordmark.svg', link: 'https://jupyter.org/' },
  { name: 'Docker', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg', link: 'https://www.docker.com/' },
  { name: 'TensorFlow', icon: 'https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg', link: 'https://www.tensorflow.org' },
  { name: 'PyTorch', icon: 'https://www.vectorlogo.zone/logos/pytorch/pytorch-icon.svg', link: 'https://pytorch.org/' },
  { name: 'LangChain', icon: 'https://avatars.githubusercontent.com/u/126733545?s=200&v=4', link: 'https://www.langchain.com/' },
  { name: 'OpenAI', icon: 'https://cdn.worldvectorlogo.com/logos/openai-2.svg', link: 'https://openai.com/' },
  { name: 'AWS', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', link: 'https://aws.amazon.com' },
  { name: 'React', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg', link: 'https://reactjs.org/' },
  { name: 'Next.js', icon: 'https://cdn.worldvectorlogo.com/logos/nextjs-2.svg', link: 'https://nextjs.org/' },
  { name: 'Express', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg', link: 'https://expressjs.com' },
  { name: 'Node.js', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg', link: 'https://nodejs.org' },
];

const About = ({isDarkMode}:{isDarkMode:boolean}) => {
  return (
    <motion.div 
     initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{duration:1}}
    id="about" className='w-full px-[12%] py-10 scroll-mt-20'>
        <motion.h4 
        initial={{opacity:0,y:-20}}
        whileInView={{opacity:1,y:0}}
        transition={{duration:0.5,delay:0.5}}
        className='text-center mb-2 text-lg font-ovo'>Introduction</motion.h4>
        <motion.h2 className='text-center text-5xl font-ovo'>About me</motion.h2>
        
        <motion.div 
        initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{duration:0.8}}
        className='flex w-full flex-col lg:flex-row items-center gap-20 my-20'>
            <motion.div
            initial={{opacity:0,scale:0.9}}
                whileInView={{opacity:1,scale:1}}
                transition={{duration:0.6}}
            className='w-80 sm:w-96 lg:w-[28rem] rounded-3xl max-w-none'>
      <div className="w-full">
  <div className="aspect-square w-full">
    <PixelatedCanvas
      src={assets.user_image}
      width={350}
      height={350}
      className="w-full h-full rounded-2xl shadow-2xl"
      cellSize={5}
      dotScale={0.85}
      shape="square"
      backgroundColor="#000000"
      dropoutStrength={0.08}
      interactive
      distortionStrength={0.08}
      distortionRadius={150}
      distortionMode="repel"
      followSpeed={0.15}
      jitterStrength={3}
      jitterSpeed={0.8}
      sampleAverage
    />
  </div>
</div>
    </motion.div>
    <motion.div 
    initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{duration:0.6,delay:1}}
    className='flex-1'>
      <p className='mb-10 max-w-2xl font-ovo text-lg leading-relaxed'>
        I am a passionate <span className={`font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Software Developer</span> with deep expertise in <span className={`font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Fullstack Development</span>, <span className={`font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Machine Learning</span>, <span className={`font-bold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Generative AI</span>, and <span className={`font-bold ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>Large Language Models (LLMs)</span>. I build scalable web applications and intelligent AI systems that solve real-world problems.
      </p>
      <motion.ul
      initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{duration:1}}
      className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl'>
        {infoList.map(({icon,iconDark,title,description},index)=>(
           <motion.li key={index}            
        whileHover={{scale:1.05}}
           className={`border-[0.5px] border-gray-400 rounded-xl p-6 cursor pointer hover:bg-purple-100 hover:-translate-y-1 duration-500 shadow-black hover:shadow-black hover:shadow-lg ${isDarkMode?'border-white hover:shadow-white hover:bg-darkHover/50':''}`}>
            <Image src={isDarkMode?iconDark:icon} alt={title} className='w-7 mt-3' />
            <h3 className={`my-4 font-semibold text-gray-700 ${isDarkMode?'text-white':''}`}>{title}</h3>
            <p className={`text-gray-600 text-sm ${isDarkMode?'text-white':''}`}>{description}</p>
           </motion.li>
        ))}
      </motion.ul>
      <motion.h4 
      initial={{y:20,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{delay:1.3,duration:0.5}}
      className={`my-8 text-xl font-semibold text-gray-700 ${isDarkMode?'text-white':''}`}>Tech Stack</motion.h4>
      <motion.div
     initial={{y:20,opacity:0}}
        whileInView={{opacity:1}}
        transition={{delay:1.5,duration:0.6}}
      className={`flex flex-wrap gap-4 max-w-4xl`}>
        {techStack.map((tech,index)=>(
          <motion.a 
          key={index}
          href={tech.link}
          target='_blank'
          rel='noreferrer'
           whileHover={{scale:1.15, y: -5}}
          className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 border border-gray-400 rounded-xl cursor-pointer hover:-translate-y-1 duration-500 transition-all ${isDarkMode?'border-white/30 hover:border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]':'hover:border-purple-500 hover:shadow-lg'}`}>
          <Image src={tech.icon} alt={tech.name} width={32} height={32} className='w-7 h-7 sm:w-8 sm:h-8' />
          </motion.a>
        ))}
      </motion.div>
      <motion.h4 
      initial={{y:20,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{delay:1.7,duration:0.5}}
      className={`mt-10 mb-6 text-gray-700 ${isDarkMode?'text-white/80':''}`}>Other Tools</motion.h4>
      <motion.ul
     initial={{y:20,opacity:0}}
        whileInView={{opacity:1}}
        transition={{delay:1.9,duration:0.6}}
      className='flex items-center gap-3 sm:gap-5'>
        {toolsData.map((tool,index)=>(
          <motion.li 
          key={index}
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