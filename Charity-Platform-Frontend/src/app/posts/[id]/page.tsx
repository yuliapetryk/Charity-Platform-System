"use client"

import { useParams } from "next/navigation"; 
import { Navbar, Footer } from "@/components";
import EventDetail from "./event"; 
import { Provider } from "react-redux";
import store from "../../store"; 

const EventPage = () => {
  const { id } = useParams();


  return (
    <Provider store={store}>
      <>
        <title>Open Hearts</title>
        <Navbar />
        <EventDetail id={id} />
        <Footer />
      </>
    </Provider>
  );
};

export default EventPage;
