"use client"; // Enables client-side rendering
import React from "react";
import { useRouter } from "next/navigation";
import { Navbar, Footer } from "@/components";
import { Login } from "../login/login"
import {Provider} from 'react-redux'
import store from '../store'


export default function Campaign() {
    const router = useRouter();

    return (
        <Provider store={store}>

        <>
            <Navbar />
            <Login/>
            <Footer />
        </>
        </Provider>
    );
}
