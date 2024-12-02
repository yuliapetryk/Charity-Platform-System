"use client"; 
import React from "react";
import {  Footer } from "@/components";
import { Navbar } from "@/components"
import EventStatistics from "./statistics"
import {Provider} from 'react-redux'
import store from '../store'

export default function Campaign() {
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
