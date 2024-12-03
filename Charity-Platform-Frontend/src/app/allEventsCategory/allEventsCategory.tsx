"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { ArrowSmallDownIcon } from "@heroicons/react/24/solid";
import BlogPostCard from "@/app/blog-post-card";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

export function Posts() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [events, setEvents] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(6); // Tracks number of visible events
  const token = useSelector((state: any) => state.token.value);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/events/category/${encodeURIComponent(category || "")}`
        );
        const data = await response.json();
        const confirmedEvents = data.filter((event: any) => event.statusEvent === "CONFIRMED");
        setEvents(confirmedEvents);
        console.log("DATA:", confirmedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [category]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <section className="grid min-h-screen place-items-center p-8">
      {/* Event Cards */}
      <div className="container my-auto grid grid-cols-1 gap-x-8 gap-y-16 items-start lg:grid-cols-3">
        {events.slice(0, visibleCount).map(({ id, image, category, name, shortDescription, date, organizer }) => (
          <BlogPostCard
            id={id}
            key={id}
            img={`data:image/jpeg;base64,${image}`}
            tag={category}
            title={name}
            desc={shortDescription}
            date={date}
            author={organizer.firstName + " " + organizer.lastName}
          />
        ))}
      </div>

      {/* Show More Button */}
      {visibleCount < events.length && (
        <Button
          variant="text"
          size="lg"
          color="gray"
          className="flex items-center gap-2 mt-24"
          onClick={handleShowMore}
        >
          <ArrowSmallDownIcon className="h-5 w-5 font-bold text-gray-900" />
          Більше
        </Button>
      )}
    </section>
  );
}

export default Posts;
