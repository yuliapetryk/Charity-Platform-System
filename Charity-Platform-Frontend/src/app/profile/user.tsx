"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button, Card, Typography, Input } from "@material-tailwind/react";
import { logout } from "../tokenSlice";
import { UserIcon, CogIcon, ArrowLeftIcon, DocumentIcon } from "@heroicons/react/24/outline";

export function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const token = useSelector((state: any) => state.token.value); // Access token from Redux store
  const [userInfo, setUserInfo] = useState<any>(null); // State to store user info
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading
  const [isEditing, setIsEditing] = useState<boolean>(false); // Track if the user is editing
  const [editedInfo, setEditedInfo] = useState<any>(userInfo); // Track changes to user info

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
        setEditedInfo(data); // Initialize editedInfo with the fetched data
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchUserProfile();
  }, [token, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedInfo((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedInfo),
      });

      if (!response.ok) throw new Error("Failed to update user data");

      const data = await response.json();
      setUserInfo(data); // Update the user info with the response data
      setIsEditing(false); // Exit edit mode after saving changes
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>; // Show loading text while data is fetching

  if (!userInfo) return <div className="text-center">Failed to load user data</div>; // Handle failure to load data

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-lg">
        
        {/* Personal Info Section */}
        <section className="mb-8">
          <Typography color="blue-gray" className="text-[30px] lg:text-[36px] font-bold text-center">
            Ваш профіль
          </Typography>

          <Card className="mt-6 p-6 shadow-sm bg-gray-50">
            {isEditing ? (
              <div>
                <div className="mb-4">
                  <Input
                    label="Ім'я"
                    value={editedInfo.firstName}
                    name="firstName"
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="mb-4">
                  <Input
                    label="Прізвише"
                    value={editedInfo.lastName}
                    name="lastName"
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="mb-4">
                  <Input
                    label="Електронна адреса"
                    value={editedInfo.email}
                    name="email"
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="mt-4 text-center">
                  <Button
                    color="green"
                    onClick={handleSaveChanges}
                    className="w-full"
                  >
                    Зберегти зміни
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <Typography color="gray" className="text-lg mb-4">
                  <strong>Вітаємо, </strong> {userInfo.firstName} {userInfo.lastName}
                </Typography>
                <Typography color="gray" className="text-lg mb-4">
                  <strong>Ваша електронна адреса:</strong> {userInfo.email}
                </Typography>
                <div className="mt-4 text-center">
                  <Button
                    variant="outlined"
                    color="blue"
                    onClick={() => setIsEditing(true)}
                    className="w-full"
                  >
                    Редагувати дані
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </section>

        {/* Management Panel */}
        <section>
          <Typography color="blue-gray" className="text-xl font-semibold mb-4 text-center">
            Панель керування
          </Typography>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Conditional Buttons Based on Role */}
            {userInfo.role === "USER" ? (
              <>
                <Button
                  variant="outlined"
                  color="blue"
                  onClick={() => router.push("/event")}
                  className="w-full flex items-center gap-2"
                >
                  <DocumentIcon className="w-5 h-5" /> Створити оголошення
                </Button>

                <Button
                  variant="outlined"
                  color="green"
                  onClick={() => router.push(`/allEventsUser`)}
                  className="w-full flex items-center gap-2"
                >
                  <CogIcon className="w-5 h-5" /> Переглянути мої оголошення
                </Button>
              </>
            ) : userInfo.role === "ADMIN" ? (
              <>
                <Button
                  variant="outlined"
                  color="blue"
                  onClick={() => router.push("/createAdmin")}
                  className="w-full flex items-center gap-2"
                >
                  <CogIcon className="w-5 h-5" /> Додати адміністратора
                </Button>

                <Button
                  variant="outlined"
                  color="green"
                  onClick={() => router.push(`/allEventsAdmin`)}
                  className="w-full flex items-center gap-2"
                >
                  <DocumentIcon className="w-5 h-5" /> Переглянути всі оголошення
                </Button>
              </>
            ) : null}
          </div>
        </section>

        {/* Logout Button */}
        <section className="mt-8 text-center">
          <Button
            variant="outlined"
            color="red"
            onClick={() => dispatch(logout())}
            className="w-full flex items-center gap-2 justify-center"
          >
            <ArrowLeftIcon className="w-5 h-5" /> Вийти
          </Button>
        </section>
      </div>
    </div>
  );
}

export default Profile;
