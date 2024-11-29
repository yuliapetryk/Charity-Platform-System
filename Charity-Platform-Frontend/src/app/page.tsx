"use client"; // Enables client-side rendering
import React from "react";
import { useRouter } from "next/navigation";
import { Navbar, Footer } from "@/components";
import Hero from "./hero";
import Posts from "./newEvents";
import Articles from "./articles";
import {Provider} from 'react-redux'
import store from './store'

export default function Campaign() {
    const router = useRouter();
 
    return (
        
        <Provider store={store}>
        <>
            <Navbar />
            <Hero />
            <Posts />
            <Articles />
            <Footer />
        </>
        </Provider>
    );
}
