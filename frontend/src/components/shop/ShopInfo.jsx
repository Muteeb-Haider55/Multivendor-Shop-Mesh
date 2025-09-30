import React, { useEffect, useState } from "react";

import { backend_url, server } from "../../../server";

import styles from "../../styles/styles";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Loader from "../Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { products } = useSelector((state) => state.product);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));

    setIsLoading(true);
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

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);
  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );
  const averageRating = totalRatings / totalReviewsLength || 0;

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
            <h5 className="font-[600]">Total products</h5>
            <h4 className=" text-[#0000006a]">{products?.length}</h4>
          </div>
          <div className=" p-3 ">
            <h5 className="font-[600]">Shop Rating</h5>
            <h4 className=" text-[#0000006a]">{averageRating}/5</h4>
          </div>
          <div className=" p-3 ">
            <h5 className="font-[600]">Joined On</h5>
            <h4 className=" text-[#0000006a]">
              {data?.createdAt?.slice(0, 10)}
            </h4>
          </div>
          {isOwner && (
            <div className=" py-3 px-4 ">
              <Link to="/dashboard-profile-setting">
                <div
                  className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                >
                  <span className=" text-white">Edit Shop</span>
                </div>
              </Link>
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
