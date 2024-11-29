"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Input,
} from "@material-tailwind/react";
import { ArrowSmallDownIcon } from "@heroicons/react/24/solid";
import BlogPostCard from "@/app/blog-post-card";
import { useSelector } from "react-redux";

export function Posts() {
  const [events, setEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]); // To store filtered events
  const [searchTerm, setSearchTerm] = useState<string>(""); // To store search input
  const [showNewEventsOnly, setShowNewEventsOnly] = useState<boolean>(false); // State to track filter toggle
  const token = useSelector((state: any) => state.token.value); // Access token from Redux store

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/events/all", {
          headers: { Authorization: `Bearer ${token}` }, // Include token in the request
        });
        const data = await response.json();
        setEvents(data);
        setFilteredEvents(data); // Initialize filteredEvents with all events
        console.log("DATA:", data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [token]);

  // Update filtered events whenever the search term changes
  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  // Filter events to show only NEW status
  const filterNewEvents = () => {
    setShowNewEventsOnly(true);
    const newEvents = events.filter((event) => event.statusEvent === "NEW");
    setFilteredEvents(newEvents);
  };

  // Show all events
  const showAllEvents = () => {
    setShowNewEventsOnly(false);
    setFilteredEvents(events);
  };

  const updateEventStatus = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/events/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update the local state to reflect the new status
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === id ? { ...event, statusEvent: newStatus } : event
          )
        );
      } else {
        console.error("Failed to update event status");
      }
    } catch (error) {
      console.error("Error updating event status:", error);
    }
  };

  return (
    <section className="grid min-h-screen place-items-center p-8">
      {/* Search Field */}
      <div className="mb-8 w-full max-w-md">
        <Input
          type="text"
          label="Шукати за назвою"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Введіть назву"
        />
      </div>

      {/* Filter Button to Show Only "NEW" Status Events */}
      <div className="mb-8">
        <Button
          color="blue"
          onClick={showNewEventsOnly ? showAllEvents : filterNewEvents}
        >
          {showNewEventsOnly ? "Показати усі події" : "Показати нові події"}
        </Button>
      </div>

      {/* Events Grid */}
      <div className="container my-auto grid grid-cols-1 gap-x-8 gap-y-16 items-start lg:grid-cols-3">
        {filteredEvents.map(
          ({ id, image, category, name, shortDescription, date, organizer, statusEvent }) => (
            <div key={id}>
              <BlogPostCard
                id={id}
                img={`data:image/jpeg;base64,${image}`} // Pass the base64 string to BlogPostCard
                tag={category}
                title={name}
                desc={shortDescription}
                date={date}
                author={organizer.firstName + " " + organizer.lastName}
              />
              {/* Conditional button rendering based on status */}
              {statusEvent === "CONFIRMED" ? (
                <div className="flex gap-4 mt-4">
                  <Button
                    color="red"
                    onClick={() => updateEventStatus(id, "CANCELED")}
                  >
                    Cancel
                  </Button>
                </div>
              ) : statusEvent === "CANCELED" ? (
                <div className="flex gap-4 mt-4">
                  <Button
                    color="green"
                    onClick={() => updateEventStatus(id, "CONFIRMED")}
                  >
                    Confirm
                  </Button>
                </div>
              ) : (
                statusEvent !== "CANCELED" && (
                  <div className="flex gap-4 mt-4">
                    <Button
                      color="green"
                      onClick={() => updateEventStatus(id, "CONFIRMED")}
                    >
                      Підтвердити
                    </Button>
                    <Button
                      color="red"
                      onClick={() => updateEventStatus(id, "CANCELED")}
                    >
                      Скасувати
                    </Button>
                  </div>
                )
              )}

              {/* Show the current status */}
              <Typography
                variant="small"
                className={`mt-4 ${
                  statusEvent === "CONFIRMED" ? "text-green-500" : "text-red-500"
                }`}
              >
                Статус: {statusEvent}
              </Typography>
            </div>
          )
        )}
      </div>

      {/* View More Button */}
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
