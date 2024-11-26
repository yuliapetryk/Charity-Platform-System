"use client"
import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import { ArrowSmallDownIcon } from "@heroicons/react/24/solid";
import BlogPostCard from "@/app/blog-post-card";
import { useDispatch, useSelector } from "react-redux";

export function Posts() {
  const [events, setEvents] = useState<any[]>([]);
  const  token  = useSelector((state: any) => state.token.value); // Access token from Redux store
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/events/all');
        const data = await response.json();
        setEvents(data);
        console.log("DATA:", data)
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="grid min-h-screen place-items-center p-8">
      <Tabs value="trends" className="mx-auto max-w-7xl w-full mb-16 ">
        <div className="w-full flex mb-8 flex-wrap justify-between gap-6">
        <div className="flex flex-col items-center">
        <button className="w-20 h-20 rounded-full bg-blue-500 text-white flex justify-center items-center">
          <img src="/image/health.png" alt="Здоров'я" className="w-20 h-20" />
        </button>
        <span>
         <Typography variant="h6" className="mb-2">
         Здоров'я
        </Typography>
        </span>
        
      </div>

      {/* Button for Соціальна допомога */}
      <div className="flex flex-col items-center">
        <button className="w-20 h-20 rounded-full bg-yellow-400 text-white flex justify-center items-center">
          <img src="/image/heart.png" alt="Соціальна допомога" className="w-20 h-20" />
        </button>
        <span>
         <Typography variant="h6" className="mb-2">
         Соціальна допомога
        </Typography>
        </span>
        
      </div>

      {/* Button for Екологія та тварини */}
      <div className="flex flex-col items-center">
        <button className="w-20 h-20 rounded-full bg-green-500 text-white flex justify-center items-center">
          <img src="/image/ecology.png" alt="Екологія та тварини" className="w-20 h-20" />
        </button>
        <span>
         <Typography variant="h6" className="mb-2">
         Екологія та тварини
        </Typography>
        </span>
        
      </div>

      {/* Button for Освіта та наука */}
      <div className="flex flex-col items-center">
        <button className="w-20 h-20 rounded-full bg-orange-500 text-white flex justify-center items-center">
          <img src="/image/world.png" alt="Освіта та наука" className="w-20 h-20" />
        </button>
        <span>
         <Typography variant="h6" className="mb-2">
         Освіта та наука
        </Typography>
        </span>
      </div>

      {/* Button for Культура і спорт */}
      <div className="flex flex-col items-center">
        <button className="w-20 h-20 rounded-full bg-pink-500 text-white flex justify-center items-center">
          <img src="/image/art.png" alt="Культура і спорт" className="w-20 h-20" />
        </button>
        <span>
         <Typography variant="h6" className="mb-2">
          Культура і спорт
        </Typography>
        </span>
      </div>

      {/* Button for Усі категорії */}
      <div className="flex flex-col items-center">
        <button className="w-20 h-20 rounded-full bg-purple-600 text-white flex justify-center items-center">
          <img src="/image/others.png" alt="Усі категорії" className="w-20 h-20" />
        </button>
        <span>
          <Typography variant="h6" className="mb-2 ">
            Усі категорії
          </Typography>
        </span>
      </div>
      
        </div>
      </Tabs>
      <Typography variant="h1" className="mb-2">
        Проєкти
      </Typography>
      <Typography
        variant="lead"
        color="gray"
        className="max-w-3xl mb-20 text-center text-gray-500"
      >
        Проєкт OPEN HEARTS - це більше, ніж збір благодійної допомоги, це об'єднання заради спільної мети.
      </Typography>
      <Typography variant="h6" className="mb-2 mb-10">
        Популярні проєкти
      </Typography>
      <div className="container my-auto grid grid-cols-1 gap-x-8 gap-y-16 items-start lg:grid-cols-3">
        {events.map(({ id, image, category, name, shortDescription, date, organizer }) => (
          <BlogPostCard
          
            id={id}
            key={name}
            img={`data:image/jpeg;base64,${image}`} // Pass the base64 string to BlogPostCard
            tag={category}
            title={name}
            desc={shortDescription}
            date={date}
            author={organizer.firstName +" " + organizer.lastName}
          />
        ))}
      </div>
      <Button
        variant="text"
        size="lg"
        color="gray"
        className="flex items-center gap-2 mt-24"
      >
        <ArrowSmallDownIcon className="h-5 w-5 font-bold text-gray-900" />
        VIEW MORE
      </Button>
    </section>
  );
}

export default Posts;
