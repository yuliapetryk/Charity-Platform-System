"use client";

import Image from "next/image";
import  "@material-tailwind/react";
import { Input, Typography, Button } from "@material-tailwind/react";


function Hero() {
  return (
    <header className="mt-5 bg-white p-8">
    <div className="w-w-full container mx-auto pt-6 pb-12 text-center">
      <Typography
        color="blue-gray"
        className="mx-auto w-full text-[30px] lg:text-[48px] font-bold leading-[45px] lg:leading-[60px] lg:max-w-2xl"
      >
        Благодійна платформа "OPEN HEARTS"
      </Typography>
      <Typography
        variant="lead"
        className="mx-auto mt-8 mb-4 w-full px-8 !text-gray-700 lg:w-10/12 lg:px-12 xl:w-8/12 xl:px-20"
      >
        Від Української Біржі Благодійності
      </Typography>
    </div>
    <div className="lg:container lg:mx-auto flex justify-center items-center">
  <Image
    width={800}
    height={800}
    src="/image/logos/open-hearts.png"
    alt="credit cards"
    className="h-96 rounded-lg lg:h-[21rem]"
  />
</div>

  </header>
  );
}
export default Hero;
