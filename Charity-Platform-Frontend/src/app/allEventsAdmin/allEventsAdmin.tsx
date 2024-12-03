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
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showNewEventsOnly, setShowNewEventsOnly] = useState<boolean>(false);
  const token = useSelector((state: any) => state.token.value);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/events/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setEvents(data);
        setFilteredEvents(data);
        console.log("DATA:", data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [token]);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  const filterNewEvents = () => {
    setShowNewEventsOnly(true);
    const newEvents = events.filter((event) => event.statusEvent === "NEW");
    setFilteredEvents(newEvents);
  };

  const showAllEvents = () => {
    setShowNewEventsOnly(false);
    setFilteredEvents(events);
  };

  const updateEventStatus = async (id: number, newStatus: string) => {
    try {
      // Update the event status
      const response = await fetch(`http://localhost:8080/api/events/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
  
      if (response.ok) {
        // Update the local event state
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === id ? { ...event, statusEvent: newStatus } : event
          )
        );
  
        // Save a message based on the status update
        const message = newStatus === "CONFIRMED" ? "Confirmed" : "Canceled";
  
        const messageResponse = await fetch(`http://localhost:8080/api/${id}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message }),
        });
  
        if (messageResponse.ok) {
          console.log(`Message "${message}" saved for event ID: ${id}`);
        } else {
          console.error("Failed to save the message");
        }
      } else {
        console.error("Failed to update event status");
      }
    } catch (error) {
      console.error("Error updating event status:", error);
    }
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

      <div className="mb-8">
        <Button
          color="blue"
          onClick={showNewEventsOnly ? showAllEvents : filterNewEvents}
        >
          {showNewEventsOnly ? "Показати усі події" : "Показати нові події"}
        </Button>
      </div>

      <div className="container my-auto grid grid-cols-1 gap-x-8 gap-y-16 items-start lg:grid-cols-3">
        {filteredEvents.map(
          ({ id, image, category, name, shortDescription, date, organizer, statusEvent }) => (
            <div key={id}>
              <BlogPostCard
                id={id}
                img={`data:image/jpeg;base64,${image}`}
                tag={category}
                title={name}
                desc={shortDescription}
                date={date}
                author={organizer.firstName + " " + organizer.lastName}
              />
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

              <Typography
                variant="small"
                className={`mt-4 ${statusEvent === "CONFIRMED" ? "text-green-500" : "text-red-500"
                  }`}
              >
                Статус: {statusEvent}
              </Typography>
            </div>
          )
        )}
      </div>

    </section>
  );
}

export default Posts;
