"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Tabs,
} from "@material-tailwind/react";
import { ArrowSmallDownIcon } from "@heroicons/react/24/solid";
import BlogPostCard from "@/app/blog-post-card";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export function Posts() {
  const [events, setEvents] = useState<any[]>([]); // All events fetched from API
  const [visibleEvents, setVisibleEvents] = useState<any[]>([]); // Events currently visible
  const [itemsToShow, setItemsToShow] = useState(3); // Number of events to show initially
  const token = useSelector((state: any) => state.token.value); // Access token from Redux store

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/events/sorted-by-date");
        const data = await response.json();
        const confirmedEvents = data.filter((event: any) => event.statusEvent === "CONFIRMED");
        
        setEvents(confirmedEvents); // Store only confirmed events
        setVisibleEvents(confirmedEvents.slice(0, itemsToShow));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [itemsToShow]); // Re-fetch visible events when `itemsToShow` changes

  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/allEventsCategory?category=${encodeURIComponent(category)}`);
    
  };

  const handleViewMore = () => {
    setItemsToShow((prev) => prev + 6); // Increase the number of visible events by 6
  };

  return (
    <section className="grid min-h-screen place-items-center p-8">
      <Tabs value="trends" className="mx-auto max-w-7xl w-full mb-16 ">
        <div className="w-full flex mb-8 flex-wrap justify-between gap-6">
          {/* Category buttons */}
          <div className="flex flex-col items-center">
            <button
              className="w-20 h-20 rounded-full bg-blue-500 text-white flex justify-center items-center"
              onClick={() => handleCategoryClick("health")}
            >
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
        <button className="w-20 h-20 rounded-full bg-yellow-400 text-white flex justify-center items-center"
        onClick={() => handleCategoryClick("social")}
        >
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
        <button className="w-20 h-20 rounded-full bg-green-500 text-white flex justify-center items-center"
          onClick={() => handleCategoryClick("ecology")}
          >
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
        <button className="w-20 h-20 rounded-full bg-orange-500 text-white flex justify-center items-center"
          onClick={() => handleCategoryClick("education")}
          >
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
        <button className="w-20 h-20 rounded-full bg-pink-500 text-white flex justify-center items-center"
          onClick={() => handleCategoryClick("sport")}
          >
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
        <button className="w-20 h-20 rounded-full bg-purple-600 text-white flex justify-center items-center"
          onClick={() =>  router.push(`/allEvents`)}>
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
      <Typography variant="h6" className="mb-10">
        Нові проєкти
      </Typography>

      {/* Display the visible events */}
      <div className="container my-auto grid grid-cols-1 gap-x-8 gap-y-16 items-start lg:grid-cols-3">
        {visibleEvents.map(({ id, image, category, name, shortDescription, date, organizer }) => (
          <BlogPostCard
            id={id}
            key={name}
            img={`data:image/jpeg;base64,${image}`} // Pass the base64 string to BlogPostCard
            tag={category}
            title={name}
            desc={shortDescription}
            date={date}
            author={organizer.firstName + " " + organizer.lastName}
          />
        ))}
      </div>

      {/* VIEW MORE Button */}
      {visibleEvents.length < events.length && (
        <Button
          variant="text"
          size="lg"
          color="gray"
          className="flex items-center gap-2 mt-24"
          onClick={handleViewMore}
        >
          <ArrowSmallDownIcon className="h-5 w-5 font-bold text-gray-900" />
          VIEW MORE
        </Button>
      )}
    </section>
  );
}

export default Posts;