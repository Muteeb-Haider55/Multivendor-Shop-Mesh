import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import styles from "../../styles/styles";

const WithdrawMoney = () => {
  const dispatch = useDispatch();
  const [deliveredOrders, setDeliveredOrders] = useState();

  const { seller } = useSelector((state) => state.seller);

  const { orders } = useSelector((state) => state.orders);
  useEffect(() => {
    dispatch(getAllOrderOfShop(seller._id));
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id]);
  useEffect(() => {
    if (orders) {
      const orderData =
        orders && orders.filter((item) => item.status === "Delivered");
      setDeliveredOrders(orderData);
    }
  }, [orders]);
  const totalEarningWithoutTax =
    deliveredOrders &&
    deliveredOrders.reduce((acc, item) => acc + item.totalPrice, 0);

  const serviceCharges = totalEarningWithoutTax * 0.1;

  const availableBalance = totalEarningWithoutTax - serviceCharges.toFixed(2);

  return (
    <div className=" w-full h-[90vh] p-8">
      <div className=" w-full bg-white h-full rounded flex items-center justify-center flex-col">
        <h5 className="text-[20px] pb-4">
          Available Balance ${availableBalance}
        </h5>
        <div className={`${styles.button} text-white !rounded-[4px] !h-[42px]`}>
          Withdraw
        </div>
      </div>
    </div>
  );
};

export default WithdrawMoney;
