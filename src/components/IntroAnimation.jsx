import { useEffect, useMemo } from "react";
import React from "react";
import {AnimatePresence,motion} from "framer-motion"


export default function IntroAinimation({onFinish}){
  const greetings=useMemo(()=>["Welcome To Tech World","टेक वर्ल्ड में आपका स्वागत है","مرحبًا بكم في عالم التكنولوجيا","テックワールドへようこそ","테크 월드에 오신 것을 환영합니다","Bienvenue dans le monde de la technologie","Willkommen in der Welt der Technologie","Добро пожаловать в мир технологий","欢迎来到科技世界","टेक वर्ल्डमा स्वागत छ"],[])
  const [index,setIndex]=React.useState(0);
  const [visible,setVisible]=React.useState(true);

  useEffect(()=>{
    if(index<greetings.length-1){
      const id=setInterval(()=>setIndex((i)=>i+1),180)
      return ()=>clearInterval(id);
    }else{
      const t=setTimeout(()=>setVisible(false),500);
      return ()=>clearTimeout(t);
    }
    
  },[index,greetings.length]);

  return (

   <AnimatePresence onExitComplete={onFinish}>
   {visible && (

      <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white overflow-hidden"
      initial={{y:0}}
      exit={{y:"-100%" }}
      transition={{duration:1.05,ease:[0.22,1,0.36,1]}}

      >
        <motion.h1
        key={index}
        className="text-1xl md:text-3xl lg:text-4xl font-bold"
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        exit={{opacity:0,y:-20}}
        transition={{duration:0.12}}
        >
         { greetings[index]}
        </motion.h1>

      </motion.div>


   )}
   </AnimatePresence>
  )

  }

