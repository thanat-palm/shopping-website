"use client";
import React from 'react';
import { IoSearchCircleOutline } from "react-icons/io5";
import { useState , useEffect } from 'react';


// interface Ratings {
//   count: string;
//   rate: string;
// }

interface Shops {
  description: string;
  id: string;
  image: string;
  price: number;
  category: string;
  title: string;
  // rating: Ratings;
}

interface ShopWithQuantity extends Shops {
  quantity: number;
}
  

export default function SearchBar() {

  const [getdata , setGetdata] = useState<Shops[]>([]);
  const [searching, setSearching] = useState<string>('');
  const [filteredUsers, setFilteredData] = useState<Shops[]>([]);

  //Trigger
  const [isOpen , setIsOpen] = useState<boolean>(false);

  //bucket
  const [bucket , setBucket] = useState<number>(0);
  const [totalItem , setTotalItem] = useState<ShopWithQuantity[]>([]);


  //get data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data: Shops[] = await res.json();
        setGetdata(data);
        setFilteredData(data);
        
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }
    fetchData();
  },[]);


  //filter data
  useEffect(() => {
    // กรองข้อมูลตาม searchQuery
    const result = getdata.filter(data => 
        data.title.toLowerCase().includes(searching.toLowerCase())
    );
    setFilteredData(result);
  }, [searching, getdata]);


  // add item to bucket

    const addToBucket = (id:string) => {
      const bucketSelected = (getdata.find(e => e.id === id));
      if (bucketSelected) {
        const existingItem = totalItem.find(item => item.id === id);
        if (existingItem) {
          setTotalItem(totalItem.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ));
        } else {
          setTotalItem([...totalItem, { ...bucketSelected, quantity: 1 }]);
        }
        setBucket(bucket+1);
      }
    };

  //clear one item
  const clearThisItem = (id:string) => {
    const updatedTotalItem = totalItem.filter(item => item.id !== id);
    const removedItem = totalItem.find(item => item.id === id);
    if(removedItem) {
      setBucket(bucket - removedItem.quantity);
    }
    setTotalItem(updatedTotalItem);
  };

  //fill the input quantity
  const fillQuantity = (id:string , value: string) => {
    const newQuantity = parseInt(value , 10);

    if (value === "" || isNaN(bucket)) {
      const itemToUpdate = totalItem.find(item => item.id === id);
      if(itemToUpdate) {
        const quantityDifference = 0 - itemToUpdate.quantity;
        setTotalItem(totalItem.map(item =>
          item.id === id ? { ...item, quantity: 0} : item
        ));
        setBucket(bucket + quantityDifference);
      } 
    } else if (!isNaN(newQuantity) && newQuantity >= 0) {
      const itemToUpdate = totalItem.find(item => item.id === id);
      if(itemToUpdate) {
        const quantityDifference = newQuantity - itemToUpdate.quantity;
        setTotalItem(totalItem.map(item =>
          item.id === id ? {...item , quantity: newQuantity} : item
        ));
        setBucket(bucket + quantityDifference);
      }
    }
  };

  // updateQuantity
  const updateQuantity = (id:string , amount:number) => {
    const itemToUpdate = totalItem.find(item => item.id === id);
    if (itemToUpdate) {
      const newQuantity = itemToUpdate.quantity + amount;
      if (newQuantity> 0) {
        setTotalItem(totalItem.map(item => 
          item.id === id ? { ...item, quantity: item.quantity + amount} : item
        ));
      } else {
        clearThisItem(id);
      }
      setBucket(bucket + amount);
    }
  };

  //open bucket medal
  const toggleMedal = () => {
      setIsOpen(!isOpen);
      console.log(bucket);
  };

  return (
    <div className=" md:max-w-[640px] xl:max-w-[768px] 2xl:max-w-[1024px] mx-auto">
      
      <div className="rounded-md mx-auto p-1 mt-2 bg-white flex justify-center items-center border-2">
              <input type='search' value={searching} onChange={(text)=>setSearching(text.target.value)} className='w-[50%] text-[16px] outline-none border-2'/>
              <button type='submit'>
                <IoSearchCircleOutline className="size-5 sm:size-7 text-black" />
              </button>
              <button 
                className="bg-slate-300 px-5 ring mx-5 hover:bg-slate-500 active:bg-slate-700"
                onClick={toggleMedal}
              >
                B: <span>{bucket}</span>
              </button>
              {isOpen && ( 
                <div className="fixed inset-0 w-full h-full bg-black/20 flex items-center justify-center z-50 ">
                  <div className="bg-white w-[80vw] h-[60vh] relative rounded-sm">
                    <ul className='relative mt-12 w-full h-[calc(100%-96px)] overflow-auto'>
                      {totalItem.map(item => (
                        <li key={item.id}>
                          <div className="mx-auto max-w-[90%] sm:max-w-[80%] h-auto mb-2">
                            <div className="flex items-center justify-between border-2 w-full">
                              <div className="size-[70px] sm:size-[100px] md:size-[150px] lg:size-[200px] ">
                                <img src={item.image} alt={item.title} className='w-full h-full object-contain border-2'/>
                              </div>
                              <div className="w-[auto] sm:w-[250px] text-center">
                                <h1 className='text-[10px] sm:text-[18px]'>{item.title}</h1>
                              </div>
                              <div className="bg-slate-200 w-16 h-12 sm:w-20 sm:h-20 border-2 flex flex-col items-center justify-center gap-1 sm:gap-2">
                                <input type="text" value={item.quantity} onChange={(e) => fillQuantity(item.id, e.target.value)} className='w-5 sm:w-10 text-center text-sm sm:text-lg'/>
                                <div className='flex gap-2 text-white'>
                                  <button onClick={()=> updateQuantity(item.id,-1)} className='bg-blue-500 size-3 sm:size-5 rounded-sm text-sm sm:text-lg'>-</button>
                                  <button onClick={()=> updateQuantity(item.id, 1)} className='bg-blue-500 size-3 sm:size-5 rounded-sm text-sm sm:text-lg'>+</button>
                                </div>
                              </div>
                              <button onClick={() => clearThisItem(item.id)} className='bg-red-600 text-white size-5 sm:size-10 text-sm sm:text-lg self-start'>x</button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <button onClick={toggleMedal} className='absolute top-0 right-0 bg-red-600 size-10 text-white m-1 '>x</button>
                  </div>
                </div>
              )}
      </div>
      <div className='my-5 border-2'>
        <ul className='relative'>
          {filteredUsers.map( item => (
            <li key={item.id} className='flex m-5'>
              <div className="size-[200px] sm:size-[300px] md:size-[400px] lg:size-[500px] ">
                <img src={item.image} alt={item.title} className='w-full h-full object-contain border-2'/>
              </div>
              <div className="flex flex-col w-full justify-center ml-2 lg:ml-5 text-[12px] md:text-[20px] border-2 gap-2">
                <h1 className='border-2'>{item.title}</h1>
                <h2 className='border-2'>{item.price} $</h2>
                {/* <h2 className='border-2'>count: {item.rating.count}</h2>
                <h2 className='border-2'>rating: {item.rating.rate} ⭐</h2> */}
                <div className="w-full flex justify-center">
                  <button 
                    className='w-[100px] h-[50px] md:w-[150px] md:h-[60px] rounded-md hover:bg-blue-700 active:bg-blue-800   bg-blue-600 text-white'
                    onClick={() => addToBucket(item.id)}
                  >
                    Add to bucket
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
