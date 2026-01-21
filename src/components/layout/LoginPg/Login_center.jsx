import React from 'react'

const Login_center = () => {
    return (
        <div className='flex flex-col gap-5 pt-5 pb-6'>
            <h1 className='text-[35px] font-medium  leading-9'>Welcome<br />back,<br/><span className='text-[#e61515]  transition-all animate-in fade-in slide-in-from-top-3 duration-2000'>donor</span></h1>
            <p className='text-[12px] text-muted-foreground min-h-8 transition-all animate-in fade-in slide-in-from-bottom-3 duration-700'>Enter your name and your<br/>phone number to login</p>
        </div>
    )
}

export default Login_center
