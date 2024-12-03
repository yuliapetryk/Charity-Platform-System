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
  const [userRating, setUserRating] = useState<number | null>(null);
  const token = useSelector((state: any) => state.token.value);
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventResponse = await fetch(`http://localhost:8080/api/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const eventData = await eventResponse.json();
        setEvent(eventData);

        const idResponse = await fetch(`http://localhost:8080/api/userId`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userIdData = await idResponse.json();
        setUserId(userIdData);

        const roleResponse = await fetch("http://localhost:8080/api/role", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userRole = await roleResponse.text();
        setRole(userRole);

        const scoreResponse = await fetch(`http://localhost:8080/api/${id}/average-score`);
        const avgScore = await scoreResponse.json();
        console.log("Score:", avgScore);
        setAverageScore(avgScore);

        const favoriteResponse = await fetch(`http://localhost:8080/api/favorite`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const favorites = await favoriteResponse.json();
        setIsFavorite(favorites.includes(Number(id)));

        const ratingResponse = await fetch(`http://localhost:8080/api/${id}/user-rating`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userRatingData = await ratingResponse.json();

        setIsRated(userRatingData);
        console.log("Is rated:", userRatingData)
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
        await fetch(`http://localhost:8080/api/${id}/score`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(rating),
        });

        const scoreResponse = await fetch(`http://localhost:8080/api/${id}/average-score`);
        const avgScore = await scoreResponse.json();
        setAverageScore(avgScore);
        setIsRated(true);
        setUserRating(rating);
      } catch (error) {
        console.error("Error submitting rating:", error);
      }
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const url = `http://localhost:8080/api/events/${id}`;
      const method = "DELETE";

      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        router.push("/profile");
      } else {
        console.error("Failed to delete the event. Status:", response.status);
      }

    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };


  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card shadow={true}>
        <CardBody>
          <div className="relative w-full h-96">
            <Image
              src={`data:image/jpeg;base64,${event.image}`}
              alt={event.name}
              layout="fill"
              objectFit="cover"
            />
          </div>

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

            <Typography>
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline font-bold text-lg hover:text-blue-800 focus:text-blue-900 transition-all"
              >
                Підтримати
              </a>
            </Typography>

            <Typography variant="small" color="blue-gray" className="mt-6">
              Організатор: {event.organizer.firstName + " " + event.organizer.lastName}
            </Typography>

            {averageScore !== null && averageScore !== 0 && (
              <Typography variant="h6" color="blue-gray" className="mt-4">
                Актуальність: {averageScore.toFixed(2)}
              </Typography>
            )}

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
                      className={`p-3 rounded-full text-white ${userRating === rating
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

            {isAuthor && (
              <div className="mt-6 ">
                <Button className="mr-5" color="blue" onClick={() => router.push(`/editEvent/${id}`)}>
                  Редагувати
                </Button>

                <Button color="blue" onClick={handleDeleteEvent}>
                  Видалити
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
