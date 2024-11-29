"use client";

import Image from "next/image";
import  "@material-tailwind/react";
import { Input, Typography, Button } from "@material-tailwind/react";


function Hero() {
  return (
    <header className=" bg-white">
<div className="w-full container mx-auto mb-0 flex flex-col lg:flex-row items-center lg:justify-between text-center lg:text-left">
  {/* Image Section */}
  <div className="lg:w-1/2 flex justify-center lg:justify-start ml-10 mb-0">
    <Image
      width={600}
      height={600} // Set both width and height to the same value for a square image
      src="/image/logos/logo.jpg"
      alt="credit cards"
      className="rounded-lg object-cover" // Ensures the image covers the square container and looks clean
    />
  </div>
  
  {/* Text Section */}
  <div className="lg:w-1/2">
    <Typography
      color="blue-gray"
      className="flex justify-center w-full text-[24px] lg:text-[36px] font-extrabold leading-[30px] lg:leading-[40px] lg:max-w-2xl text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700"
    >
      Благодійна платформа
    </Typography>
    <Typography
      color="blue-gray"
      className="flex justify-center w-full text-[24px] lg:text-[38px] mt-6 font-extrabold leading-[30px] lg:leading-[40px] lg:max-w-2xl text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700"
    >
     "OPEN HEARTS"
    </Typography>
    <Typography
      variant="paragraph"
      className=" flex justify-center mt-6 mb-4 w-full px-8 !text-gray-700 lg:w-full xl:px-0 text-sm lg:text-base font-medium text-gray-600"
    >
      Від Української Біржі Благодійності
    </Typography>
  </div>
</div>


  </header>
  );
}
export default Hero;
