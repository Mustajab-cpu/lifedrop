import React from 'react'
import Heartlogo from '@/assets/Heartlogo.svg'
import Bloodimg from '@/assets/Bloodpallette.svg'
import Greenbg from '@/assets/Greenbg.svg'
import {useAuth} from '@/context/AuthContext'
import {calculateEligibility} from '@/utils/donationdate_logic'
import {useNavigate} from 'react-router-dom'


const Dashboard_center = () => {

  const navigate= useNavigate();
  const {user} = useAuth();

  const {daysLeft,isEligible}=calculateEligibility(user?.lastDonationDate);

  return (
    <div className='flex flex-col mt-5'>
      <p className='font-medium text-3xl pt-2 leading-tight'>
        Hello,<br/>
        <span className='flex items-center gap-2'>
          {user?.name || "donor"}
          <img src={Heartlogo} alt="heart icon" className='h-5.5 w-5.5  transition-all animate-in fade-in slide-in-from-bottom-6 duration-1000'/>
        </span>
      </p>
      <div className="pt-5 min-h-15">
        {isEligible ? (
          <p className="text-gray-600 font-normal text-[12px] leading-relaxed animate-in fade-in duration-1000">
            You can donate today<br/>
            <span className="text-gray-500 font-normal text-[12px] leading-relaxed">Visit your nearest<span onClick={()=>{navigate('/page2')}} className='text-[#e11d1d] font-semibold cursor-pointer hover:underline'> blood bank</span> to save lives.</span>
          </p>
        ) : (
          <p className="text-gray-500 font-normal text-[12px] leading-relaxed max-w-[320px]">
            To keep you healthy,<br/>we recommend you to donate<br/>after 
            <span className="text-[#E11D1D] font-bold"> {daysLeft} days</span>
          </p>
        )}
      </div>

      <div className=" flex items-center justify-between h-14 w-full rounded-[10px] mt-7 relative overflow-hidden bg-[linear-gradient(90deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.30)_50%)]">
        <img src={Bloodimg} alt="blood palletes" className='absolute inset-0 w-full h-full object-cover scale-105 opacity-100 pointer-events-none '/>
        <div className="relative z-10 flex items-center justify-between px-5 h-full w-full">
          <p className="text-white font-semibold text-[16px]">Blood Type</p>
          <p className="text-white font-semibold text-[32px]">{user?.bloodType || "--"}</p>
        </div>
      </div>

      <div className='hover:scale-101 hover:rotate-1 active:scale-99 transition-all duration-300 hover:shadow-[0_20px_12px_-15px_rgba(0,80,0,0.6)] h-42 w-full mt-5 rounded-[10px] relative overflow-hidden bg-amber-200'>
        <img src={Greenbg} alt="greenbg" className=' absolute inset-0 w-full h-full object-cover scale-105 pointer-events-none' />
        <div className='relative z-10 h-full w-full flex items-end px-6 pb-3 gap-5'>

          <h1 className=' text-white text-[105px] font-semibold leading-none tracking-tighter'>
            {(user?.donationCount || 0) }
          </h1>

          <p className=' text-white text-[16px] font-semibold leading-tight max-w-35 mb-4'>
            Lives Potentially saved
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard_center
