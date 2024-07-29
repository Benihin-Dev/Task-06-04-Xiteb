import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../navBar/NavBar";
import Hero from "../hero/Hero";
import About from "../about/About";
import Banner from "../offerBanner/Banner";
import ProductSlider from "../productSlider/ProductSlider";
import Organic from "../organic/Organic";
import Footer from "../footer/Footer";
import Menu from "../menu/Menu";

export default function HomePage() {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [productData, setProductData] = useState({});

  // just fetch 20 product details using fake api, but not use them for any development
  const getProductDetails = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      if (response.status === 200) {
        setProductData(response.data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      console.log("Success");
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div>
      {scrollDirection === "up" ? (
        <div className="slideDown w-full z-40   fixed top-0 left-0 right-0">
          <NavBar />
        </div>
      ) : (
        ""
      )}
      <Hero />
      <About />
      <Menu />
      <Banner />
      <Organic />
      <ProductSlider />
      <Footer />
    </div>
  );
}
