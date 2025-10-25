import React from 'react'
import Navbar from "@/Component/Navbar.jsx";
import Hero from "@/Component/Hero.jsx";
import ProductSection from "@/Component/ProductSection.jsx";
import {InfiniteMovingCardsDemo} from "@/Component/nfiniteMovingCardsDemo.jsx";
import Footer from "@/Component/Footer.jsx";

const Home = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <ProductSection />
            <InfiniteMovingCardsDemo />
            <Footer />
        </div>
    )
}
export default Home
