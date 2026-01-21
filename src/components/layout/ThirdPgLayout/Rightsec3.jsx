import React from 'react'
import Right3_center from './Right3_center'
import Right3_bottom from './Right3_bottom'
import Right3_top from './Right3_top'
import { Toaster } from "@/components/ui/sonner"



const Rightsec3 = () => {

  return (
    <div className=' flex flex-col justify-start px-11 pb-6 bg-white'>
      <Right3_top/>
      <Right3_center/>
      <Right3_bottom/>
      <Toaster position="bottom-left" richColors />
    </div>
  )
}

export default Rightsec3
