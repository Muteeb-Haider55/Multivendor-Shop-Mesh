import React, { useEffect, useState } from "react";

import { backend_url, server } from "../../../server";

import styles from "../../styles/styles";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../Layout/Loader";
import { useDispatch } from "react-redux";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, []);
  const logoutHandler = async () => {
    await axios.get(`${server}/shop/logout`, { withCredentials: true });
    window.location.reload();
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="">
          <div className=" w-full py-5">
            <div className=" w-full flex items-center justify-center ">
              <img
                src={`${backend_url}/${data?.avatar}`}
                alt=""
                className="w-[150px] h-[150px] object-cover rounded-full"
              />
            </div>
            <h3 className=" text-center py-2 text-[20px]">{data.name}</h3>
            <p className=" text-[16px] text-[#000000a6] p-[10px] ">
              {data.description}
            </p>
          </div>
          <div className=" p-3 ">
            <h5 className="font-[600]">Address</h5>
            <h4 className=" text-[#0000006a]">{data.address}</h4>
          </div>
          <div className=" p-3 ">
            <h5 className="font-[600]">Phone Number</h5>
            <h4 className=" text-[#0000006a]">{data.phoneNumber}</h4>
          </div>
          <div className=" p-3 ">
            <h5 className="font-[600]">Total data</h5>
            <h4 className=" text-[#0000006a]">10</h4>
          </div>
          <div className=" p-3 ">
            <h5 className="font-[600]">Shp Rating</h5>
            <h4 className=" text-[#0000006a]">4/5</h4>
          </div>
          <div className=" p-3 ">
            <h5 className="font-[600]">Joined On</h5>
            <h4 className=" text-[#0000006a]">
              {data?.createdAt?.slice(0, 10)}
            </h4>
          </div>
          {isOwner && (
            <div className=" py-3 px-4 ">
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
              >
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
      )}
    </>
  );
};

export default ShopInfo;
