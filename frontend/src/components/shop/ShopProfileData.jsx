import React, { useEffect, useState } from "react";
import ProductCard from "../Route/ProductCard/ProductCard";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.product);
  const { events } = useSelector((state) => state.events);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [active, setActive] = useState(1);
  useEffect(() => {
    dispatch(getAllProductsShop(id));
  }, [dispatch]);
  console.log(products);
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
            <div className="flex">
              <Link to="/dashboard">
                <div className={`${styles.button} !rounded-[4px] !h-[42px]`}>
                  <span className=" text-white">Go Dashboard</span>
                </div>
              </Link>
              <Link to={`/`}>
                <div
                  className={`${styles.button} !rounded-[4px] !h-[42px]  ml-1`}
                >
                  <span className="text-white">Back to Home</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      <br />
      {active == 1 ? (
        <div className=" grid grid-cols-1 gap-[20] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
          {products &&
            products.map((i, index) => (
              <ProductCard data={i} key={index} isShop={true} />
            ))}
        </div>
      ) : null}
      {active == 2 ? (
        <div className=" grid grid-cols-1 gap-[20] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
          {events &&
            events.map((i, index) => (
              <ProductCard data={i} key={index} isShop={true} />
            ))}
        </div>
      ) : null}
    </div>
  );
};

export default ShopProfileData;
