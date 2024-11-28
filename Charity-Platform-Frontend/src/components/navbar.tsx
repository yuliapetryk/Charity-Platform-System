"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/tokenSlice";
import { useRouter } from "next/navigation";
import { Button, Typography } from "@material-tailwind/react";
import { RectangleStackIcon, UserCircleIcon, CommandLineIcon } from "@heroicons/react/24/solid";

export function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuthenticated } = useSelector((state: any) => state.token);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Typography
          as="span"
          color="blue-gray"
          className="text-lg font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          Open Hearts
        </Typography>

        {/* Centered Navigation Links */}
        <div className="flex-1 flex justify-center">
          <ul className="flex gap-8">
            <li>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/");
                }}
                className="text-gray-900 hover:text-blue-600"
              >
                <RectangleStackIcon className="h-5 w-5 inline-block mr-2" />
                Home
              </a>
            </li>
            {isAuthenticated && (
              <li>
                <a
                  href="/profile"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/profile");
                  }}
                  className="text-gray-900 hover:text-blue-600"
                >
                  <UserCircleIcon className="h-5 w-5 inline-block mr-2" />
                  Profile
                </a>
              </li>
            )}
            <li>
              <a
                href="https://example.com"
                target="_blank"
                className="text-gray-900 hover:text-blue-600"
              >
                <CommandLineIcon className="h-5 w-5 inline-block mr-2" />
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Authentication Buttons */}
        <div className="flex gap-4">
          {isAuthenticated ? (
            <Button
              variant="text"
              onClick={() => {
                dispatch(logout());
                router.push("/");
              }}
                            className="text-gray-900 hover:text-blue-600"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/login")}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
