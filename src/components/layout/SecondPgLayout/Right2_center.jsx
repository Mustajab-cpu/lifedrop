import React from 'react'
import {useAuth} from '@/context/AuthContext'

const Right2_center = () => {

  const { user } = useAuth();
  const displayType = user?.bloodType || "you";

  return (
    <div className='flex flex-col gap-6 pt-5 pb-6'>
      <h1 className='text-3xl font-medium'>Blood banks<br />for <span className='text-[#e61515] transition-all animate-in fade-in slide-in-from-top-9 duration-4000'>{displayType}</span> </h1>
      <p className='text-[12px] font-normal text-gray-500'>These hospitals urgently need<br />your blood</p>
    </div>
  )
}

export default Right2_center
