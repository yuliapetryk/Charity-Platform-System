"use client"

import { Navbar, Footer } from "@/components";
import AboutUs from "./aboutUs"; 
import { Provider } from "react-redux";
import store from "../store"; 

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
