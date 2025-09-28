import React from "react";
import Header from "../components/Layout/Header";
import UserOrderDeails from "../components/UserOrderDeails.jsx";
import Footer from "../components/Layout/Footer/Footer.jsx";
const OrderDetailsPage = () => {
  return (
    <div>
      <Header />
      <UserOrderDeails />
      <Footer />
    </div>
  );
};

export default OrderDetailsPage;
