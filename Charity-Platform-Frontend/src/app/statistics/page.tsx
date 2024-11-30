"use client"; // Enables client-side rendering
import React from "react";
import { useRouter } from "next/navigation";
import {  Footer } from "@/components";
import { Navbar } from "@/components"
import EventStatistics from "./statistics"
import {Provider} from 'react-redux'
import store from '../store'

export default function Campaign() {
    const router = useRouter();

    return (
        <Provider store={store}>
        <>
            <title>Open Hearts</title>
            <Navbar />
            <EventStatistics />
            <Footer />
        </>
        </Provider>
    );
}
