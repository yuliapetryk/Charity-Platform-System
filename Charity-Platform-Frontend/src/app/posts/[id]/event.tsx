import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Typography, Card, CardBody, Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const EventDetail = ({ id }: { id: any }) => {
  const [event, setEvent] = useState<any>(null);
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isRated, setIsRated] = useState<boolean>(false);
  const [averageScore, setAverageScore] = useState<number | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null); // Store the user's rating
  const token = useSelector((state: any) => state.token.value);
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch event details
        const eventResponse = await fetch(`http://localhost:8080/api/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const eventData = await eventResponse.json();
        setEvent(eventData);

        // Fetch user ID
        const idResponse = await fetch(`http://localhost:8080/api/userId`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userIdData = await idResponse.json();
        setUserId(userIdData);

        // Fetch user role
        const roleResponse = await fetch("http://localhost:8080/api/role", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userRole = await roleResponse.text();
        setRole(userRole);

        // Fetch average score of the event
        const scoreResponse = await fetch(`http://localhost:8080/api/${id}/average-score`);
        const avgScore = await scoreResponse.json();
        console.log("Score:", avgScore);
        setAverageScore(avgScore);

        // Check if the event is favorited
        const favoriteResponse = await fetch(`http://localhost:8080/api/favorite`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const favorites = await favoriteResponse.json();
        setIsFavorite(favorites.includes(Number(id)));

        // Check if the user has rated the event
        const ratingResponse = await fetch(`http://localhost:8080/api/${id}/user-rating`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userRatingData = await ratingResponse.json();
        
        setIsRated(userRatingData); // Set the user's rating if available
        console.log("Is rated:", userRatingData)
        // Check if the user is the author
        setIsAuthor(eventData.organizer.id === userIdData && userRole === "USER");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, token]);

  const handleFavoriteToggle = async () => {
    try {
      const url = `http://localhost:8080/api/favorite/${id}/${isFavorite ? "delete" : "add"}`;
      const method = isFavorite ? "DELETE" : "POST";

      await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  const handleRatingClick = async (rating: number) => {
    if (rating >= 1 && rating <= 5 && userRating === null) {
      try {
        // Send the rating to the backend
        await fetch(`http://localhost:8080/api/${id}/score`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(rating),
        });

        // After rating, fetch the updated average score
        const scoreResponse = await fetch(`http://localhost:8080/api/${id}/average-score`);
        const avgScore = await scoreResponse.json();
        setAverageScore(avgScore);

        // Update the user rating
        setUserRating(rating);
      } catch (error) {
        console.error("Error submitting rating:", error);
      }
    }
  };

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

            {/* Display Average Score */}
            {averageScore !== null && averageScore !== 0 && (
              <Typography variant="h6" color="blue-gray" className="mt-4">
                Середня оцінка: {averageScore.toFixed(2)}
              </Typography>
            )}

            {/* Rating Buttons */}
{role === "USER" && !isRated && (
  <div className="mt-6">
    <Typography variant="h6" color="blue-gray" className="mb-4">
      Оцініть актуальність події:
    </Typography>
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          onClick={() => handleRatingClick(rating)}
          className={`p-3 rounded-full text-white ${
            userRating === rating
              ? "bg-green-500"
              : rating === 1
              ? "bg-red-500"
              : rating === 2
              ? "bg-orange-500"
              : rating === 3
              ? "bg-yellow-500"
              : rating === 4
              ? "bg-lime-500"
              : "bg-green-500"
          }`}
          title={`Rate ${rating}`}
        >
          {rating}
        </button>
      ))}
    </div>
  </div>
)}

            {/* Favorite Button */}
            {role === "USER" && (
              <div className="mt-6">
                <button
                  onClick={handleFavoriteToggle}
                  className="text-2xl text-red-500 flex items-center"
                  title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                >
                  {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
                  <span className="ml-2">{isFavorite ? "В обраному" : "Додати в обране"}</span>
                </button>
              </div>
            )}

            {/* Edit Button for Authors */}
            {isAuthor && (
              <div className="mt-6">
                <Button color="blue" onClick={() => router.push(`/editEvent/${id}`)}>
                  Редагувати
                </Button>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default EventDetail;
