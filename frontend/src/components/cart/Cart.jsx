import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { backend_url } from "../../../server";
import { addToCart, removeFromCart } from "../../redux/actions/cart";
const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );
  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };
  return (
    <div
      className=" fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10
   "
    >
      <div className=" fixed top-0 right-0 h-full w-[90%] 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="w-full flex justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className=" cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5>Cart is empty! </h5>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  onClick={() => setOpenCart(false)}
                  className=" cursor-pointer"
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart?.length} Items
                </h5>
              </div>
              {/* Cart Single Item */}
              <br />
              <div className=" w-full border-t">
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>
            <div className="px-5 mb-3">
              {/* Checkout button */}
              <Link to="/checkout">
                <div className=" h-[45px] flex items-center justify-center w-[100%] bg-green-600 rounded-[5px]">
                  <h1 className=" text-white text-[18px] font-[600]">
                    Checkout Now (USD $ {totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);

  const increment = (data) => {
    if (data.stock < value + 1) {
      toast.error("Product stock limited");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };
  const decrement = (data) => {
    if (value > 1) {
      setValue(value - 1);
      const updateCartData = { ...data, qty: value - 1 };
      quantityChangeHandler(updateCartData);
    } else {
      toast.error("Product quantity can't be less then 1");
    }
  };
  const totalPrice = data.discountPrice * value;

  return (
    <div className=" border-b p-4   ">
      <div className=" w-full flex items-center ">
        <div className="flex flex-col">
          <div
            className={`bg-green-600 border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer `}
            onClick={() => increment(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-2.5 "> {data.qty}</span>
          <div
            className=" bg-[#919191ea] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="white" />
          </div>
        </div>
        <img
          src={
            data?.images && data.images[0]
              ? typeof data.images[0] === "string"
                ? `${backend_url}/${data.images[0]}`
                : data.images[0].url
              : ""
          }
          alt=""
          className="w-[90px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className=" pl-[5px] w-full ">
          <h1 className="text-[13px]">
            {data?.name.length > 20
              ? data.name.slice(0, 20) + "..."
              : data.name}
          </h1>

          <h4 className=" font-[400] tetx-[12px] text-[#00000082]">
            $ {data.discountPrice} * {data.qty}
          </h4>
          <h4 className=" font-[600] text-[15px] pt-[3px] text-[#d02222] font-Roboto">
            US $ {totalPrice}
          </h4>
        </div>
        <RxCross1
          onClick={() => {
            removeFromCartHandler(data);
          }}
          className="cursor-pointer font-bold flex"
          size={25}
        />
      </div>
    </div>
  );
};

export default Cart;
