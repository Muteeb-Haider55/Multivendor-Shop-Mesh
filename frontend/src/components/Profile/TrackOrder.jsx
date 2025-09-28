import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrderOfUser } from "../../redux/actions/order";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getAllOrderOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      {data && (
        <>
          {data.status === "processing" && (
            <div className="text-center text-[20px]">
              Your order is processing in shop
            </div>
          )}
          {data.status === "shipping" && (
            <div className="text-center text-[20px]">
              Your order is on the way
            </div>
          )}
          {data.status === "Delivered" && (
            <div className="text-center text-[20px]">
              Your order has been delivered 🎉
            </div>
          )}
          {data.status === "processing refund" && (
            <div className="text-center text-[20px]">
              Your order has been processing refund
            </div>
          )}
          {data.status === "Transfered to delivery partener" && (
            <div className="text-center text-[20px]">
              Your order has been Transfered to delivery partener 🎉
            </div>
          )}
          {data.status === "On the way" && (
            <div className="text-center text-[20px]">
              Your order is On the way
            </div>
          )}
          {data.status === "Refund Success" && (
            <div className="text-center text-[20px]">
              Your order Refund Successfully
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TrackOrder;
