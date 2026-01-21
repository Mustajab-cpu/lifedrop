import React from 'react'
import Right2_top from './Right2_top'
import Right2_center from './Right2_center'
import Right2_bottom from './Right2_bottom'
import { Toaster } from "@/components/ui/sonner"

const Rightsec2 = () => {
  return (
    <div className=' flex flex-col justify-start px-11 pb-6 bg-white transition-all animate-in fade-in slide-in-from-bottom-3 duration-700'>
      <Right2_top/>
      <Right2_center/>
      <Right2_bottom/>
      <Toaster position="bottom-left" richColors />
      
    </div>
  )
}

export default Rightsec2
