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
    });

    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      userType: userType,
      password: password
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
        router.push("/login");
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
                Register to Open Hearts
              </Typography>
              <Typography
                variant="paragraph"
                className="mt-2 text-gray-600"
              >
                Join us to support charitable initiatives.
              </Typography>
            </header>
            <form onSubmit={handleRegister} className="mt-8 space-y-6">
              {/* First Name */}
              <div>
                <Input
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  size="lg"
                  required
                />
              </div>
    
              {/* Second Name */}
              <div>
                <Input
                  label="Second Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  size="lg"
                  required
                />
              </div>
    
              {/* Email */}
              <div>
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                  required
                />
              </div>
    
              {/* User Type */}
              <div className="flex flex-col gap-2">
                <Typography variant="small" className="text-gray-700">
                  Type of User:
                </Typography>
                <div className="flex gap-4">
                  <Radio
                    id="personal"
                    name="userType"
                    label="Personal"
                    checked={userType === "INDIVIDUAL"}
                    onChange={() => setUserType("INDIVIDUAL")}
                    color="blue"
                  />
                  <Radio
                    id="company"
                    name="userType"
                    label="Company"
                    checked={userType === "ORGANIZATION"}
                    onChange={() => setUserType("ORGANIZATION")}
                    color="blue"
                  />
                </div>
              </div>
    
              {/* Password */}
              <div>
                <Input
                  label="Password"
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
                Register
              </Button>
            </form>
            <footer className="mt-6 text-center">
              <Typography
                variant="paragraph"
                className="text-gray-600"
              >
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-500 hover:underline"
                >
                  Sign in
                </a>
              </Typography>
            </footer>
          </Card>
        </div>
    );
};
