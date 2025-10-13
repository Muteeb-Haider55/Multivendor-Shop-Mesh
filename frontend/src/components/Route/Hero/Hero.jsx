import React from "react";
import styles from "../../../styles/styles";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className={` relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex} `}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-1.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          TIMELESS TOUCHES <br />
          FOR YOUR SPACE
        </h1>
        <p className=" pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Welcome to your one-stop online marketplace, where countless sellers
          come together to offer an endless variety of products across all
          categories. From fashion and electronics to home essentials and more,
          enjoy seamless shopping, secure payments, and fast delivery.
        </p>
        <Link to="/products" className=" inline-block">
          <div className={`${styles.button}  !rounded-[4px] mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
