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
            return value && user.title.toLocaleLowerCase().includes(value.toLocaleLowerCase());
        });
        setResults(res)
    }

    const handleChange = (value) =>{
        setInput(value);
        getData(value)
    }

    return(
        <div className='flex flex-col max-h-24'>
            <div className='flex'><FaSearch className='absolute ml-3 mt-2.5 pr-1 md:mr-2' /><Input className='bg-amber-100 w-28 pl-8 md:w-64' value={input} onChange={(e)=>handleChange(e.target.value)} placeholder='Enter Search Here' />
            {input?<MdCancel onClick={()=>handleChange("")} className='absolute w-3 mt-2.5 md:ml-60 ml-24 hover:cursor-pointer' />:null}
            </div>
            <div id='results' className='mt-2 z-40 bg-amber-100 rounded-lg'>
                {results.map((paint)=>{
                    return(
                        <div key={paint.id} onClick={()=>{
                            setSrc("/"+paint.id+".jpg");
                            setShowModal(true);
                        }} className='flex hover:bg-amber-300 hover:cursor-pointer hover:rounded-lg m-2 p-2'>
                            <div>
                            <Image 
                            alt='painting'
                            src={"/"+paint.id+".jpg"}
                            height="50"
                            width="50"
                            loading='eager'
                            priority={true}
                            className="hover:cursor-grabbing rounded-lg m-2 p-2"
                            quality={100}
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




