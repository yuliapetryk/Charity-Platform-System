"use client"

import { Navbar, Footer } from "@/components";
import EventDetail from "./usersEvent";
import { Provider } from "react-redux";
import store from "../store";

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
