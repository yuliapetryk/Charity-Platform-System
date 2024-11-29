"use client";
import React, { useState } from "react";
import { Typography, Button, Input, Card, Radio } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import {setter} from '../tokenSlice'
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
      userType: "MANAGER",
      password: password,
      role: "ADMIN",
    }

    fetch('http://localhost:8080/api/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      if (json?.token){
        dispatch(setter(json.token))
        router.push("/");
      }
    })
    .catch(err =>{
      console.error(err)
    })


    // Add your registration logic here
  };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <Card className="w-full max-w-lg p-8 bg-white shadow-lg">
            <header className="text-center">
              <Typography
                color="blue-gray"
                className="text-[30px] lg:text-[36px] font-bold"
              >
                Зареєструвати нового Адміністратора
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
    
              {/* Second Name */}
              <div>
                <Input
                  label="Прізвище"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  size="lg"
                  required
                />
              </div>
    
              {/* Email */}
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
    
            
              {/* Password */}
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
    
              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Зареєструвати
              </Button>
            </form>
          </Card>
        </div>
    );
};
