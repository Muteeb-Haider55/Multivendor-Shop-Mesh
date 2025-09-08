import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
const Wishlist = ({ setOpenWishlist }) => {
  const cartData = [
    {
      name: "iphone 14 pro max 256 ssd and 8gb ram silver color",
      description: "random text",
      price: 679,
    },
    {
      name: "iphone 14 pro max 256 ssd and 8gb ram silver color",
      description: "random text",
      price: 590,
    },
    {
      name: "iphone 14 pro max 256 ssd and 8gb ram silver color",
      description: "random text",
      price: 520,
    },
  ];
  console.log("clicked");

  return (
    <div
      className=" fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10
   "
    >
      <div className=" fixed top-0 right-0 h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        <div className="flex-1 overflow-y-auto">
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              onClick={() => setOpenWishlist(false)}
              className=" cursor-pointer"
            />
          </div>
          {/* Item length */}
          <div className={`${styles.noramlFlex} p-4`}>
            <AiOutlineHeart size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">3 Items</h5>
          </div>
          {/* Cart Single Item */}
          <br />
          <div className=" w-full border-t">
            {cartData &&
              cartData.map((i, index) => <CartSingle key={index} data={i} />)}
          </div>
        </div>
        <div className="px-5 mb-3"></div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;
  return (
    <div className=" border-b p-4   ">
      <div className=" w-full flex items-center ">
        <RxCross1 className=" cursor-pointer" size={25} />

        <img
          src="https://media.istockphoto.com/id/483960103/photo/blank-black-t-shirt-front-with-clipping-path.jpg?s=612x612&w=0&k=20&c=d8qlXILMYhugXGw6zX7Jer2SLPrLPORfsDsfRDWc-50="
          alt=""
          className="w-[80px] h-[80px] ml-2"
        />
        <div className=" pl-[5px]">
          <h1>{data.name}</h1>

          <h4 className=" font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US $ {totalPrice}
          </h4>
        </div>
        <div className="">
          <BsCartPlus
            size={20}
            className=" cursor-pointer"
            titl="ass to cart"
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
