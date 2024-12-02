"use client"

import { Navbar, Footer } from "@/components";
import Posts from "./allEventsCategory";
import { Provider } from "react-redux";
import store from "../store";

const EventPage = () => {

  return (
    <Provider store={store}>
      <>
        <title>Open Hearts</title>
        <Navbar />
        <Posts />
        <Footer />
      </>
    </Provider>
  );
};

export default EventPage;
