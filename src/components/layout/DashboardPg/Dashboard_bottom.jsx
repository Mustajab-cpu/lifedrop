import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { Key } from 'lucide-react';
import {Button} from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const Dashboard_bottom = () => {

  const {user, logout}=useAuth();
  const navigate=useNavigate();

  const handleLogout = ()=>{
    logout();
    navigate('/');
  }

  const history= user?.history || [];

  return (
    <div className='flex flex-col mt-10'>
      <div className='flex items-center gap-4'>
        <div className='font-medium text-[14px]'>Your history</div>
        <div className="h-0.5 flex-1 rounded-full bg-gray-200"></div>
      </div>

      <div className=' flex flex-col gap-3 h-full w-full my-5 py-4 bg-gray-100 rounded-sm '>
        {history.length > 0 ? (
          history.map((item) => (
            <div key={item.id} className='flex justify-between px-5'>
              <p className='font-medium text-[10px]'>{item.bankName}</p>
              <p className='font-medium text-[10px] text-gray-400'>{new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
            </div>
          ))
        ):(
          <div className='px-5 py-6 text-center text-gray-400 text-[10px]'>
            No donations yet
          </div>
        )}
      </div>

      <Button onClick={handleLogout} className="h-9 w-full bg-gray-300 border-3 border-gray-200 text-gray-600 hover:bg-red-600 hover:border-3 hover:border-red-300 hover:text-white text-[12px] cursor-pointer active:scale-95 mt-6">
        Logout
      </Button>

    </div>
  )
}

export default Dashboard_bottom
