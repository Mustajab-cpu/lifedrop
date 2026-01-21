import React, { useState } from 'react'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from '@/components/ui/select'
import Nextchev from '@/assets/Nextchevron.svg'
import { Checkbox } from '@/components/ui/checkbox'
import {toast} from 'sonner'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { calculateEligibility } from '@/utils/donationdate_logic'

const Right3_bottom = () => {

  const { login, user} = useAuth();
  const navigate=useNavigate();


  const [CurrentStep,setCurrentStep]= useState(1)
  const [LastDonation,setLastDonation] = useState("")

  const [FormData, setFormData]=useState({
    fullName:"",
    phone:"",
    address:"",
    bloodType:"",
    gender:""
  })

  const [Checks,setChecks]=useState([false,false,false,false])

  const nextStep = (e) => {
    e.preventDefault();

    if(CurrentStep === 1){
      if(!FormData.fullName || !FormData.phone || !FormData.address){
        return toast.error("Missing info!",{description:"Please fill in all the basic info"})
      }
      if(FormData.phone.length !== 10){
        return toast.error("Invalid Phone Number", {description:"Please enter exactly 10 digits"})
      }
    }

    else if(CurrentStep === 2){
      if(!FormData.bloodType || !FormData.gender || !LastDonation){
        return toast.warning("Missing info!",{description:"Please select your options"})
      }
    }

    else if(CurrentStep === 3){
      const allChecked= Checks.every(c=> c=== true);

      if(!allChecked){
        return toast.error("Missing checks!",{description:"You must confirm all the requirements"})
      }

      const newUser = {
        name: FormData.fullName,
        phone: FormData.phone,
        address: FormData.address,
        bloodType: FormData.bloodType,
        gender: FormData.gender,
        lastDonationDate: LastDonation === "never" ? null : LastDonation,
        history: [],
        donationCount:0
      }

      const existingUsers = JSON.parse(localStorage.getItem('all_registered_users') || "[]");

      if (existingUsers.some(u => u.phone === newUser.phone)) {
        return toast.error("Phone already exists", { description: "Try logging in instead." });
      }

      const { isEligible } = calculateEligibility(newUser.lastDonationDate);

      const updatedUsersList = [...existingUsers, newUser];
      localStorage.setItem('all_registered_users', JSON.stringify(updatedUsersList));
      login(newUser);
        
      toast.success("Success!",{description:"profile registered successfully"})
      setTimeout(()=>{
        if(isEligible){
          navigate('/dashboard');
        }else{
          navigate('/page4')
        }
      },3000)
      return
    }
    
    setCurrentStep(CurrentStep + 1)
  };

  return(
    <div className='flex flex-col gap-8 pr-2 pb-5 no-scrollbar'>

      {/* --- STEPPER SECTION --- */}
      <div className='flex items-center w-full max-w-sm animate-in fade-in slide-in-from-left-20 transition-all duration-2000'>
        <div className={`flex items-center justify-center w-6 h-6 rounded-full text-[12px] font-bold shrink-0 transition-colors ${CurrentStep>=1 ? 'bg-[#e11d1d] text-white' : 'bg-gray-200 text-gray-400'}`}>1</div>
        <div className={`flex-1 h-0.5 mx-2 transition-colors ${CurrentStep>=2 ? 'bg-[#e11d1d]' : 'bg-gray-200'}`}/>
        <div className={`flex items-center justify-center w-6 h-6 rounded-full text-[12px] font-bold shrink-0 transition-colors ${CurrentStep>=2 ? 'bg-[#e11d1d] text-white' : 'bg-gray-200 text-gray-400'}`}>2</div>
        <div className={`flex-1 h-0.5 mx-2 transition-colors ${CurrentStep>=3 ? 'bg-[#e11d1d]' : 'bg-gray-200'}`}/>
        <div className={`flex items-center justify-center w-6 h-6 rounded-full text-[12px] font-bold shrink-0 transition-colors ${CurrentStep>=3 ? 'bg-[#e11d1d] text-white' : 'bg-gray-200 text-gray-400'}`}>3</div>
      </div>

      
      <form className='flex flex-col gap-6 w-full max-w-md'>

        {/* --- STEP 1: BASIC INFO --- */}
        {CurrentStep === 1 && (
          <div className='flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-20 transition-all duration-900'>

            <div className='flex flex-col gap-2'>
              <label className='text-[12px] font-normal text-black '>Full Name</label>
              <Input value={FormData.fullName} onChange={(e) => setFormData({...FormData, fullName: e.target.value})}  className='bg-[#fafafa] border-[1.5px] border-[#d7d7d7] h-9 rounded-sm px-4 focus-visible:ring-1 focus-visible:ring-red-200 text-[12px] text-[#737373]'/>
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-[12px] font-normal text-black '>Phone Number</label>
              <Input
                type="text"
                inputMode="numeric"
                value={FormData.phone}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                  if (onlyNums.length <= 10) {
                    setFormData({...FormData, phone: onlyNums})
                  }
                }}
                className='bg-[#fafafa] border-[1.5px] border-[#d7d7d7] h-9 rounded-sm px-4 focus-visible:ring-1 focus-visible:ring-red-200 text-[12px] text-[#737373]'/>
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-[12px] font-normal text-black '>Address</label>
              <Input value={FormData.address} onChange={(e) => setFormData({...FormData, address: e.target.value})}  className='bg-[#fafafa] border-[1.5px] border-[#d7d7d7] h-9 rounded-sm px-4 focus-visible:ring-1 focus-visible:ring-red-200 text-[12px] text-[#737373]'/>
            </div>

          </div>
        )}


        {/* --- STEP 2: --- */}
        {CurrentStep === 2 && (
          <div className='flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 mt-6'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex-1 flex flex-col w-full gap-2'>
                <label className='text-[12px] font-normal'>Blood Type</label>
                <Select onValueChange={(val) => setFormData({...FormData,bloodType:val}) }>
                  <SelectTrigger className='bg-[#fafafa] h-9 text-[12px] text-[#737373] border-[#d7d7d7] w-full'><SelectValue placeholder="Select"/></SelectTrigger>
                  <SelectContent>{["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className='flex-1 flex flex-col gap-2 w-full '>
                <label className='text-[12px] font-normal'>Gender</label>
                <Select onValueChange={(val) => setFormData({...FormData, gender:val})}>
                  <SelectTrigger className=" w-full bg-[#fafafa] h-9 text-[12px] text-[#737373] border-[#d7d7d7]"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-normal">Last Donation Date</label>
              <Input type="date" value={LastDonation === "never" ? "" : LastDonation} disabled={LastDonation === "never"} onChange={(e) => setLastDonation(e.target.value)} className="bg-[#fafafa] h-9 text-[12px] text-[#737373] border-[#d7d7d7]" />
              <div className='flex gap-2 items-center mt-3'>
                <Checkbox id="never-donated" checked={LastDonation === "never"} onCheckedChange={(checked)=>{setLastDonation(checked ? "never" : "")}} className='h-3.5 w-3.5 border-gray-300 data-[state=checked]:bg-[#E11D1D] data-[state=checked]:border-[#E11D1D]'/>
                <label htmlFor='never-donated' className='text-[10px] text-gray-500 font-medium leading-none"'>Never donated before</label>
              </div>
            </div>
          </div>
        )}

        {/* --- STEP 3 ----*/}
        {CurrentStep === 3 && (
          <div className='flex flex-col gap-3 animate-in fade-in slide-in-from-right-4'>
            <div className='space-y-4 py-8'>
              {[
                "I am between 18 and 65 years old",
                "I weigh at least 50 kg",
                "I feel healthy today (no fever, cold, or illness)",
                "I understand final screening happens at the blood bank"
              ].map((text,i)=>(
                <div key={i} className='flex items-center space-x-3'>

                  <Checkbox 
                    id={`check-${i}`}
                    checked={Checks[i]}
                    onCheckedChange={(checked)=> {
                      const newChecks = [...Checks];
                      newChecks[i] = !!checked;
                      setChecks(newChecks);
                    }} 
                    className='border-gray-300 data-[state=checked]:bg-[#e11d1d] data-[state=checked]:border-[#e11d1d]'/>
                
                  <label htmlFor={`check-${i}`} className="text-[12px] font-medium leading-none text-[#525252]">{text}</label>
                </div>
              ))
              }
            </div>
            <p className="text-[10px] text-gray-400">This is self-certification. Professional check done on-site.</p>
          </div>
        )}

        <Button onClick={nextStep} className='h-10 mt-3 py-5 border-3 text-[14px] bg-black shadow-lg border-gray-500 hover:bg-black cursor-pointer active:scale-97 transition-all flex items-center justify-center gap-2'>
          {CurrentStep === 3 ? "Register & Save Profile" : "Next"}
          {CurrentStep < 3 && <img src={Nextchev} alt="right arrow" className='h-2 w-2'/> }
        </Button>


      </form>


    </div>

  )


}

export default Right3_bottom