"use client";
import Image from "next/image";
import React, { useState, useContext, useMemo} from "react";
import { GlobalContext } from "../Context/store";
import Form from "./Forma";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useRouter } from "next/navigation";
import { EasyZoomOnMove,EasyZoomOnHover } from "easy-magnify";
import { CldImage } from "next-cloudinary";
import { paintings } from "src/paintings";


const Modal = ({ isVisible, setIsVisible, src, onClose, isDesktop }) => {


  const id = useMemo(() => {
    const match = src.match(/^(\d+)_/);
    if (match) {
      return parseInt(match[1], 10) - 1;
    }
  
    // If src is just a number string like "21"
    const fallback = parseInt(src, 10);
    return !isNaN(fallback) ? fallback - 1 : 1;
  }, [isVisible, src]);



  const [showForm, setShowForm] = useState(false);
  const { cart, setCart, cartStatus, setCartStatus,setId,setSrc } = useContext(GlobalContext);

  const router = useRouter();

  if (!isVisible) {
    return null;
  }



  const handleClick = (e) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };

  const closeForm = () => {
    setShowForm(false);
  };
  // console.log(src)
  //cart logic

  const add = async (num) => {
    setCart([...cart, num]);
  };

  const remove = async (num) => {
    setCart(cart.filter((a) => a !== num));
  };

  // console.log(cart)
  if (isDesktop) {
    return (
      <>
        <div
          id="wrapper"
          className="z-40 fixed inset-0 flex flex-col bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
          onClick={handleClick}
        >
          <div className="flex flex-col rounded-sm bg-slate-50 ">
            <button
              className=" text-xl place-self-end mr-8"
              onClick={() => {
                onClose();
              }}
            >
              x
            </button>
            <div className="flex  flex-col md:p-4   md:flex-row">
              <div id="modal-image" className="bg-white flex flex-col items-center my-auto mx-2 p-2 rounded">
                <Image
                  alt="painting"
                  src={src}
                  height="400"
                  width="400"
                  loading="eager"
                  priority={true}
                  className="hover:cursor-grabbing h-fit w-full object-cover object-left-top gap-10   "
                  
                quality={100}
                />
                <div className="">
                <span className="text-xl italic">{paintings[id].title}</span>
                </div>
                {paintings[id].Sold?<CldImage
                 alt="sold"
                 src={"/sold.jpg"}
                 width={100}
                 height={100}
                 loading="eager"
                 className="self-center my-auto"
                 
                quality={100}
                />:null
              }
              </div>
              <div className="flex flex-col">
                <Tabs defaultValue="Details" className="w-[400px]">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="Description">Description</TabsTrigger>
                    <TabsTrigger value="Details">Details</TabsTrigger>
                  </TabsList>
                  <TabsContent value="Details">
                    <Card>
                      <CardContent className="space-y-2">
                        <div className="space-y-1 m-1 my-2">
                          <Label>Size:</Label>
                          <span className="ml-2">{paintings[id].size}</span>
                        </div>
                        <div className="space-y-1 m-1">
                          <Label>Price:</Label>{" "}
                          <span className="ml-2">₹{paintings[id].price} + Shipping Charges</span>
                        </div>
                        <div className="space-y-1 m-1">
                          <Label>Medium:</Label>
                          <span className="ml-2">{paintings[id].Medium}</span>
                        </div>
                        <div className="space-y-1 m-1">
                          <Label>Surface:</Label>
                          <span className="ml-2">{paintings[id].Surface}</span>
                        </div>

                        <div className="space-y-1 m-1">
                          <Label>To be delivered as:</Label>
                          <span className="ml-2">{paintings[id].ToBeDeliveredAs}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="Description">
                    <Card>
                      <CardContent className="space-y-2">
                        <div className="space-y-1 m-1">
                          <Label>{paintings[id].description}</Label>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
                <div className="flex flex-col">
                  <Button
                    onClick={() => {
                      setShowForm(true);
                    }}
                    className="m-2 p-1"
                  >
                    Enquire
                  </Button>
                  {!cart.includes(src) ? (
                    <Button
                      onClick={() => {
                        add(src);
                        // console.log(cart);
                      }}
                      className="m-1 p-4"
                    >
                      Add To Cart
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        remove(src);
                        // console.log(cart);
                      }}
                      className="m-1 p-4"
                    >
                      Remove From Cart
                    </Button>
                  )}

                  <Button
                    onClick={() => {
                      setShowForm(true);
                    }}
                    className="m-1 p-4"
                  >
                    Make An Offer to the Artist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Form
          id={id}
          src={src}
          price={paintings[id].price}
          size={paintings[id].size}
          showForm={showForm}
          setShowForm={setShowForm}
          closeForm={closeForm}
        />
      </>
    );
  }
  return (
    <>
      <Form
        id={id}
        src={src}
        price={paintings[id].price}
        size={paintings[id].size}
        showForm={showForm}
        setShowForm={setShowForm}
        closeForm={closeForm}
      />
      <Drawer open={isVisible} onOpenChange={setIsVisible}>
        <Tabs defaultValue="Details">
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="Description">Description</TabsTrigger>
                  <TabsTrigger value="Details">Details</TabsTrigger>
                </TabsList>
              </DrawerTitle>
              <DrawerDescription>
                <TabsContent value="Details">
                  <Card>
                    <CardContent className="pt-0 pb-2 space-y-1 text-lg">
                      <div
                        id="modal-image"
                        className=" relative bg-white m-2 rounded flex items-center justify-center"
                      >
                        <EasyZoomOnHover mainImage={{
                          src: `https://res.cloudinary.com/dtwh38ufn/image/upload/v1746877408/${src}.jpg`,
                          alt: "My Product",
                          width: 320,
                          height: 250

                      }}
                          zoomImage={{
                              src: `https://res.cloudinary.com/dtwh38ufn/image/upload/v1746877408/${src}.jpg`,
                              alt: "My Product",
                          }}
                          zoomContainerWidth={150}
                          zoomContainerHeight={150}
                          zoomLensScale={1}

                          distance={-150}

                      />
                      <span className="absolute bottom-2 right-0 text-white bg-black/20 text-xs p-1 rounded px-3">Hover to zoom</span>

                      </div>
                      <div className="mx-1 my-auto">
                        <div className="mx-auto">
                        <span className="text-xl italic">{paintings[id].title}</span>
                        </div>
                      </div>
                      <div className="space-y-1 m-1 my-2">
                        <Label className="text-lg">Size:</Label>
                        <span className="ml-1 text-xl">{paintings[id].size}</span>
                      </div>
                      <div className="space-y-1 m-1">
                        <Label className="text-lg">Price:</Label>
                        <span className="ml-1 text-xl">₹{paintings[id].price}</span> + Shipping Charges
                      </div>
                      <div className="space-y-1 m-1">
                        <Label className="text-lg">Medium:</Label>
                        <span className="ml-1 text-lg">{paintings[id].Medium}</span>
                      </div>
                      <div className="space-y-1 m-1">
                        <Label className="text-lg">Surface:</Label>
                        <span className="ml-1 text-lg">{paintings[id].Surface}</span>
                      </div>

                      <div className="space-y-0.5 m-1">
                        <Label className="text-lg">To be delivered as:</Label>
                        <span className="ml-1 text-lg">{paintings[id].ToBeDeliveredAs}</span>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="Description">
                  <Card>
                    <CardContent className="pt-0 space-y-2">
                      <Label className="m-1">
                        <span className="text-[15px]">{paintings[id].description}</span>
                      </Label>
                    </CardContent>
                  </Card>
                </TabsContent>
              </DrawerDescription>
            </DrawerHeader>

            <DrawerFooter className="pt-0 m-0">
              {!paintings[id].Sold ?
              <>
                <Button  onClick={()=>{
                              setId(id);
                              setSrc(src);
                                router.push("Gallery/Enquire")
                            }} className=" p-1">Enquire</Button>

              {!cart.includes(src) ? (
                <Button
                  onClick={() => {
                    add(src);
                    // console.log(cart);
                  }}
                  className=" p-1"
                >
                  Add To Cart
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    remove(src);
                    // console.log(cart);
                  }}
                  className=" p-1"
                >
                  Remove From Cart
                </Button>
              )}
              </>
              : <div className="flex flex-col items-center">
                  <Image
                  alt="sold"
                  src={"/sold.jpg"}
                  width={90}
                  height={90}
                  loading="eager"
                  className="self-center my-auto"

                quality={100}
                />
                <h1 className="p-2 text-rose-600">Sold Paintings can be repainted</h1>
                {/* <Button  onClick={()=>{
                              setId(id);
                              setSrc(src);
                                router.push("Gallery/Enquire")
                            }} className=" w-full p-1">Enquire</Button> */}
                </div>
            }
            
              
              {/* <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose> */}
              <Button onClick={()=>{
                               setId(id);
                               setSrc(src);
                               router.push("Gallery/Enquire")
                            }} className=" p-1">Make An Offer to the Artist</Button>
            </DrawerFooter>
          </DrawerContent>
        </Tabs>
      </Drawer>
    </>
  );
};

export default Modal;

