"use client";

import React from 'react';
import Image from 'next/image';
import { useState } from 'react';


export default function page() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  

  return (
    <div className='container h-[calc(100vh-160px)] mx-auto px-2 sm:px-0 flex flex-col justify-center items-center py-20'>
      <div className="size-[300px] relative">
        <Image 
          src="/book.png" 
          alt="" 
          fill
          className='object-contain'
        />
      </div>
      <div className="border-2 grid gap-5">
        <h1 className='text-[36px] text-center'>Sign Up</h1>
        <span className='text-[20px] flex gap-2'>Username : <input className='' value={username} onChange={(text) => {setUsername(text.target.value)}} placeholder='fill your username'/></span>
        <span className='text-[20px] flex gap-2'>Password : <input className='' value={password} onChange={(text) => {setPassword(text.target.value)}} placeholder='fill your password'/></span>
        <span className='text-[20px] flex gap-2'>Email : <input className='' value={email} onChange={(text) => {setEmail(text.target.value)}} placeholder='fill your email'/></span>
        <button type='submit' className='w-[100px] h-[50px] mx-auto border-2 border-black rounded-md text-white bg-blue-600 hover:bg-blue-600/70'>Submit</button>
      </div> 
    </div>
  )
}
