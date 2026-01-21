import React from 'react'
import Backarrow from '../../../assets/Backicon.svg'
import {Button} from '@/components/ui/button'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const Right2_top = () => {

  const navigate= useNavigate();
  const {user, isLoggedIn} = useAuth();

  return (
    <div className=' flex justify-between pt-6 '>
      <Button variant='ghost' onClick={()=> navigate(-1)} className="rounded-full p-0 hover:bg-gray-200 active:scale-90 h-6 w-6 ">
        <img src={Backarrow} alt="back-icon" className='w-2 h-2' />
      </Button>
      {isLoggedIn && (
        <div type="button" onClick={()=> navigate('/dashboard')} className=' flex items-center justify-center rounded-full h-8 w-8  bg-gray-200 ring-2 ring-gray-300 hover:scale-112 hover:ring-[2.5px] active:scale-95 cursor-pointer transition-all'>
        <p className='text-gray-400 font-medium text-sm uppercase'>{user?.name?.charAt(0) || "U"}</p>
      </div>
      )}
    </div>
  )
}

export default Right2_top
