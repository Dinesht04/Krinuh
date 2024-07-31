"use client"
import React, { useState } from 'react'
import {  FaSearch } from 'react-icons/fa';
import { MdCancel } from "react-icons/md";
import { Input } from './ui/SimpleInput';
import { paintings } from './Modal';
import Image from 'next/image';
import Modal from './Modal';

const Search = () =>{
    const [input,setInput] = useState("");
    const [results,setResults] = useState([]);
    const [showModal,setShowModal] = useState(false);
    const [src,setSrc] = useState('');

    const getData=(value)=>{
        const res = paintings.filter((user)=>{
            return value && user.description.toLocaleLowerCase().includes(value.toLocaleLowerCase());
        });
        setResults(res)
    }

    const handleChange = (value) =>{
        setInput(value);
        getData(value)
    }

    return(
        <div className='flex flex-col max-h-24'>
            <div className='flex'><FaSearch className='mt-2 pr-1 md:mr-2' /><Input className='w-28 md:w-64' value={input} onChange={(e)=>handleChange(e.target.value)} placeholder='Enter Search Here' /><MdCancel onClick={()=>handleChange("")} className='md:text-xl mt-2 pl-1 md:ml-2 hover:cursor-pointer' />
            </div>
            <div id='results' className='z-40 bg-zinc-100'>
                {results.map((paint)=>{
                    return(
                        <div key={paint.id} onClick={()=>{
                            setSrc("/"+paint.id+".jpg");
                            setShowModal(true);
                        }} className='flex hover:bg-zinc-200 hover:cursor-pointer hover:rounded-lg m-2 p-2'>
                            <div>
                            <Image 
                            alt='painting'
                            src={"/"+paint.id+".jpg"}
                            height="50"
                            width="50"
                            loading='eager'
                            priority={true}
                            className="hover:cursor-grabbing rounded-lg m-2 p-2"
                            />
                            </div>
                            
                            <div className=' m-2 p-2'>
                                {paint.title}
                            </div>
                        </div>
                    )
                })}
            </div>
            <Modal isVisible={showModal} setIsVisible={setShowModal} src={src} onClose={()=>setShowModal(false)}/>
        </div>
    )
}

export default Search;




