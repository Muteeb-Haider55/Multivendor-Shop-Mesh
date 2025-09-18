import React, { useState } from "react";
import { productData } from "../../static/data";
import ProductCard from "../Route/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";

const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1);
  return (
    <div className=" w-full ">
      <div className=" w-full flex items-center justify-between ">
        <div className=" w-full flex">
          <div className=" flex items-center" onClick={() => setActive(1)}>
            <h5
              className={` font-[600] text-[20px] ${
                active === 1 ? "text-green-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Shop Products
            </h5>
          </div>
          <div className=" flex items-center" onClick={() => setActive(2)}>
            <h5
              className={` font-[600] text-[20px] ${
                active === 2 ? "text-green-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Running Events
            </h5>
          </div>
          <div className=" flex items-center" onClick={() => setActive(3)}>
            <h5
              className={` font-[600] text-[20px] ${
                active === 3 ? "text-green-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Running Reviews
            </h5>
          </div>
        </div>
        <div>
          {isOwner && (
            <div className="">
              <Link to="/dashboard">
                <div className={`${styles.button} !rounded-[4px] !h-[42px]`}>
                  <span className=" text-white">Go Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      <br />
      <div className=" grid grid-cols-1 gap-[20] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
        {productData &&
          productData.map((i, index) => (
            <ProductCard data={i} key={index} isShop={true} />
          ))}
      </div>
    </div>
  );
};

export default ShopProfileData;
