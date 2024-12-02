"use client";
import React from "react";
import { Navbar, Footer } from "@/components";
import Hero from "./hero";
import Posts from "./newEvents";
import PostsPopular from "./popularEvents";
import { Provider } from 'react-redux'
import store from './store'

export default function Campaign() {
    return (
        <Provider store={store}>
            <>
                <title>Open Hearts</title>
                <Navbar />
                <Hero />
                <Posts />
                <PostsPopular />
                <Footer />
            </>
        </Provider>
    );
}
