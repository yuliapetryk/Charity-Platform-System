"use client"; 
import React from "react";
import { useRouter } from "next/navigation";
import {  Footer } from "@/components";
import { Navbar } from "@/components"
import Hero from "../hero";
import Posts from "../posts";
import {Provider} from 'react-redux'
import store from '../store'

export default function Campaign() {
    return (
        <Provider store={store}>
        <>
            <title>Open Hearts</title>
            <Navbar />
            <Hero />
            <Posts />
            <Footer />
        </>
        </Provider>
    );
}
