"use client"; // Enables client-side rendering
import React from "react";
import { useRouter } from "next/navigation";
import {  Footer } from "@/components";
import { Navbar } from "@/components"
import CreateEvent from "./create";
import {Provider} from 'react-redux'
import store from '../store'

export default function Campaign() {
    const router = useRouter();

    return (
        <Provider store={store}>
        <>
            <Navbar />
            <CreateEvent />
            <Footer />
        </>
        </Provider>
    );
}
