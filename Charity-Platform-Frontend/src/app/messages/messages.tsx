import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

interface Message {
  eventId: number;
  content: string;
  date: string;
}

interface Event {
  id: number;
  name: string;
}

const Messages = () => {
    const token = useSelector((state: any) => state.token.value);
  const [messages, setMessages] = useState<Message[]>([]);
  const [events, setEvents] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/messages/user`, { 
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();

        setMessages(data);

        // Deduplicate event IDs
        const uniqueEventIds: { [key: number]: boolean } = {};
        const eventIds: number[] = [];
        data.forEach((msg: Message) => {
          if (!uniqueEventIds[msg.eventId]) {
            uniqueEventIds[msg.eventId] = true;
            eventIds.push(msg.eventId);
          }
        });

        // Fetch event names by IDs
        const eventNames: { [key: number]: string } = {};
        await Promise.all(
          eventIds.map(async (id) => {
            const eventResponse = await fetch(`http://localhost:8080/api/events/${id}`);
            if (!eventResponse.ok) throw new Error("Failed to fetch event name");
            const eventData: Event = await eventResponse.json();
            eventNames[id] = eventData.name;
          })
        );
        setEvents(eventNames);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [token, router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      {messages.map((msg) => {
        const eventName = events[msg.eventId] || "Unknown Event";
        return (
          <div key={msg.eventId} className="mb-4 p-4 border rounded shadow">
            <p>
              {msg.content === '{"message":"Canceled"}'? (
                <>
                  Вітаю! Ваше оголошення <strong>{eventName}</strong> успішно
                  опубліковано
                </>
              ) : msg.content === '{"message":"Confirmed"}' ? (
                <>
                  Вибачте, але ваше оголошення <strong>{eventName}</strong>{" "}
                  порушує умови спільноти, тому не буде опубліковано, виправіть його, будь ласка
                </>
              ) : (
                msg.content
              )}
            </p>
            <p className="text-gray-500">{new Date(msg.date).toLocaleString()}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
