import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminStatistics = () => {
  const [totalViews, setTotalViews] = useState<number | null>(null);
  const [totalFavorites, setTotalFavorites] = useState<number | null>(null);
  const [categoryData, setCategoryData] = useState<{ [key: string]: number }>({});
  const token = useSelector((state: any) => state.token.value);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const viewsResponse = await fetch("http://localhost:8080/api/events/total-views", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const viewsData = await viewsResponse.json();
        setTotalViews(viewsData);

        const favoritesResponse = await fetch("http://localhost:8080/api/favorite/total-count", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const favoritesData = await favoritesResponse.json();
        setTotalFavorites(favoritesData);

        const categories = ["health", "social", "ecology", "education", "sport"];
        const categoryPromises = categories.map(async (category) => {
          const response = await fetch(`http://localhost:8080/api/events/count-by-category/${category}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          return { category, count: data };
        });

        const categoryResults = await Promise.all(categoryPromises);
        const categoryCounts: { [key: string]: number } = {};
        categoryResults.forEach(({ category, count }) => {
          categoryCounts[category] = count;
        });
        setCategoryData(categoryCounts);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, [token]);

  const pieData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: "Event Distribution by Category",
        data: Object.values(categoryData),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Statistics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-blue-500 text-white text-center py-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Views</h2>
          <p className="text-6xl font-bold mt-4">{totalViews !== null ? totalViews : "Loading..."}</p>
        </div>

        <div className="bg-green-500 text-white text-center py-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Favorites</h2>
          <p className="text-6xl font-bold mt-4">{totalFavorites !== null ? totalFavorites : "Loading..."}</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-center mb-6">Event Distribution by Category</h2>
        {Object.keys(categoryData).length > 0 ? (
          <div className="flex justify-center">
            <Pie data={pieData} width={600} height={600} options={{ maintainAspectRatio: false }} />
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading chart...</p>
        )}
      </div>
    </div>
  );
};

export default AdminStatistics;
