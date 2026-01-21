import React from 'react'
import Heartlogo from '../../../assets/Heartlogo.svg'
import {useNavigate} from 'react-router-dom'

const Login_top = () => {

  const navigate=useNavigate();

  return (
    <div
      onClick={() => navigate('/')}
      className={`flex items-center gap-1 pt-6 pb-6 cursor-pointer active:scale-95 transition-transform`}>
        <img src={Heartlogo} alt="logo" className='w-3 h-3 ' />
        <span className='text-[15px] font-bold tracking-tighter pl-1'>LifeDrop</span>
    </div>
  )
}
export default Login_top
