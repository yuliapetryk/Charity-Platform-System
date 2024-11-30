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

export function PostsPopular() {
  const [events, setEvents] = useState<any[]>([]); // All events fetched from API
  const [visibleEvents, setVisibleEvents] = useState<any[]>([]); // Events currently visible
  const [itemsToShow, setItemsToShow] = useState(3); // Number of events to show initially
  const token = useSelector((state: any) => state.token.value); // Access token from Redux store

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/events/sorted-by-popularity");
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
      
      <Typography variant="h6" className="mb-10">
            Популярні проєкти
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

export default PostsPopular;
