"use client"

import { useParams } from "next/navigation"; // Use for dynamic params
import { Navbar, Footer } from "@/components";
import EventDetail from "./favoriteEvents"; // Adjust the path based on your project structure
import { Provider } from "react-redux";
import store from "../store"; // Adjust the store path as needed

const EventPage = () => {

  return (
    <Provider store={store}>
      <>
        <title>Open Hearts</title>
        <Navbar />
        <EventDetail />
        <Footer />
      </>
    </Provider>
  );
};

export default EventPage;
