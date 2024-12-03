"use client";
import React, { useEffect, useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { ArrowSmallDownIcon } from "@heroicons/react/24/solid";
import BlogPostCard from "@/app/blog-post-card";
import { useSelector } from "react-redux";

export function Posts() {
  const [events, setEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState(6); 
  const token = useSelector((state: any) => state.token.value);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/events/all");
        const data = await response.json();
        const confirmedEvents = data.filter((event: any) => event.statusEvent === "CONFIRMED");
        setEvents(confirmedEvents);
        setFilteredEvents(confirmedEvents);
        console.log("DATA:", confirmedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <section className="grid min-h-screen place-items-center p-8">
      <div className="mb-8 w-full max-w-md">
        <Input
          type="text"
          label="Шукати за назвою"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Введіть назву"
        />
      </div>

      <div className="container my-auto grid grid-cols-1 gap-x-8 gap-y-16 items-start lg:grid-cols-3">
        {filteredEvents.slice(0, visibleCount).map(
          ({ id, image, category, name, shortDescription, date, organizer }) => (
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
          )
        )}
      </div>

      {visibleCount < filteredEvents.length && (
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
