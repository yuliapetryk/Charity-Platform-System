"use client"; // Enables client-side rendering
import React from "react";
import { useRouter } from "next/navigation";
import { Navbar, Footer } from "@/components";
import Hero from "../hero";
import Posts from "../posts";
import Articles from "../articles";
import {Provider} from 'react-redux'
import store from '../store'

export default function Campaign() {
    const router = useRouter();

    return (
        <Provider store={store}>
        <>
         <title>Open Hearts</title>
            <Navbar />
            <Hero />
            <button onClick={() => router.push("/login")}>Sign In</button>
            <Posts />
            <Articles />
            <Footer />
        </>
        </Provider>
    );
}
