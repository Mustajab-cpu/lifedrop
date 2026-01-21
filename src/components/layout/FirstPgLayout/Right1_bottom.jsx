import React,{useState} from 'react'
import { Button } from '@/components/ui/button'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import {useNavigate} from 'react-router-dom'
import {toast} from 'sonner'


const Right1_bottom = () => {

  const navigate=useNavigate();

  const [BloodType, setBloodType]=useState("");

  const handleFindbanks=()=>{
    if(!BloodType){
      return toast.error("Missing info!", {description:"Please select your blood type"})
    }
    navigate('/page2',{
      state:{selectedBloodType: BloodType}
    })
  }

  return (
    <div className="w-full">
      {/* Reduced mb-5 to mb-4 to save vertical space */}
      <div className='flex flex-col gap-3 mb-4'>
        <Select onValueChange={setBloodType}>
          <SelectTrigger className="w-full h-0 py-0 border-gray-100 rounded-lg font-sans text-[10px] px-3 [&>span>svg]:text-gray-100 [&>span>svg]:opacity-100 ">
            <SelectValue placeholder="Bengaluru"/>
          </SelectTrigger>
        </Select>

        <Select onValueChange={setBloodType}>
          <SelectTrigger className="w-full h-10 py-0 border-gray-300 rounded-lg font-sans text-[10px] px-3">
            <SelectValue placeholder="Your blood type" />
          </SelectTrigger>
          <SelectContent className="max-h-45 p-0.5 text-xs">
            <SelectItem value="a+">A+</SelectItem>
            <SelectItem value="a-">A-</SelectItem>
            <SelectItem value="b+">B+</SelectItem>
            <SelectItem value="b-">B-</SelectItem>
            <SelectItem value="o+">O+</SelectItem>
            <SelectItem value="o-">O-</SelectItem>
            <SelectItem value="ab+">AB+</SelectItem>
            <SelectItem value="ab-">AB-</SelectItem>
          </SelectContent>
        </Select>
      </div>

      
      <Button type="button" onClick={handleFindbanks} className="w-full h-10 bg-[#E11D1D] hover:bg-[#E11D1D] active:bg-linear-to-b active:from-[#cb0a0a] active:to-[#ef1818] transition-colors duration-300 ease-in-out text-white text-[12px] font-bold rounded-lg border-3 border-[#ff6e6e] shadow-lg shadow-red-50 active:scale-99">
        Find Banks
      </Button>

      
      <div className="flex items-center gap-4 my-4">
        <div className="h-px flex-1 bg-gray-200"></div>
        <span className="text-gray-400 text-[12px] font-sans">or</span>
        <div className="h-px flex-1 bg-gray-200"></div>
      </div>

      
      <Button type="button" onClick={()=>{navigate('/Login')}} className="w-full h-10 bg-black hover:bg-gray-950 text-white text-[12px] font-bold rounded-lg border-3 border-[#b3b3b3] transition-colors shadow-lg active:scale-99 ">
        Login
      </Button>
    </div>
  )
}

export default Right1_bottom