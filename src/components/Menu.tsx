"use client";

import React from 'react'
import { useState , useEffect } from 'react';


interface Shops {
  description: string;
  id: number;
  image: string;
  price: string;
  category: string;
  title: string;
  rating: [];
}
  

export default function Menu() {
    
  const [getdata , setGetdata] = useState<Shops[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setGetdata(data));
    }
    fetchData();
    
  },[]);
  console.log(getdata);
  return (
    <div className='my-5 border-2'>
      <h1 className='text-2xl'>Menu</h1>
      <ul className='relative'>
        {getdata.map( item => (
          <li key={item.id} className='flex'>
            <div className="size-[200px] sm:size-[300px] md:size-[400px] lg:size-[500px] ">
              <img src={item.image} alt={item.title} className='w-full h-full object-contain border-2'/>
            </div>
            <div className="grid grid-rows-3 w-full h-fit m-auto text-[12px] md:text-[20px]">
              <h1>{item.title}</h1>
              <h2>{item.price} $</h2>
              {/* <h2>{item.rating}</h2> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
