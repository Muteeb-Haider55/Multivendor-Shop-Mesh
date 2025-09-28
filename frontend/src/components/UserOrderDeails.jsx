import React, { useEffect, useState } from "react";

import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/styles";
import { backend_url, server } from "../../server";
import { getAllOrderOfUser } from "../redux/actions/order";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const UserOrderDeails = () => {
  const { orders } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [comment, setComment] = useState("");

  const [rating, setRating] = useState(1);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getAllOrderOfUser(user._id));
  }, [dispatch]);
  const data = orders && orders.find((item) => item._id === id);

  const reviewHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${server}/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem._id,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrderOfUser(user._id));

        setComment("");
        setOpen(false);
        setRating(null);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const refundHandler = async () => {
    await axios
      .put(`${server}/order/order-refund/${id}`, {
        status: "processing refund",
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrderOfUser(user._id));
      })
      .catch((error) => {
        toast.error(error.res.data.message);
      });
  };
  return (
    <div className={`${styles.section}`}>
      <div className=" w-full flex items-center justify-between">
        <div className=" flex items-center mt-5">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className=" pl-2 text-[25px]">Order Details</h1>
        </div>
      </div>

      <div className=" w-full flex items-center justify-between pt-6">
        <h5 className="text-[#a2a3a2]">
          Order ID: <span>{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#a2a3a2]">
          Placed On: <span> {data?.paymentInfo?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>
      {/* order items */}
      <br />
      <br />
      {data &&
        data?.cart.map((item) => (
          <div className=" w-full 800px:flex items-start mb-5">
            <img
              src={`${backend_url}/${item.images[0]}`}
              alt=""
              className="w-[80px] h-[80px]"
            />
            <div className=" w-full">
              <h5 className="pl-3 text-[20px]">{item.name} </h5>
              <h5 className="pl-3 text-[20px]">
                US ${item.discountPrice} * {item.qty}
              </h5>
            </div>
            {data?.status === "Delivered" && (
              <div
                onClick={() => setOpen(true) || setSelectedItem(item)}
                className={`${styles.button} text-white !rounded-[4px] ${
                  item?.isReviewed ? "hidden" : ""
                } `}
              >
                Write a Review
              </div>
            )}
          </div>
        ))}
      {/* Review popup*/}
      {open && (
        <div className=" w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
          <div className="overflow-y-scroll w-[90%] 800px:w-[50%] h-[90vh] bg-[#fff] shadow rounded-md p-3 ">
            <div className=" w-full flex justify-end ">
              <RxCross1
                size={30}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <h2 className=" text-[30px] font-[500] font-Poppins text-center  ">
              Give a Review
            </h2>
            <br />
            <div className=" w-full flex">
              <img
                src={`${backend_url}/${selectedItem?.images[0]}`}
                alt=""
                className=" w-[80px] h-[80px] rounded-[5px] ml-3"
              />
              <div className="">
                <div className=" pl-3 text-[20px]">{selectedItem?.name}</div>

                <h4 className=" pl-3 text-[20px]">
                  US${selectedItem?.discountPrice} * {selectedItem?.qty}
                </h4>
              </div>
            </div>
            <br />

            {/* rating */}
            <h5 className="pl-3 pt-1 text-[20] font-[500] ">
              Give a Rating <span className="text-red-500">*</span>
            </h5>
            <div className=" flex w-full ml-2 pt-1">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer "
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer "
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>
            <br />
            <div className="w-full ml-3 ">
              <label className="block text-[20px] font-[500]">
                Write a comment
                <span className="ml-2 font-[400] text-[16px] text-[#0000007b]">
                  (optional)
                </span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                name="comment"
                rows={5}
                className="mt-2 w-full border p-2 outline-none"
                placeholder="How was your product write your expression about it"
              ></textarea>
            </div>
            <div
              onClick={rating > 1 ? reviewHandler : null}
              className={`${styles.button} !rounded-[4px] text-[20px] ml-3 text-white`}
            >
              Submit
            </div>
          </div>
        </div>
      )}
      <div className="border-t w-full flex justify-end">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong> US$ {data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex items-center">
        <div className=" w-full 800px:w-[60%]">
          <h4 className=" pt-3 text-[20px] font-[600] ">Shipping Address</h4>
          <h4 className=" pt-3 text-[20px]  ">
            {data?.shippingAddress.address1}{" "}
            {data?.shippingAddress.address2
              ? data.shippingAddress.address2
              : null}
          </h4>
          <h4 className=" text-[20px] ">{data?.shippingAddress.country}</h4>
          <h4 className=" text-[20px] ">{data?.shippingAddress.city}</h4>
          <h4 className=" text-[20px] ">{data?.user?.phoneNumber}</h4>
        </div>
        <div className=" w-full 800px:w-[40%] ">
          <h4 className=" pt-3 text-[20px] ">Payment Info</h4>
          <h4 className=" pt-3 ">
            Status:{" "}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not paid"}
          </h4>
          <br />
          {data?.status === "Delivered" && (
            <div
              onClick={refundHandler}
              className={`${styles.button}  !rounded-[4px]`}
            >
              Refund
            </div>
          )}
        </div>
      </div>
      <Link to="/">
        <div className={`${styles.button} !rounded-[4px] text-white`}>
          Send Message
        </div>
      </Link>
      <br />

      <br />
    </div>
  );
};

export default UserOrderDeails;
