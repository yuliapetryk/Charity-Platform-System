import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Card, Typography } from "@material-tailwind/react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

interface EventStatistics {
  name: string;
  date: string;
  views: number;
  favoritesCount: number;
  score: number;
}

export default function Statistics() {
  const token = useSelector((state: any) => state.token.value); // Get token from Redux store
  const router = useRouter();

  const [statistics, setStatistics] = useState<EventStatistics[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalFavorites, setTotalFavorites] = useState<number>(0);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchStatistics = async () => {
      try {
        // Fetch user's event statistics
        const statsResponse = await fetch("http://localhost:8080/api/events/user/statistics", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!statsResponse.ok) throw new Error("Failed to fetch event statistics");

        const statsData = await statsResponse.json();
        setStatistics(statsData);

        // Fetch total count of user's favorite events
        const favoritesResponse = await fetch(`http://localhost:8080/api/favorite/count-by-user/${token}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!favoritesResponse.ok) throw new Error("Failed to fetch favorite events count");

        const favoritesData = await favoritesResponse.json();
        setTotalFavorites(favoritesData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [token, router]);

  if (loading) return <div className="text-center">Loading...</div>;

  // Calculate the total views for all user's events
  const totalViews = statistics.reduce((sum, event) => sum + event.views, 0);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <Typography color="blue-gray" className="text-2xl font-bold mb-6">
        Статистика ваших подій
      </Typography>
      <Card className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg">
        {/* Overall Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Total Views */}
          <div className="bg-blue-500 text-white text-center py-6 rounded-lg shadow-md">
            <Typography variant="h6" className="font-semibold">
              Загальна кількість переглядів
            </Typography>
            <Typography variant="h3" className="font-bold mt-2">
              {totalViews}
            </Typography>
          </div>

          {/* Total Favorites */}
          <div className="bg-green-500 text-white text-center py-6 rounded-lg shadow-md">
            <Typography variant="h6" className="font-semibold">
              Загальна кількість доданих в обране
            </Typography>
            <Typography variant="h3" className="font-bold mt-2">
              {totalFavorites}
            </Typography>
          </div>
        </div>

        {/* Statistics Table */}
        <Typography color="blue-gray" className="text-xl font-bold mb-4">
          Статистика окремих подій
        </Typography>
        {statistics.length > 0 ? (
          <TableContainer component={Paper} className="shadow-lg rounded-lg">
            <Table>
              <TableHead>
                <TableRow className="bg-purple-500 text-white"> {/* Changed to purple */}
                  <TableCell className="font-bold">Назва</TableCell>
                  <TableCell className="font-bold">Дата</TableCell>
                  <TableCell className="font-bold">Перегляди</TableCell>
                  <TableCell className="font-bold">Додано в обране</TableCell>
                  <TableCell className="font-bold">Актуальність</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {statistics.map((event, index) => (
                  <TableRow
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{new Date(event.date).toLocaleDateString("uk-UA")}</TableCell>
                    <TableCell>{event.views}</TableCell>
                    <TableCell>{event.favoritesCount}</TableCell>
                    <TableCell>{event.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography color="gray" className="text-center mt-4">
            У вас ще немає подій зі статистикою.
          </Typography>
        )}
      </Card>
    </div>
  );
}
