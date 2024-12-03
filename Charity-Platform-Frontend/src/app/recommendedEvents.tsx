"use client";
import React, { useEffect, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { ArrowSmallDownIcon } from "@heroicons/react/24/solid";
import BlogPostCard from "@/app/blog-post-card";
import { useSelector } from "react-redux";

export function RecommendedPosts() {
  const [events, setEvents] = useState<any[]>([]);
  const [sortedEvents, setSortedEvents] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false); // State to track if all events should be shown
  const token = useSelector((state: any) => state.token.value);

  useEffect(() => {
    const fetchFavoriteEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/events/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("All Events:", data);

        if (!response.ok) throw new Error("Failed to fetch all events");

        const favoriteResponse = await fetch("http://localhost:8080/api/favorite", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const favorites = await favoriteResponse.json();

        console.log("Favorite Event IDs:", favorites);

        const categoriesResponse = await fetch(
          "http://localhost:8080/api/favorite/favorite-categories",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const categories = await categoriesResponse.json();

        console.log("Favorite Categories:", categories);

        if (!categoriesResponse.ok)
          throw new Error("Failed to fetch favorite categories");

        const favoriteEvents = data.filter((event: any) =>
          favorites.includes(event.id)
        );

        console.log("Filtered Favorite Events:", favoriteEvents);

        const sorted = favoriteEvents.sort((a: any, b: any) => {
          const categoryOrderA = Object.keys(categories).indexOf(a.category);
          const categoryOrderB = Object.keys(categories).indexOf(b.category);
          return categoryOrderA - categoryOrderB;
        });

        setEvents(favoriteEvents);
        setSortedEvents(sorted);

        console.log("Sorted Favorite Events:", sorted);
      } catch (error) {
        console.error("Error fetching favorite events:", error);
      }
    };

    if (token) {
      fetchFavoriteEvents();
    }
  }, [token]);

  const visibleEvents = showAll ? sortedEvents : sortedEvents.slice(0, 3);

  return (
    <section className="grid min-h-screen place-items-center p-8">
      {sortedEvents.length > 0 ? (
        <div className="container my-auto grid gap-y-16 items-start">
          {/* Centered Title */}
          <div className="flex flex-col items-center">
            <Typography variant="h6" className="mb-10 text-center">
              Ваші персональні рекомендації
            </Typography>
          </div>

          {/* Event Cards */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
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

          {/* Show More Button */}
          {!showAll && sortedEvents.length > 3 && (
            <div className="flex justify-center mt-24">
              <Button
                variant="text"
                size="lg"
                color="gray"
                className="flex items-center gap-2"
                onClick={() => setShowAll(true)}
              >
                <ArrowSmallDownIcon className="h-5 w-5 font-bold text-gray-900" />
                Більше
              </Button>
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}

export default RecommendedPosts;
