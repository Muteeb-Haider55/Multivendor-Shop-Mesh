import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../../server";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";
const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);

  return (
    <div
      className=" fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10
   "
    >
      <div className=" fixed top-0 right-0 h-full w-[90%] 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="w-full flex justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className=" cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5>Wishlist is empty! </h5>
          </div>
        ) : (
          <>
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
                <h5 className="pl-2 text-[20px] font-[500]">
                  {wishlist?.length} Items
                </h5>
              </div>
              {/* Cart Single Item */}
              <br />
              <div className=" w-full border-t">
                {wishlist &&
                  wishlist.map((i, index) => (
                    <CartSingle key={index} data={i} />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };
  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
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
    <div className=" border-b p-4   ">
      <div className=" w-full flex items-center ">
        <RxCross1
          className=" cursor-pointer"
          size={25}
          onClick={() => removeFromWishlistHandler(data)}
        />

        <img
          src={
            data?.images && data.images[0]
              ? typeof data.images[0] === "string"
                ? `${backend_url}/${data.images[0]}`
                : data.images[0].url
              : ""
          }
          alt=""
          className="w-[80px] h-[80px] ml-2"
        />
        <div className=" pl-[5px] w-full">
          <h1>
            {data?.name.length > 30
              ? data.name.slice(0, 30) + "..."
              : data.name}
          </h1>

          <h4 className=" font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            $ {data.discountPrice}
          </h4>
        </div>
        <div className="">
          <BsCartPlus
            size={20}
            className=" cursor-pointer"
            title="add to cart"
            onClick={() => addToCartHandler(data._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
