import React from "react";
import Header from "../components/Layout/Header.jsx";
import Hero from "../components/Route/Hero/Hero.jsx";
import Categories from "../components/Route/Categories/Categories.jsx";
import BestDeals from "../components/Route/BestDeals/BestDeals.jsx";
import FeaturedProducts from "../components/Route/FeaturedProducts/FeaturedProducts.jsx";
import Events from "../components/Route/Events/Events.jsx";
import Sponserd from "../components/Route/Sponserd/Sponserd.jsx";
import Footer from "../components/Layout/Footer/Footer.jsx";

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProducts />
      <Sponserd />
      <Footer />
    </div>
  );
};

export default HomePage;
