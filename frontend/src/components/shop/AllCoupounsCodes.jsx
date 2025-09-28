import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";

import { DataGrid } from "@mui/x-data-grid";
import { deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";

const AllCoupounsCodes = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProduct,
          value,
          shop: seller,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Coupon Created Successfully!");
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [value, setValue] = useState("");
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);
  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/coupon/delete-coupon/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupons(res.data.couponCodes);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  const columns = [
    { field: "name", headerName: "Name", minWidth: 180, flex: 0.9 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.9 },

    {
      field: "Delete",
      headerName: "Delete",
      minWidth: 120,
      flex: 0.9,

      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];
  const row = [];
  coupons &&
    coupons.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + " %",
      });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full">
            <div
              onClick={() => setOpen(true)}
              className={`${styles.button} !rounded-[4px] !w-[180px] ml-[78%]`}
            >
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          {open && (
            <div className=" fixed top-0 left-0 w-full h-screen bg-[#0000006f] z-[2000] flex items-center justify-center ">
              <div className="800px:w-[40%] w-[90%] h-[80vh] bg-white rounded-md shadow p-4 overflow-y-scroll ">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-[30px] font-[Poppins] text-center">
                  Create Coupon Code
                </h5>
                <form
                  onSubmit={handleSubmit}
                  aria-required={true}
                  className="font-[Poppins]"
                >
                  <br />
                  <div>
                    <label className="pb-2">
                      Name <span className="text-red-500"> *</span>
                    </label>
                    <input
                      required
                      className={`${styles.input} mt-2  block w-full px-3 rounded-md border-[2px] placeholder-grey-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm `}
                      placeholder="Enter Coupon Code Name"
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Discount Percentage
                      <span className="text-red-500"> *</span>
                    </label>
                    <input
                      className={`${styles.input} mt-2  block w-full px-3 rounded-md border-[2px] placeholder-grey-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm `}
                      placeholder="Enter Discount Percentage Value"
                      type="number"
                      required
                      name="value"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Min Amount</label>
                    <input
                      className={`${styles.input} mt-2  block w-full px-3 rounded-md border-[2px] placeholder-grey-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm `}
                      placeholder="Enter Coupon Code Min Amount"
                      type="number"
                      name="maxAmount"
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Max Amount</label>
                    <input
                      className={`${styles.input} mt-2  block w-full px-3 rounded-md border-[2px] placeholder-grey-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm `}
                      placeholder="Enter Coupon Code Max Amount"
                      type="number"
                      name="minAmount"
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value)}
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Selected Products <span className="text-red-500"> *</span>
                    </label>
                    <select
                      name=""
                      id=""
                      className={`  border-gray-200 border-[2px]  w-full  h-[35px] rounded-[5px] cursor-pointer`}
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                      <option value="Choose Your Selected products">
                        Choose Your Selected product
                      </option>
                      {products &&
                        products.map((i) => (
                          <option value={i.name} key={i.name}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />
                  <div>
                    <input
                      className={`${styles.input} mt-2  block w-full px-3 rounded-md border-[2px] placeholder-grey-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm `}
                      type="submit"
                      value="Create"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupounsCodes;
