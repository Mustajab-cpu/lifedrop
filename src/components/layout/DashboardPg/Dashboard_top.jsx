import React from 'react'
import Backarrow from '../../../assets/Backicon.svg'
import {Button} from '@/components/ui/button'
import {useNavigate} from 'react-router-dom'

const Dashboard_top = () => {

  const navigate=useNavigate();

  return (
    <div className=' pt-3 '>
      <Button type="button" variant='ghost' 
        onClick={(e)=> {
          e.preventDefault();
          navigate(-1)
        }}
         className="rounded-full p-0 hover:bg-gray-200 active:scale-90 h-6 w-6 ">
        <img src={Backarrow} alt="back-icon" className='w-2 h-2' />
      </Button>
    </div>
  )
}




export default Dashboard_top
