import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { useSelector } from "react-redux";

const EditEvent = ({ id }: { id: any }) => {
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<any>({
    name: "",
    category: "",
    description: "",
    link: "",
  });
  const token = useSelector((state: any) => state.token.value);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchEventData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/events/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          setEvent(data);
          setFormData({
            name: data.name,
            category: data.category,
            description: data.description,
            link: data.link,
          });
          setLoading(false);
        } catch (error) {
          console.error("Error fetching event data:", error);
        }
      };

      fetchEventData();
    }
  }, [id, token]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push(`/posts/${id}`);
      } else {
        console.error("Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-10"
      >
        <Input
          label="Назва Події"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="mb-6 text-lg py-3"
        />
        <Input
          label="Категорія"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
          className="mb-6 text-lg py-3"
        />
        <Textarea
          label="Опис"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          className="mb-6 text- py-5"
        />
        <Input
          label="Посилання"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          required
          className="mb-6 text-lg py-3"
        />
        <Button type="submit" color="green" className="mt-6 text-lg py-3">
          Зберегти Зміни
        </Button>
      </form>
    </div>
  );
};

export default EditEvent;
