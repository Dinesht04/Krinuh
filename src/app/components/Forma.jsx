import React from 'react'
import Image from 'next/image';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useRef,useState } from 'react';
import { cn } from '../utils/cn';
import emailjs from '@emailjs/browser';

const Form = ({setShowForm,showForm,id,src,size,price,closeForm}) =>{
    const form = useRef();
    
    // console.log('form src',src)
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");

    if(!showForm){
        return null;
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
            },
            (error) => {
            console.log('FAILED...', error);
            },
        );
        setShowForm(false);
    };
        
    


    return(
        <>
        <div  className='z-50 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center ' >
            <div className='w-fit flex flex-col'>
                <button className='text-white text-xl place-self-end' onClick={()=>{closeForm()}}>x</button>
                <div className='bg-white p-2 rounded flex flex-col '>
                    <div id='paintingRelated' className='flex'>
                        <div className='bg-white p-2 rounded'>
                            <Image
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
                                <div className=' pl-2'>{size}</div>
                            </div>
                            <div id='price' className='p-2 flex md:p-2 md:py-4'>
                                <div className=' rounded bg-green-300 px-2 '>Price</div>
                                <div className='pl-2'>₹{price}</div>    
                            </div>
                        
                        </div>
                    </div>
                    
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
                    <button
                    className="bg-gradient-to-br from-black dark:from-zinc-900 to-neutral-600 block w-full text-white rounded-md h-10 font-medium hover:bg-orange-700 ease-in-out duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 focus-visible:ring-offset-neutral-100 dark:focus-visible:ring-offset-neutral-800 dark:focus-visible:ring-orange-500"
                    type="submit"
                    
                    >
                    SEND &rarr;
                    <BottomGradient />
                    </button>
                    
                    </form>
                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-2 md:my-8 h-[1px] w-full" />
                    
                </div>
                
            </div>
            
        </div>
        </>
    )
}

export default Form;

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