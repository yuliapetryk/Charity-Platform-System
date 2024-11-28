import React from "react";
import Image from "next/image";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import { useEffect, useState } from "react";


const EventDetail = ({ id }: { id: any }) => {
  const [event, setEvent] = useState<any>(null);

  // Fetch event data based on the dynamic ID
  useEffect(() => {
    if (id) {
      const fetchEventData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/events/${id}`);
          const data = await response.json();
          setEvent(data);
          console.log("Data:", data)
        } catch (error) {
          console.error("Error fetching event data:", error);
        }
      };

      fetchEventData();
    }
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card shadow={true}>
        <CardBody>
          {/* Event Image */}
          <div className="relative w-full h-96">
            <Image
              src={`data:image/jpeg;base64,${event.image}`} // Assuming the image is in base64 format
              alt={event.name}
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Event Information */}
          <div className="p-6">
            <Typography variant="h3" color="blue-gray" className="mb-2">
              {event.name}
            </Typography>

            <Typography variant="small" color="blue" className="mb-2">
               {event.category}
            </Typography>

            <Typography variant="small" color="blue-gray" className="mb-4">
              Дата публікації: {new Date(event.date).toLocaleDateString()}
            </Typography>

            <Typography variant="h6" color="blue-gray" className="mb-4">
              Опис:
            </Typography>
            <Typography className="mb-4">{event.description}</Typography>

            <Typography variant="h6" color="blue-gray" className="mb-4">
               Посилання на збір:
            </Typography>
            <Typography>
              <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    {event.link}
              </a>
            </Typography>

            <Typography variant="small" color="blue-gray" className="mt-6">
              Організатор: {event.organizer.firstName + " " + event.organizer.lastName}
            </Typography>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default EventDetail;
