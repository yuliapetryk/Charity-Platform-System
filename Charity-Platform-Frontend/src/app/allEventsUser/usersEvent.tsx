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
        const response = await fetch('http://localhost:8080/api/events/all/user', {
          method: "GET",
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in Authorization header
       },
        });
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
        Більше
      </Button>
    </section>
  );
}

export default Posts;
