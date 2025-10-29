import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderOfShop } from "../../redux/actions/order";
import { server } from "../../../server";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.orders);
  const { id } = useParams();
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  const data = orders?.find((item) => item._id === id);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllOrderOfShop(seller._id));
    }
  }, [dispatch, seller?._id]);

  useEffect(() => {
    if (data?.status) {
      setStatus(data.status);
    }
  }, [data?.status]);

  const orderUpdateHandle = async () => {
    try {
      await axios.put(
        `${server}/order/update-order-status/${id}`,
        { status },
        { withCredentials: true }
      );
      toast.success("Order status updated!");
      dispatch(getAllOrderOfShop(seller._id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update order.");
    }
  };

  const refundOrderUpdateHandler = async () => {
    try {
      await axios.put(
        `${server}/order/order-refund-success/${id}`,
        { status },
        { withCredentials: true }
      );
      toast.success("Refund status updated!");
      navigate("/dashboard-orders");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update refund.");
    }
  };

  // status arrays
  const orderStatusOptions = [
    "processing",
    "Transfered to delivery partener",
    "shipping",
    "received",
    "On the way",
    "Delivered",
  ];
  const refundStatusOptions = ["processing refund", "Refund Success"];

  const filteredStatusOptions = (statusList, currentStatus) => {
    const currentIndex = statusList.indexOf(currentStatus);
    return currentIndex !== -1 ? statusList.slice(currentIndex) : statusList;
  };
  console.log("helllo");

  return (
    <div className={`${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px] font-semibold">Order Details</h1>
        </div>
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} !rounded-[4px] font-[600] h-[45px] text-white text-[18px]`}
          >
            Order List
          </div>
        </Link>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#a2a3a2]">
          Order ID: <span>{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#a2a3a2]">
          Placed On:{" "}
          <span>{data?.paymentInfo?.createdAt?.slice(0, 10) || "N/A"}</span>
        </h5>
      </div>

      <br />

      {data?.cart?.map((item, index) => (
        <div key={index} className="w-full flex items-start mb-5">
          <img
            src={item.images[0].url}
            alt={item.name}
            className="w-[80px] h-[80px] object-cover"
          />

          <div className="w-full">
            <h5 className="pl-3 text-[20px] font-medium">{item.name}</h5>
            <h5 className="pl-3 text-[18px] text-gray-600">
              US ${item.discountPrice} × {item.qty}
            </h5>
          </div>
        </div>
      ))}

      <div className="border-t w-full flex justify-end">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>US$ {data?.totalPrice}</strong>
        </h5>
      </div>

      <br />

      <div className="w-full 800px:flex items-start justify-between">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address</h4>
          <h4 className="pt-3 text-[18px]">
            {data?.shippingAddress?.address1}{" "}
            {data?.shippingAddress?.address2
              ? `, ${data.shippingAddress.address2}`
              : ""}
          </h4>
          <h4 className="text-[18px]">{data?.shippingAddress?.city}</h4>
          <h4 className="text-[18px]">{data?.shippingAddress?.country}</h4>
          <h4 className="text-[18px]">{data?.user?.phoneNumber}</h4>
        </div>

        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px] font-[600]">Payment Info</h4>
          <p className="text-[18px]">
            {data?.paymentInfo?.status || "Not Paid"}
          </p>
        </div>
      </div>

      <br />
      <h4 className="pt-3 text-[20px] font-[600]">Order Status</h4>

      {data?.status !== "processing refund" &&
      data?.status !== "Refund Success" ? (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[220px] mt-3 border h-[40px] rounded-[6px] px-2"
        >
          {filteredStatusOptions(orderStatusOptions, data?.status).map(
            (option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            )
          )}
        </select>
      ) : (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[220px] mt-3 border h-[40px] rounded-[6px] px-2"
        >
          {filteredStatusOptions(refundStatusOptions, data?.status).map(
            (option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            )
          )}
        </select>
      )}

      <div
        onClick={
          data?.status !== "processing refund"
            ? orderUpdateHandle
            : refundOrderUpdateHandler
        }
        className={`${styles.button} !rounded-[4px] font-[600] h-[45px] text-white text-[18px] mt-5`}
      >
        Update Status
      </div>
    </div>
  );
};

export default OrderDetails;
