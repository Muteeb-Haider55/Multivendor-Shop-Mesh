import React from "react";
import DashboardHeader from "../../components/shop/Layout/DashboardHeader";

import DashboardSideBar from "../../components/shop/Layout/DashboardSideBar";
import AllProducts from "../../components/shop/AllProducts.jsx";

const ShopAllProduct = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex  justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={3} setActive />
        </div>
        <div className=" w-full justify-center flex">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default ShopAllProduct;
