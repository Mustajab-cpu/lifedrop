import React from 'react'
import { Button } from '@/components/ui/button'
import Backarrow from '@/assets/whitebackicon.svg'
import {useNavigate} from 'react-router-dom'
import {calculateEligibility} from '@/utils/donationdate_logic'
import { useAuth } from '@/context/AuthContext'


const Right4_bottom = () => {

  const navigate=useNavigate();
  const {user}=useAuth();
  const {daysLeft} = calculateEligibility(user?.lastDonationDate);

  return (
    <div className="flex flex-col mt-12">
      
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-medium  tracking- text-black">
          Sorry, <br /> 
          You can't <br /> 
          donate<br/>
          today
        </h1>
        
        <p className="text-gray-500 font-normal text-[12px] leading-relaxed max-w-[320px]">
          To keep you healthy,<br/>we recommend you to donate<br/>after 
          <span className="text-[#E11D1D] font-bold"> {daysLeft} days</span>
        </p>

        <Button 
          type="button"
          onClick={()=> navigate('/')}
          className="mt-6 w-full max-w-70px h-10 bg-black text-white rounded-sm flex items-center justify-center gap-3 text-[14px] font-bold border-3 border-gray-500 transition-all shadow-lg active:scale-97 hover:bg-black"
        >
          <img src={Backarrow} alt="back icon" className='h-2 w-2'/>
          Back to home
        </Button>
      </div>
    </div>
  )
}

export default Right4_bottom