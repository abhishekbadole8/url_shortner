import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Section from "../pages/Homepage/Homepage";

export default function Layout() {
   
    return (
        <>
            <Header />
            <Section/>
            <Footer />
        </>
    )
}