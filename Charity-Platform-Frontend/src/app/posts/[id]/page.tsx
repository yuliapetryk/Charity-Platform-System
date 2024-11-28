"use client"

import { useParams } from "next/navigation"; // Use for dynamic params
import { Navbar, Footer } from "@/components";
import EventDetail from "./event"; // Adjust the path based on your project structure
import { Provider } from "react-redux";
import store from "../../store"; // Adjust the store path as needed

const EventPage = () => {
  const { id } = useParams(); // Capture the dynamic route parameter


  return (
    <Provider store={store}>
      <>
        <Navbar />
        <EventDetail id={id} />
        <Footer />
      </>
    </Provider>
  );
};

export default EventPage;
