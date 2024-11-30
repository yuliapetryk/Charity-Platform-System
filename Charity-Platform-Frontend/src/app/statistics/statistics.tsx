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
}

export default function Statistics() {
  const token = useSelector((state: any) => state.token.value); // Get token from Redux store
  const router = useRouter();

  const [statistics, setStatistics] = useState<EventStatistics[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchStatistics = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/events/user/statistics", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch statistics");

        const data = await response.json();
        setStatistics(data);
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
        {/* Summary Section */}
        <div className="mb-6">
          <Typography color="blue-gray" className="text-xl font-semibold text-center">
            Загальна кількість переглядів: <span className="font-bold">{totalViews}</span>
          </Typography>
        </div>

        {/* Statistics Table */}
        {statistics.length > 0 ? (
          <TableContainer component={Paper} className="shadow-lg rounded-lg">
            <Table>
              <TableHead>
                <TableRow className="bg-blue-500 text-white">
                  <TableCell className="font-bold">Назва</TableCell>
                  <TableCell className="font-bold">Дата</TableCell>
                  <TableCell className="font-bold">Перегляди</TableCell>
                  <TableCell className="font-bold">Додано в обране</TableCell>
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
