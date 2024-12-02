"use client";
import React, { useState } from "react";
import {
  Typography,
  Button,
  Input,
  Card,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";

interface RootState {
  token: {
    value: string;
  };
}
const categories = [
  "Здоров'я",
  "Соціальна допомога",
  "Екологія та тварини",
  "Освіта та наука",
  "Культура і спорт",
];

export default function CreateEvent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const token = useSelector((state: RootState) => state.token.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !description || !shortDescription || !category || !image || !link) {
      alert("Please fill in all fields.");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("name", name);
    formPayload.append("description", description);
    formPayload.append("shortDescription", shortDescription);
    formPayload.append("category", category);
    formPayload.append("link", link);
    formPayload.append("image", image);

    try {
      console.log("Token:", token);

      const response = await fetch("http://localhost:8080/api/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formPayload,
      });

      if (response.ok) {
        console.log("Event created successfully!");
        setName("");
        setDescription("");
        setShortDescription("");
        setCategory("");
        setImage(null);
        setLink("")
      } else {
        console.log("Failed to create event. Please try again.");
      }
    } catch (err) {
      console.error("Error creating event:", err);
      console.log("An error occurred. Please try again.");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg p-8 bg-white shadow-lg">
        <header className="text-center">
          <Typography
            color="blue-gray"
            className="text-[30px] lg:text-[36px] font-bold"
          >
            Створити оголошення
          </Typography>
          <Typography
            variant="paragraph"
            className="mt-2 text-gray-600"
          >
            Створіть і поділіться своєю благодійною акцією.
          </Typography>
        </header>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <Input
              label="Назва акції"
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="lg"
              required
            />
          </div>

          <div>
            <Textarea
              label="Короткий опис акції"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              maxLength={250}
              minLength={50}
              size="lg"
              required
            />
          </div>

          <div>
            <Textarea
              label="Опис акції"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              size="lg"
              maxLength={1500}
              minLength={50}
              className="w-full overflow-hidden resize-none"
              required
            />
            <p className="text-gray-500 text-sm mt-2">
              {description.length} / 1500 символів
            </p>
          </div>

          <div>
            <Textarea
              label="Посилання на збір"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              maxLength={100}
              minLength={5}
              size="lg"
              required
            />
          </div>

          <div>
            <Select
              label="Категорія"
              value={category}
              onChange={(value) => setCategory(value || "")}
              size="lg"

            >
              {categories.map((cat) => (
                <Option key={cat} value={cat}>
                  {cat}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <Input
              type="file"
              label="Картинка"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              size="lg"
              required
            />
          </div>

          <Button
            type="submit"
            fullWidth
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Створити подію
          </Button>
        </form>
      </Card>
    </div>
  );
}
