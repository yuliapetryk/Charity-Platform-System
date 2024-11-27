import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setter } from "../tokenSlice";
import { Button, Input, Card, Typography } from "@material-tailwind/react";

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

      // Save the token in Redux
      dispatch(setter(token));

      // Fetch user role
      const roleResponse = await fetch("http://localhost:8080/api/role", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });

      if (!roleResponse.ok) throw new Error("Failed to fetch role");

      const role = await roleResponse.text();

      // Redirect based on role
      if (role === "ADMIN") {
        router.push("/admin");
      } else if (role === "USER") {
        router.push("/user");
      } else {
        console.error("Unknown role");
      }
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
            Login to Open Hearts
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
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}
