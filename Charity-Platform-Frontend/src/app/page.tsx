"use client"; // Enables client-side rendering
import React from "react";
import { useRouter } from "next/navigation";
import { Navbar, Footer } from "@/components";
import Hero from "./hero";
import Posts from "./newEvents";
import PostsPopular from "./popularEvents";

import Articles from "./articles";
import {Provider} from 'react-redux'
import store from './store'

export default function Campaign() {
    const router = useRouter();
 
    return (
        
        <Provider store={store}>
        <>
            <title>Open Hearts</title>
            <Navbar />
            <Hero />
            <Posts />
            <PostsPopular />
            <Articles />
            <Footer />
        </>
        </Provider>
    );
}
