"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Card, Typography } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { setter } from "../tokenSlice";

export function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { email, password };

    try {
      // Login and get the token
      const response = await fetch("http://localhost:8080/api/signin", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      const token = data.token;
      console.log("Token:", token)
      // Save the token in Redux
      dispatch(setter(token));
// Dispatch the setter action to store the token
      router.push("/"); // Redirect to home or dashboard
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-8 bg-white shadow-lg">
        <header className="text-center">
          <Typography
            color="blue-gray"
            className="text-[30px] lg:text-[36px] font-bold"
          >
            Увіти до Open Hearts
          </Typography>
        </header>
        <form onSubmit={handleLogin} className="mt-8">
          <div className="mb-6">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
              required
            />
          </div>
          <div className="mb-6">
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="lg"
              required
            />
          </div>
          <Button
            type="submit"
            fullWidth
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Увійти
          </Button>
        </form>
        <footer className="mt-6 text-center">
          <Typography variant="paragraph" className="text-gray-600">
            Ви у нас уперше?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Зареєстуйтесь!
            </a>
          </Typography>
        </footer>
      </Card>
    </div>
  );
}
