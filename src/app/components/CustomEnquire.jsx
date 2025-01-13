"use client"
import React from 'react'
import Image from 'next/image';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useRef,useState } from 'react';
import { cn } from '../utils/cn';
import emailjs from '@emailjs/browser';
import { useRouter } from 'next/navigation';
import { paintings } from './Modal';
import { Button } from './ui/button';
import { DrawerClose, DrawerTrigger } from './ui/drawer';
import { BottomGradient,LabelInputContainer } from './Enquire';
import { useToast } from './ui/use-toast';


const CustomEnquire = () =>{
    const form = useRef();
    const id = "Custom"
    // console.log('form src',src)
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const name ="Custom Enquiry";
    const router = useRouter();
    const { toast } = useToast()


    const closeForm = () => {
        router.push("/");
    }
    
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
                title: "Enquiry Successful",
                description: "We'll get in contact shortly!",
              })
            },
            (error) => {
            console.log('FAILED...', error);
            toast({
                title: "Enquiry Failed",
                description: "It's not You, It's Us </3. Please try Again",error,
              })
            },
        );
        
        closeForm();
    };
        


    return(
        <>
        <div  className='flex justify-center items-center ' >
            <div className='w-full flex flex-col'>
                
                
                <div className='bg-white p-2 rounded flex flex-col '>
                    {/* <div id='paintingRelated' className='flex'>
                        <div className='bg-white p-2 rounded'>
                            <Image
                            
                quality={100}
                                alt='painting'
                                src={src}
                                height="100"
                                width="100"
                                loading='eager'
                                priority={true}
                                className="hover:cursor-grabbing  object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                            />
                        </div>
                    
                        <div id='info' className='m-2 p-2'>
                            
                            
                            <div id='size' className='p-2 flex md:p-2 md:py-4'>
                                <div><span className='font-semibold rounded bg-zinc-300 px-2'>Size</span></div>    
                                <div className=' pl-2'>{paintings[id].size}</div>
                            </div>
                            <div id='price' className='p-2 flex md:p-2 md:py-4'>
                                <div className=' rounded bg-green-300 px-2 '>Price</div>
                                <div className='pl-2'>₹{paintings[id].price}</div>    
                            </div>
                        
                        </div>
                    </div> */}
                    
                    <form ref={form} onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 mb-4">
                    
                    <LabelInputContainer>
                        <Label htmlFor="firstName">First name</Label>
                        <Input
                        id="firstName"
                        name="firstName"
                        placeholder="Jane"
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
                        placeholder="Doe"
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
                        placeholder="JaneDoe@gmai.com"
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
                        className="your-textarea-styles"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    </LabelInputContainer>
                    <input
                        type='hidden'
                        name='id'
                        value={id}
                    />
                    <input
                        type='hidden'
                        name='name'
                        value={name}
                    />
                    <DrawerClose className='w-full' asChild>
                    <button
                    className="bg-gradient-to-br from-black dark:from-zinc-900 to-neutral-600 block w-full text-white rounded-md h-10 font-medium hover:bg-orange-700 ease-in-out duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 focus-visible:ring-offset-neutral-100 dark:focus-visible:ring-offset-neutral-800 dark:focus-visible:ring-orange-500"
                    type="submit"
                    
                    >
                    SEND &rarr;
                    <BottomGradient />
                    </button>
                    </DrawerClose>
                   
                    
                    </form>
                        <DrawerClose asChild>
                    <Button variant="outline" onClick={()=>{closeForm()}} className="w-full my-2" >Close</Button>
                        </DrawerClose>
                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-2 md:my-8 h-[1px] w-full" />
                    
                </div>
                
            </div>
            
        </div>
        </>
    )
}

export default CustomEnquire;