import React from "react";

const Footer = () => {
  return (
    <div className="bg-[black] text-white">
      <div className=" md:flex md:justify-between md:items-center sm:px-12 px-4 bg-blue-700 py-7">
        <h1 className=" lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[#56d879] ">Subscribe</span> us for get news
          <br />
          events and offers
        </h1>
        <div>
          {" "}
          <input
            type="text"
            required
            placeholder=" Enter Your email..."
            className="text-gray-800 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
