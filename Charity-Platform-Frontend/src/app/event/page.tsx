"use client";
import React from "react";
import { Footer } from "@/components";
import { Navbar } from "@/components"
import CreateEvent from "./create";
import { Provider } from 'react-redux'
import store from '../store'

export default function Campaign() {
    return (
        <Provider store={store}>
            <>
                <title>Open Hearts</title>
                <Navbar />
                <CreateEvent />
                <Footer />
            </>
        </Provider>
    );
}
