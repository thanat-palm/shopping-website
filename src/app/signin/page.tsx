"use client";

import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

export default function page() {

  const [username , setUsername] = useState('');
  const [password , setPassword] = useState('');
  const onSubmit = () => {
    console.log("username: " , username);
    console.log("password: " , password);
  }

  return (
    <div className='container h-[calc(100vh-160px)] mx-auto px-2 sm:px-0 flex flex-col justify-center items-center py-20'>
      <div className="w-[200px] h-[200px] relative">
        <Image 
          src="/lock.png" 
          alt="" 
          fill
          className='object-contain'
        />
      </div>
      <div className="border-2 grid gap-5">
        <h1 className='text-[36px] text-center'>Sign In</h1>
        <span className='text-[20px] flex gap-2'>Username : <input type='text' className='bg-slate-400/10' onChange={uname=>setUsername(uname.target.value)} placeholder='fill your username'/></span>
        <span className='text-[20px] flex gap-2'>Password : <input type='password' className='bg-slate-400/10' onChange={pass=>setPassword(pass.target.value)} placeholder='fill your password'/></span>
        <span className='flex items-center justify-between'><span className='flex items-center gap-2'><input type='checkbox' className='size-5'/> Remember me </span><Link href="#" className='hover:text-blue-700 hover:underline decoration-blue-700 decoration-solid'>forgot your password</Link></span>
        <button type='submit' onClick={onSubmit} className='w-[100px] h-[50px] mx-auto border-2 border-black rounded-md text-white bg-blue-600 hover:bg-blue-600/70'>Sign in</button>
      </div> 
    </div>
  )
}
