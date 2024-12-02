"use client"; // Enables client-side rendering
import React from "react";
import { Navbar, Footer } from "@/components";
import { Login } from "../login/login"
import {Provider} from 'react-redux'
import store from '../store'


export default function Campaign() {
    return (
        <Provider store={store}>
        <>
            <title>Open Hearts</title>
            <Navbar />
            <Login/>
            <Footer />
        </>
        </Provider>
    );
}
