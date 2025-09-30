import React from "react";
import styles from "../../../styles/styles";
import CountDown from "./CountDown.jsx";
import { backend_url } from "../../../../server.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart.js";
const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addToCartHandler = (data) => {
    const isItemExist = cart && cart.find((i) => i._id === data._id);
    if (isItemExist) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully");
      }
    }
  };
  return (
    <div
      className={` w-full bg-white block rounded-lg ${
        active ? "unset" : "mb-12"
      } 800px:flex p-2 `}
    >
      <div className=" w-full  lg:w-[50%] m-auto">
        <img
          src={`${backend_url}/${data?.images[0]}`}
          className="800px:w-[2000px] 800px:max-h-[450px] rounded-[20px] p-4"
          alt=""
        />
      </div>
      <div className=" w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle} `}> {data?.name}</h2>
        <p>{data?.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className=" font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data?.discountPrice}
            </h5>
            <h5 className=" font-bold text-[20px] font-Roboto text-[#333]">
              {data?.originalPrice}
            </h5>
          </div>
          <div className=" rounded items-center  mt-2 mr-2 text-center  text-white bg-green-400 pr-3 font-[400] text-[17px] ">
            <span
              className=" ml-2
            "
            >
              120 sold
            </span>
          </div>
        </div>

        <CountDown data={data} />
        <br />
        <div className=" flex items-center ">
          <Link to={`/products/${data?._id}?isEvent=true`}>
            <div className={`${styles.button} text-white !rounded-[4px]`}>
              See Details
            </div>
          </Link>

          <div
            onClick={() => addToCartHandler(data)}
            className={`${styles.button} text-white ml-4 !rounded-[4px]`}
          >
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
