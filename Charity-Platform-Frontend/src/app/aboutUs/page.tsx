"use client"

import { useParams } from "next/navigation"; // Use for dynamic params
import { Navbar, Footer } from "@/components";
import AboutUs from "./aboutUs"; // Adjust the path based on your project structure
import { Provider } from "react-redux";
import store from "../store"; // Adjust the store path as needed

const EventPage = () => {

  return (
    <Provider store={store}>
      <>
        <title>Open Hearts</title>
        <Navbar />
        <AboutUs />
        <Footer />
      </>
    </Provider>
  );
};

export default EventPage;
