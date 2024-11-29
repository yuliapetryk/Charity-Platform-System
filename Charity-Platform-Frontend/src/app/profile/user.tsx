"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button, Card, Typography } from "@material-tailwind/react";
import { logout } from "../tokenSlice";

export function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const token = useSelector((state: any) => state.token.value); // Access token from Redux store
  const [userInfo, setUserInfo] = useState<any>(null); // State to store user info
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading

  console.log("Token from Redux:", token); 

  // Fetch user profile information
  useEffect(() => {
    if (!token) {
      router.push("/login"); // Redirect to login if no token
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Use token for authentication
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUserInfo(data); // Set the user info
        console.log(data)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchUserProfile();
  }, [token, router]);

  if (loading) return <div>Loading...</div>; // Show loading text while data is fetching

  if (!userInfo) return <div>Failed to load user data</div>; // Handle failure to load data

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg">
        <header className="text-center">
          <Typography
            color="blue-gray"
            className="text-[30px] lg:text-[36px] font-bold"
          >
            User Profile
          </Typography>
        </header>

        <div className="mt-6">
          <Typography color="gray" className="text-lg mb-2">
            <strong>Name: </strong> {userInfo.firstName} {userInfo.lastName}
          </Typography>
          <Typography color="gray" className="text-lg mb-2">
            <strong>Email: </strong> {userInfo.email}
          </Typography>
          <Typography color="gray" className="text-lg mb-2">
            <strong>Role: </strong> {userInfo.role}
          </Typography>
        </div>

        <div className="mt-6 text-center">
          <Button
            variant="outlined"
            color="red"
            onClick={() => dispatch(logout())}
            className="w-full mb-2"
          >
            Logout
          </Button>
        </div>

        {/* Conditional Buttons Based on Role */}
        {userInfo.role === "USER" ? (
          <>
            <div className="mt-4 text-center">
              <Button
                variant="outlined"
                color="blue"
                onClick={() => router.push("/event")}
                className="w-full mb-2"
              >
                Create Event
              </Button>
            </div>
            <div className="mt-4 text-center">
              <Button
                variant="outlined"
                color="green"
                onClick={() => router.push(`/allEventsUser`)}
                className="w-full"
              >
                See All My Events
              </Button>
            </div>
          </>
        ) : userInfo.role === "ADMIN" ? (
          <>
            <div className="mt-4 text-center">
              <Button
                variant="outlined"
                color="blue"
                onClick={() => router.push("/createAdmin")}
                className="w-full mb-2"
              >
                Create Admin
              </Button>
            </div>
            <div className="mt-4 text-center">
              <Button
                variant="outlined"
                color="green"
                onClick={() => router.push(`/allEventsAdmin`)}
                className="w-full"
              >
                See All Events
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
export default Profile;
