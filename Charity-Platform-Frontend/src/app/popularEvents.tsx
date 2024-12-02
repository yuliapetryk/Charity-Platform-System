"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
} from "@material-tailwind/react";
import { ArrowSmallDownIcon } from "@heroicons/react/24/solid";
import BlogPostCard from "@/app/blog-post-card";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export function PostsPopular() {
  const [events, setEvents] = useState<any[]>([]); 
  const [visibleEvents, setVisibleEvents] = useState<any[]>([]); 
  const [itemsToShow, setItemsToShow] = useState(3); 
  const token = useSelector((state: any) => state.token.value); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/events/sorted-by-popularity");
        const data = await response.json();
        const confirmedEvents = data.filter((event: any) => event.statusEvent === "CONFIRMED");
        
        setEvents(confirmedEvents); 
        setVisibleEvents(confirmedEvents.slice(0, itemsToShow));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [itemsToShow]); 

  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/allEventsCategory?category=${encodeURIComponent(category)}`);
    
  };

  const handleViewMore = () => {
    setItemsToShow((prev) => prev + 6); 
  };

  return (
    <section className="grid min-h-screen place-items-center p-8">
      
      <Typography variant="h6" className="mb-10">
            Популярні проєкти
      </Typography>

      <div className="container my-auto grid grid-cols-1 gap-x-8 gap-y-16 items-start lg:grid-cols-3">
        {visibleEvents.map(({ id, image, category, name, shortDescription, date, organizer }) => (
          <BlogPostCard
            id={id}
            key={name}
            img={`data:image/jpeg;base64,${image}`} 
            tag={category}
            title={name}
            desc={shortDescription}
            date={date}
            author={organizer.firstName + " " + organizer.lastName}
          />
        ))}
      </div>

      {visibleEvents.length < events.length && (
        <Button
          variant="text"
          size="lg"
          color="gray"
          className="flex items-center gap-2 mt-24"
          onClick={handleViewMore}>
          <ArrowSmallDownIcon className="h-5 w-5 font-bold text-gray-900" />
          Більше
        </Button>
      )}
    </section>
  );
}

export default PostsPopular;
