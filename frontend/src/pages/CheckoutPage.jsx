import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer/Footer";
import Checkout from "../components/Checkout/Checkout.jsx";
import CheckoutSteps from "../components/Checkout/CheckoutSteps.jsx";

const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <CheckoutSteps />

      <Checkout />
      <Footer />
    </div>
  );
};

export default CheckoutPage;
