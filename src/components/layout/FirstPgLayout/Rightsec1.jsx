import React, { useEffect } from 'react'
import Right1_top from './Right1_top'
import Right1_bottom from './Right1_bottom'
import Right1_center from './Right1_center'
import { Toaster } from "@/components/ui/sonner"
import { useAuth } from '@/context/AuthContext'

const Rightsec1 = () => {

  const {logout, user} = useAuth();

  useEffect(()=>{
    if(user){
      logout()
    }
  },[logout,user]);

  return (
    <div className='h-full w-full flex flex-col justify-start px-16 overflow-hidden'>
      <Right1_top/>
      <div className="flex-1 flex flex-col justify-center">
         <Right1_center/>
         <Right1_bottom/>
         <Toaster position="bottom-left" richColors />
      </div>
    </div>
  )
}

export default Rightsec1
