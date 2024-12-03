"use client"; 
import React from "react";
import { useRouter } from "next/navigation";
import { Navbar, Footer } from "@/components";
import  Messages  from "./messages"
import {Provider} from 'react-redux'
import store from '../store'


export default function Campaign() {
    const router = useRouter();

    return (
        <Provider store={store}>
        <>
            <title>Open Hearts</title>
            <Navbar />
            <Messages/>
            <Footer />
        </>
        </Provider>
    );
}
