import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer/Footer";
import { act } from "react";
import styles from "../styles/styles";
import { HiX } from "react-icons/hi";
import { FaPlus } from "react-icons/fa";

const FAQPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <FAQ />
      <Footer />
    </div>
  );
};
const FAQ = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    if (activeTab === tab) {
      setActiveTab(0);
    } else {
      setActiveTab(tab);
    }
  };
  return (
    <div className={`${styles.section} my-8`}>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ</h2>
      <div className=" mx-auto space-y-4">
        {/* Single Faq */}

        <div className=" border-b border-gray-200 pb-4">
          <button
            onClick={() => toggleTab(1)}
            className=" flex items-center justify-between w-full"
          >
            <span className=" text-lg font-medium text-gray-900">
              How do I track my order?
            </span>
            {activeTab === 1 ? <HiX size={25} /> : <FaPlus size={20} />}
          </button>
          {activeTab === 1 && (
            <div className=" mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
              ipsum unde debitis fugit at. Reiciendis, explicabo suscipit?
              Commodi dolorum doloremque saepe libero sed mollitia dolore nisi,
              et repellat in est.
            </div>
          )}
        </div>

        <div className=" border-b border-gray-200 pb-4">
          <button
            onClick={() => toggleTab(2)}
            className=" flex items-center justify-between w-full"
          >
            <span className=" text-lg font-medium text-gray-900">
              What is your return policy?
            </span>
            {activeTab === 2 ? <HiX size={25} /> : <FaPlus size={20} />}
          </button>
          {activeTab === 2 && (
            <div className=" mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
              ipsum unde debitis fugit at. Reiciendis, explicabo suscipit?
              Commodi dolorum doloremque saepe libero sed mollitia dolore nisi,
              et repellat in est.
            </div>
          )}
        </div>

        <div className=" border-b border-gray-200 pb-4">
          <button
            onClick={() => toggleTab(3)}
            className=" flex items-center justify-between w-full"
          >
            <span className=" text-lg font-medium text-gray-900">
              How do I contact customer support?
            </span>
            {activeTab === 3 ? <HiX size={25} /> : <FaPlus size={20} />}
          </button>
          {activeTab === 3 && (
            <div className=" mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
              ipsum unde debitis fugit at. Reiciendis, explicabo suscipit?
              Commodi dolorum doloremque saepe libero sed mollitia dolore nisi,
              et repellat in est.
            </div>
          )}
        </div>

        <div className=" border-b border-gray-200 pb-4">
          <button
            onClick={() => toggleTab(4)}
            className=" flex items-center justify-between w-full"
          >
            <span className=" text-lg font-medium text-gray-900">
              Can I change or cancel my order?
            </span>
            {activeTab === 4 ? <HiX size={25} /> : <FaPlus size={20} />}
          </button>
          {activeTab === 4 && (
            <div className=" mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
              ipsum unde debitis fugit at. Reiciendis, explicabo suscipit?
              Commodi dolorum doloremque saepe libero sed mollitia dolore nisi,
              et repellat in est.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
