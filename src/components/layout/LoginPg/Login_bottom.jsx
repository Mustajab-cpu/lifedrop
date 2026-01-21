import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
// REMOVED: import Login from '@/pages/Login' (Circular dependency)

const Login_bottom = () => {
  const [LoginData, setLoginData] = useState({ name: "", phone: "" })
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault()

    if (!LoginData.name.trim() || LoginData.phone.length !== 10) {
      return toast.error("Invalid login", { description: "Please enter valid info" })
    }

    const allUsers = JSON.parse(localStorage.getItem('all_registered_users') || "[]");
    const existingUser = allUsers.find(u => u.phone === LoginData.phone && u.name.toLowerCase().trim() === LoginData.name.toLowerCase().trim());

    if (existingUser) {
      login(existingUser);
      toast.success("Logging in...");
      navigate('/dashboard');
    } else {

      const phoneExists = allUsers.some(u => u.phone === LoginData.phone);

      if(phoneExists){
        toast.error("Login failed",{description:"The name entered does not match the record for this phone number."})
      } else{

        toast.error("Account not found", { 
        description: "This phone number isn't registered. Redirecting to signup..." 
      });
      setTimeout(() => navigate('/page3'), 2000);
      }
    }
  }

  return (
    <div className='w-full'>
      <form onSubmit={handleLogin} className='flex flex-col gap-4 w-full max-w-md mt-2'>
        <Input 
          value={LoginData.name}
          onChange={(e) => setLoginData({ ...LoginData, name: e.target.value })} 
          placeholder="Full Name" 
          className="bg-[#fafafa] border-[1.5px] placeholder:text-[12px] border-[#d7d7d7] h-9 rounded-sm px-4 focus-visible:ring-1 focus-visible:ring-red-200 text-[11px]"
        />
        <Input 
          value={LoginData.phone}
          onChange={(e) => setLoginData({ ...LoginData, phone: e.target.value.replace(/\D/g, "") })} 
          placeholder="Phone number" 
          className="bg-[#fafafa] border-[1.5px] placeholder:text-[12px] border-[#d7d7d7] h-9 rounded-sm px-4 focus-visible:ring-1 focus-visible:ring-red-200 text-[11px]"
        />
        <Button type="submit" className="w-full h-10 mt-6 bg-black hover:bg-gray-950  text-white text-[12px] font-bold rounded-lg border-3 border-[#b3b3b3] shadow-lg active:scale-99 transition-all">
          Login
        </Button>
      </form>
    </div>
  )
}

export default Login_bottom