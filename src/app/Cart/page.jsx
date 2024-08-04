"use client"

import React from 'react'
import { paintings } from '@/components/Modal';
import { MdCancel } from "react-icons/md";
import {GlobalContext} from '../Context/store'
import { useContext } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRef,useState } from 'react';
import { cn } from '@/utils/cn';
import emailjs from '@emailjs/browser';
import { Separator } from '@/components/ui/Separator';
import { useToast } from "@/components/ui/use-toast"







const Cart = () => {



    const {cart,setCart} = useContext(GlobalContext);
    const form = useRef();
    const { toast } = useToast()
    console.log(cart.length)
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [name,setName] = useState([]);
    var list = [];
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        message === "" ||
        phoneNumber === ""
        ) {
        alert("Please fill all the fields");
        }
        // checking if the email is valid
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address");
        return;
        }
        // checking if the phone number is valid
        if (!/^[0-9]{10}$/.test(phoneNumber)) {
        alert("Please enter a valid phone number");
        return;
        }
        
        emailjs
        .sendForm('service_2uaoxt5', 'template_iguyl89', form.current, {
            publicKey: 'WA_Wbe3R2R6QleO9U',
        })
        .then(
            () => {
            console.log('SUCCESS!');
            toast({
              title: "Enquiry Successful!",
              description: "We'll get in touch with you Soon!",
            })
            setCart([]);
            },
            (error) => {
            console.log('FAILED...', error);
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request. Please Try Again",
            })
            },
        );
       
    };
    


    const handleRemove = (item) =>{
      const index = cart.indexOf(item);
      if (index !== -1) {
      const newCart = [...cart]; // Create a copy of the cart array
      newCart.splice(index, 1); // Remove the item at the specified index
      setCart(newCart);
    }
    }
    
  return (
    <div className='flex md:justify-center md:items-center'>
      <div className='flex flex-col'>
          <div className='mt-8 underline-offset-8	  p-4 text-4xl'>
          Shopping Cart
            
        </div>
        <Separator className="mb-10 bg-amber-800" />
        <div className='flex'>

        {
          cart.length ==0?<div className='text-3xl mx-8 px-4'>No items</div> :<div className='flex flex-col md:flex-row'><div className='w-fit md:w-min  ml-2 mr-8 flex  flex-col'>{
            cart.map((item)=>{
              
              const match = item.match(/\/(\d+)\.jpg/);
              const number = parseInt(match[1], 10)-1;
              list.push(paintings[number].title)
              return(
                <div key={item} className='flex bg-amber-200 rounded-lg m-2 w-full mx-2 md:my-2 md:mx-8 '>
                  <div className='flex mr-2'>
                      <Image
                    alt='painting'
                    src={item}
                    height="100"
                    width="100"
                    loading='eager'
                    priority={true}
                    className="hover:cursor-grabbing object-cover object-left-top rounded-lg gap-10 ml-1 my-2 p-2"
                  />
                  
                  <div className='flex flex-col m-2 p-2'>
                    <div className='text-xl italic'>{paintings[number].title}</div>
                    <div className=''>₹{paintings[number].price} </div>
                  </div>
                  
                  
                  </div>
                 <div className='grow flex flex-row-reverse'>
                    <div  className='grow flex flex-row-reverse'>
                      <button className='self-start p-2 text-xl' onClick={()=>{handleRemove(item);remove(paintings[number].title)}} > <MdCancel/>  </button>
                    </div>
                 </div>
              
              
              </div>
              )
            }
            ) 
          }
          </div> 
          <div id='forma' className=' mt-4 md:mx-8 w-full md:w-max flex justify-center items-center '>
              <div className='w-full flex flex-col justify-center items-center'>
                    
                    <div className='bg-amber-200 w-full ml-20 mr-12 md:mx-12 p-4 rounded flex flex-col '>
                        
                        
                        <form ref={form} onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 mb-4">
                        
                        <LabelInputContainer>
                            <Label htmlFor="firstName">First name</Label>
                            <Input
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstname(e.target.value)}
                            />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="lastName">Last name</Label>
                            <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Last Name"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastname(e.target.value)}
                            />
                        </LabelInputContainer>
                        </div>
                        <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            name="Email"
                            placeholder="youremail@gmail.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-4">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="10 Digit Phone Number"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setphoneNumber(e.target.value)}
                        />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-8">
                        <Label htmlFor="message">Send Us a Message</Label>
                        <Input
                            id="message"
                            name="Message"
                            placeholder="Your Wall-Size, Colour and any other Queries"
                            className="your-textarea-styles "
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        </LabelInputContainer>
                        <input type="hidden"
                          name='id'
                          value={cart}
                        />
                         <input type="hidden"
                          id='name'
                          name='name'
                          value={list}
                        />
                        <button
                        className="bg-gradient-to-br from-black dark:from-amber-900 to-neutral-600 block w-full text-white rounded-md h-10 font-medium hover:bg-orange-700 ease-in-out duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 focus-visible:ring-offset-neutral-100 dark:focus-visible:ring-offset-neutral-800 dark:focus-visible:ring-orange-500"
                        type="submit"
                        
                        >
                        SEND ENQUIRY &rarr;
                        <BottomGradient />
                        </button>
                        
                        </form>
                        <div className="bg-gradient-to-r from-transparent via-amber-400 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                        
                    </div>
                    
                </div>
          </div>

          
          </div>
        }


          
        </div>
        
      
          
        
        
        
        </div>
        
      </div>
   
  
  )
}

export default Cart

const BottomGradient = () => {
  return (
    <>
      <span className="opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="opacity-0 blur-sm absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-4 w-full md:mx-2", className)}>
      {children}
    </div>
  );
};

