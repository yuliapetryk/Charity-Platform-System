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
        <Typography
          as="span"
          color="blue-gray"
          className="text-lg font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          Open Hearts
        </Typography>

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
                Головна
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
                  Профіль
                </a>
              </li>
            )}
            <li>
              <a
                href="/aboutUs"
                className="text-gray-900 hover:text-blue-600"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/aboutUs");
                }}
              >
                <CommandLineIcon className="h-5 w-5 inline-block mr-2" />
                Про нас
              </a>
            </li>
          </ul>
        </div>

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
              Вийти
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/login")}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Увійти
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
