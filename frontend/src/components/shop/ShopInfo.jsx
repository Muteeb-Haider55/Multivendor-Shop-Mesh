import React from "react";
import { useSelector } from "react-redux";
import { backend_url, server } from "../../../server";

import styles from "../../styles/styles";
import axios from "axios";
import { toast } from "react-toastify";

const ShopInfo = ({ isOwner }) => {
  const { seller } = useSelector((state) => state.seller);
  const logoutHandler = async () => {
    await axios.get(`${server}/shop/logout`, {
      withCredentials: true,
    });

    window.location.reload();
  };
  return (
    <div className="">
      <div className=" w-full py-5">
        <div className=" w-full flex items-center justify-center ">
          <img
            src={`${backend_url}/${seller?.avatar}`}
            alt=""
            className="w-[150px] h-[150px] object-cover rounded-full"
          />
        </div>
        <h3 className=" text-center py-2 text-[20px]">{seller.name}</h3>
        <p className=" text-[16px] text-[#000000a6] p-[10px] ">
          {seller.description}
        </p>
      </div>
      <div className=" p-3 ">
        <h5 className="font-[600]">Address</h5>
        <h4 className=" text-[#0000006a]">{seller.address}</h4>
      </div>
      <div className=" p-3 ">
        <h5 className="font-[600]">Phone Number</h5>
        <h4 className=" text-[#0000006a]">{seller.phoneNumber}</h4>
      </div>
      <div className=" p-3 ">
        <h5 className="font-[600]">Total Products</h5>
        <h4 className=" text-[#0000006a]">10</h4>
      </div>
      <div className=" p-3 ">
        <h5 className="font-[600]">Shp Rating</h5>
        <h4 className=" text-[#0000006a]">4/5</h4>
      </div>
      <div className=" p-3 ">
        <h5 className="font-[600]">Joined On</h5>
        <h4 className=" text-[#0000006a]">{seller.createdAt.slice(0, 10)}</h4>
      </div>
      {isOwner && (
        <div className=" py-3 px-4 ">
          <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
            <span className=" text-white">Edit Shop</span>
          </div>
          <div
            className={`${styles.button} bg-red-500 !w-full !h-[42px] !rounded-[5px]`}
            onClick={logoutHandler}
          >
            <span className=" text-white">Log Out</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopInfo;
