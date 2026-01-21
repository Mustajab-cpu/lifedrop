import React, { useState,useEffect } from 'react'

const Right1_center = () => {

  const sentences=[
    "Donate your blood where it's needed the most",
    "One donation can save up to 3 lives in Bengaluru's busy hospitals",
    "Bengaluru hospitals need around 700-800 units of blood every day"
  ]

  const [index,setIndex]=useState(0)

  useEffect(()=>{ 
    const timer=setInterval(()=>{
      setIndex((prevIndex)=>(prevIndex+1) % sentences.length);
    },5000)
    return ()=> clearInterval(timer);
  },[sentences.length]);


  return (
    <div className='flex flex-col gap-5 pt-5 pb-6'>
      <h1 className='text-[35px] font-medium  leading-9'>Save a life<br />today</h1>
      <p key={index} className='text-[12px] text-muted-foreground min-h-8 transition-all animate-in fade-in slide-in-from-bottom-3 duration-700'>{sentences[index]}</p>
    </div>
  )
}

export default Right1_center
