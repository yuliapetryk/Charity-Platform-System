"use client"; // Enables client-side rendering
import React from "react";
import { useRouter } from "next/navigation";
import {  Footer } from "@/components";
import { Navbar } from "@/components"
import EditEvent from "./editEvent";
import {Provider} from 'react-redux'
import store from '../../store'
import { useParams } from "next/navigation"; 

export default function Campaign() {
    const router = useRouter();
    const { id } = useParams();

    return (
        <Provider store={store}>
        <>
            <title>Open Hearts</title>
            <Navbar />
            <EditEvent id={id} />
            <Footer />
        </>
        </Provider>
    );
}
