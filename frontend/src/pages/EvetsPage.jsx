import React from "react";
import Header from "../components/Layout/Header";
import EventsPage from "../components/Route/Events/EventsPage.jsx";
import Footer from "../components/Layout/Footer/Footer.jsx";

const EvetsPage = () => {
  return (
    <div>
      <Header activeHeading={4} />
      <EventsPage />
      <Footer />
    </div>
  );
};

export default EvetsPage;
