"use client"; // Enables client-side rendering
import React from "react";
import { useRouter } from "next/navigation";
import { Navbar, Footer } from "@/components";
import { Register } from "../register/register"
import {Provider} from 'react-redux'
import store from '../store'

export default function Campaign() {
    const router = useRouter();

    return (
        <Provider store={store}>

        <>
            <title>Open Hearts</title>
            <Navbar />
            <Register/>
            <Footer />
        </>
        </Provider>
    );
}
