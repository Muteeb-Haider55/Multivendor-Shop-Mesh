import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { HiOutlineReceiptRefund } from "react-icons/hi";

import { DataGrid } from "@mui/x-data-grid";

import { getAllOrderOfUser } from "../../../redux/actions/order";
import Loader from "../../Layout/Loader";
const AllRefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders, isLoading } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrderOfUser(user._id));
  }, [dispatch]);
  const eligibleOrder =
    orders && orders.filter((item) => item.status === "processing refund");

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 30,
      flex: 0.1,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.1,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 30,
      flex: 0.7,
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
                <HiOutlineReceiptRefund size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  eligibleOrder &&
    eligibleOrder.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="pl-8 pt-1">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={20}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllRefundOrders;
