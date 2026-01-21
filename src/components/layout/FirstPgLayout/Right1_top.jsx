import React from 'react'
import Heartlogo from '../../../assets/Heartlogo.svg'

const Right1_top = () => {
  return (
    <div className=" flex items-center gap-1 pt-6 pb-6">
      <img src={Heartlogo} alt="logo" className='w-3 h-3' />
      <span className='text-[15px] font-bold tracking-tighter pl-1'>LifeDrop</span>
    </div>
  )
}

export default Right1_top
