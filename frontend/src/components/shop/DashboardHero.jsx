import React, { useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrderOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);
  const [deliveredOrders, setDeliveredOrders] = useState();
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

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: "action",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <div className=" w-full p-8 ">
      <h3 className="font-Poppins text-[22apx] pb-1 ">Overview</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className=" w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect size={30} className="mr-2 fill-green-500" />
            <h3
              className={`${styles.productTitle} !text-[16px]  leading-5 !font-[400] text-slate-600 `}
            >
              Account Balance
              <span className="text-[14px]"> (with 10% service charge)</span>
            </h3>
          </div>
          <h5 className=" pt-2 pl-[36px] text-[22px] font-[500]">
            ${availableBalance}
          </h5>
          <Link to={`/dashboard-withdraw-money`}>
            <h5 className=" pt-5 pl-2 text-green-500">Withdraw Money</h5>
          </Link>
        </div>

        <div className=" w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2 fill-green-500" />
            <h3
              className={`${styles.productTitle} !text-[16px]  leading-5 !font-[400] text-slate-600 `}
            >
              All Orders
            </h3>
          </div>
          <h5 className=" pt-2 pl-[36px] text-[22px] font-[500]">
            {orders && orders.length}
          </h5>
          <Link to={`/dashboard-orders`}>
            <h5 className=" pt-5 pl-2 text-green-500">View Orders</h5>
          </Link>
        </div>

        <div className=" w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect size={30} className="mr-2 fill-green-500" />
            <h3
              className={`${styles.productTitle} !text-[16px]  leading-5 !font-[400] text-slate-600 `}
            >
              All Products
            </h3>
          </div>
          <h5 className=" pt-2 pl-[36px] text-[22px] font-[500]">
            {products && products.length}
          </h5>
          <Link to={`/dashboard-products`}>
            <h5 className=" pt-5 pl-2 text-green-500">View Products</h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className=" font-Poppins text-[22px] pb-1">Latest Order</h3>
      <div className=" w-full min-h-[43vh] bg-white rounded">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default DashboardHero;
