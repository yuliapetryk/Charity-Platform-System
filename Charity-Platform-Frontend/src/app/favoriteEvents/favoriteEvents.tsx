"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
} from "@material-tailwind/react";
import { ArrowSmallDownIcon } from "@heroicons/react/24/solid";
import BlogPostCard from "@/app/blog-post-card";
import { useDispatch, useSelector } from "react-redux";

export function Posts() {
  const [events, setEvents] = useState<any[]>([]);
  const token = useSelector((state: any) => state.token.value);

  useEffect(() => {
    const fetchFavoriteEvents = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/events/all', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("Favorite Events:", data);

        if (!response.ok) throw new Error('Failed to fetch favorite events');

        const favoriteResponse = await fetch(`http://localhost:8080/api/favorite`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const favorites = await favoriteResponse.json();

        const favoriteEvents = data.filter((event: any) =>
          favorites.includes(event.id)
        );

        setEvents(favoriteEvents);
        console.log("All Events:", data);
        console.log("Favorite Events Id:", favorites);
        console.log("Favorite Events:", favoriteEvents);

      } catch (error) {
        console.error('Error fetching favorite events:', error);
      }
    };

    if (token) {
      fetchFavoriteEvents();
    }
  }, [token]);

  return (
    <section className="grid min-h-screen place-items-center p-8">
      <div className="container my-auto grid grid-cols-1 gap-x-8 gap-y-16 items-start lg:grid-cols-3">
        {events.length > 0 ? (
          events.map(({ id, image, category, name, shortDescription, date, organizer }) => (
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
          ))
        ) : (
          <Typography
            className="container my-full grid mt-0 justify-center items-top h-screen text-center"
          >
            У вас немає улюблених оголошень.
          </Typography>
        )}
      </div>
    </section>
  );
}

export default Posts;
