'use client';

import React, { useRef, useState, useMemo } from 'react';
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { cn } from '../utils/cn';
import { paintings } from 'src/paintings';

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidPhone = (phone) =>
  /^[0-9]{10}$/.test(phone);

const LabelInputContainer = ({ children, className = '' }) => (
  <div className={cn("flex flex-col space-y-4 w-full md:mx-2", className)}>
    {children}
  </div>
);

const BottomGradient = () => (
  <>
    <span className="opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="opacity-0 blur-sm absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const Form = ({ setShowForm, showForm, id, src, size, price, closeForm }) => {
  const formRef = useRef();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const paintingName = useMemo(() => paintings?.[id]?.title || '', [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !message || !phoneNumber) {
      alert("Please fill all the fields");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!isValidPhone(phoneNumber)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    emailjs.sendForm(
      'service_2uaoxt5',
      'template_iguyl89',
      formRef.current,
      { publicKey: 'WA_Wbe3R2R6QleO9U' }
    ).then(
      () => console.log('Email sent successfully!'),
      (error) => console.error('Email sending failed:', error)
    );

    setShowForm(false);
  };

  if (!showForm) return null;

  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-fit flex flex-col">
        <button className="text-white text-xl place-self-end" onClick={closeForm}>×</button>
        <div className="bg-white p-4 rounded flex flex-col">
          <div className="flex">
            <div className="p-2">
              <CldImage
                alt="painting"
                src={src}
                height="100"
                width="100"
                loading="eager"
                quality={100}
                priority
                className="object-cover object-left-top rounded-lg"
              />
            </div>
            <div className="m-2 p-2">
              <div className="p-2 flex">
                <div className="font-semibold bg-zinc-300 px-2 rounded">Size</div>
                <div className="pl-2">{size}</div>
              </div>
              <div className="p-2 flex">
                <div className="bg-green-300 px-2 rounded">Price</div>
                <div className="pl-2">₹{price}</div>
              </div>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <LabelInputContainer>
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Jane"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                  onChange={(e) => setLastName(e.target.value)}
                />
              </LabelInputContainer>
            </div>

            <LabelInputContainer>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="Email"
                placeholder="jane@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="10-digit number"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="message">Message</Label>
              <Input
                id="message"
                name="Message"
                placeholder="Wall size, color preference, questions..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </LabelInputContainer>

            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="name" value={paintingName} />

            <button
              type="submit"
              className="bg-gradient-to-br from-black to-neutral-600 text-white w-full h-10 rounded-md font-medium hover:bg-orange-700 transition ease-in-out duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500"
            >
              SEND &rarr;
              <BottomGradient />
            </button>
          </form>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />
        </div>
      </div>
    </div>
  );
};

export default Form;
