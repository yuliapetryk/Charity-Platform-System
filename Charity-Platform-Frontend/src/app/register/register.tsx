"use client";
import React, { useState } from "react";
import { Typography, Button, Input, Card, Radio } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { setter } from '../tokenSlice'
import { useRouter } from "next/navigation";

interface RootState {
  token: {
    value: string;
  };
}

export function Register() {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.token.value);
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [userType, setUserType] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      email,
      userType,
      password,
      role,
    });

    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      userType: userType,
      password: password,
      role: "USER",
    }

    fetch('http://localhost:8080/api/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json?.token) {
          dispatch(setter(json.token))
          router.push("/login");
        }
      })
      .catch(err => {
        console.error(err)
      })


  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg p-8 bg-white shadow-lg">
        <header className="text-center">
          <Typography
            color="blue-gray"
            className="text-[30px] lg:text-[36px] font-bold"
          >
            Зареєструватися у  Open Hearts
          </Typography>
          <Typography
            variant="paragraph"
            className="mt-2 text-gray-600"
          >
            Долучайтеся до підтримки благодійних ініціатив.
          </Typography>
        </header>
        <form onSubmit={handleRegister} className="mt-8 space-y-6">
          {/* First Name */}
          <div>
            <Input
              label="Ім'я"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              size="lg"
              required
            />
          </div>

          <div>
            <Input
              label="Прізвище"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              size="lg"
              required
            />
          </div>

          <div>
            <Input
              label="Електронна адреса"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Typography variant="small" className="text-gray-700">
              Тип користувача:
            </Typography>
            <div className="flex gap-4">
              <Radio
                id="personal"
                name="userType"
                label="Особистий"
                checked={userType === "INDIVIDUAL"}
                onChange={() => setUserType("INDIVIDUAL")}
                color="blue"
              />
              <Radio
                id="company"
                name="userType"
                label="Компанія"
                checked={userType === "ORGANIZATION"}
                onChange={() => setUserType("ORGANIZATION")}
                color="blue"
              />
            </div>
          </div>

          <div>
            <Input
              label="Пароль"
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
            Підтвердити
          </Button>
        </form>
        <footer className="mt-6 text-center">
          <Typography
            variant="paragraph"
            className="text-gray-600"
          >
            Уже зареєтровані?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:underline"
            >
              Увійти
            </a>
          </Typography>
        </footer>
      </Card>
    </div>
  );
};
