import React from 'react'
import Login_top from './Login_top'
import Login_center from './Login_center'
import Login_bottom from './Login_bottom'
import { Toaster } from "@/components/ui/sonner"


const Loginsec = () => {
  return (
    <div className='h-full w-full flex flex-col justify-start px-16 overflow-hidden'>
      <Login_top/>
      <Login_center/>
      <Login_bottom/>
      <Toaster position="bottom-left" richColors />
    </div>
  )
}

export default Loginsec
