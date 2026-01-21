import React from 'react'
import Clockicon from '@/assets/Clockicon.svg'
import { Button } from '@/components/ui/button'
import {useNavigate} from 'react-router-dom'
import {toast} from 'sonner'
import {useAuth} from '@/context/AuthContext'
import {hospitalData} from '@/data/hospitals'


const Right2_bottom = () => {

  const navigate=useNavigate();
  const { isLoggedIn, user, login, setMapFocus } = useAuth();
  
  const userBloodType= user?.bloodType;

  const filteredHospitals = hospitalData.filter(h => {
    if (!userBloodType) return true;
    return h.needs.includes(userBloodType.toUpperCase());
  });

  let handleDonateButton=(e, hospital)=>{

    e.stopPropagation();

    if(isLoggedIn){

      const newHistoryItem={
        id: Date.now(),
        bankName : hospital.name,
        date: new Date().toISOString()
      }

      const updatedUser = {
        ...user,
        lastDonationDate: new Date().toISOString(),
        donationCount: (user.donationCount || 0) + 1,
        history: [newHistoryItem, ...(user.history || [])]
      };
      login(updatedUser);
      
      toast.success("Slot booked!",{description:"Visit the selected location to donate your blood"})
    }else{
      navigate('/page3')
    }

  }

  return (
    <div className="flex flex-col gap-4  pr-2 pb-10 scrollbar-hide">
      {filteredHospitals.map((hospital) => (
        <div key={hospital.id} onClick={()=> setMapFocus(hospital.coords)} className="bg-[#F8F8F8] p-3 rounded-[24px] flex gap-5 items-center cursor-pointer active:scale-98 transition-all duration-100 hover:scale-102 hover:shadow-sm hover:border-2 border-gray-200 ">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-gray-100">
            <img 
              src={hospital.image} 
              alt={hospital.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[15px] tracking-tight">{hospital.name}</h3>
            <p className="text-[10px] text-gray-400 font-normal pt-0.5">{hospital.location}</p>
            <div className="flex items-center justify-between mt-4 ">
              <span className=" flex items-center gap-1 text-[10px] border px-3 py-1 rounded-full border-gray-300 text-gray-500">
                <img src={Clockicon} alt="clockicon" className='h-2 w-2 text-gray-500'/>{hospital.time}
              </span>
              <Button onClick={(e)=> handleDonateButton(e, hospital)} className="h-6 bg-[#E11D1D] rounded-xl px-4 font-semibold text-[10px] hover:ring-[#ff9090] ring-[2.5px] hover:bg-[#e11d1d] shadow-lg shadow-red-50 active:scale-96 transition-all">Donate</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Right2_bottom
