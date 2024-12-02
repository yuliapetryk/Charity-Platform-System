"use client";
import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "@/components";
import Hero from "./hero";
import Posts from "./newEvents";
import PostsPopular from "./popularEvents";
import RecommendedPosts from "./recommendedEvents";

import { Provider, useSelector } from "react-redux";
import store from "./store";

function ConditionalRecommendedPosts() {
  const token = useSelector((state: any) => state.token.value); 
  const [role, setRole] = useState<string | null>(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        console.log("data.role:", data.role);
        setRole(data.role); 
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); 
      }
    };

    if (token) fetchUserRole(); 
  }, [token]);

  if (loading) return null;

  return role === "USER" ? <RecommendedPosts /> : null; 
}

export default function Campaign() {
  return (
    <Provider store={store}>
      <>
        <title>Open Hearts</title>
        <Navbar />
        <Hero />
        <Posts />
        <PostsPopular />
        <ConditionalRecommendedPosts /> 
        <Footer />
      </>
    </Provider>
  );
}
