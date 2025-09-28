import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderOfShop } from "../../redux/actions/order";
import { backend_url, server } from "../../../server";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.orders);
  const { id } = useParams();
  const data = orders && orders.find((item) => item._id === id);

  const { seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(getAllOrderOfShop(seller._id));
  }, [dispatch]);
  useEffect(() => {
    if (data?.status) {
      setStatus(data.status);
    }
  }, [data?.status]);
  const orderUpdateHandle = async () => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(getAllOrderOfShop(seller._id));

        toast.success("Order Updated");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const refundOrderUpdateHandler = async () => {
    await axios
      .put(
        `${server}/order-refund-success/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order Updated");
        navigate("/dashboard-orders");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className={`${styles.section}`}>
      <div className=" w-full flex items-center justify-between">
        <div className=" flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className=" pl-2 tex-[25px]">Order Details</h1>
        </div>
        <Link to={`/dashboard-orders`}>
          <div
            className={`${styles.button} !rounded-[4px] font-[600] h-[45px] text-white text-[18px]`}
          >
            Order List
          </div>
        </Link>
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
          <div className=" w-full flex items-start mb-5">
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
          </div>
        ))}
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
          {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not paid"}
        </div>
      </div>
      <br />
      <br />
      <h4 className=" pt-3 text-[20px] font-[600] "> Order Status</h4>

      {data?.status !== "processing refund" &&
      data?.status !== "Refund Success" ? (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
        >
          {[
            "processing",
            "Transfered to delivery partener",
            "shipping",
            "received",
            "On the way",
            "Delivered",
          ]
            .slice(
              [
                "processing",
                "Transfered to delivery partener",
                "shipping",
                "received",
                "On the way",
                "Delivered",
              ].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
        </select>
      ) : null}

      {data?.status === "processing refund" ||
      data?.status === "Refund Success" ? (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
        >
          {["processing refund", "Refund Success"]
            .slice(
              ["processing refund", "Refund Success"].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
        </select>
      ) : null}

      <div
        onClick={
          data?.status !== "processing refund"
            ? orderUpdateHandle
            : refundOrderUpdateHandler
        }
        className={`${styles.button} !rounded-[4px] font-[600] h-[45px] text-white text-[18px]`}
      >
        Update Status
      </div>
    </div>
  );
};

export default OrderDetails;
