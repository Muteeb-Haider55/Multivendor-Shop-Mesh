import React from "react";
import DashboardHeader from "../../components/shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/shop/Layout/DashboardSideBar";
import DashboardMessages from "../../components/shop/DashboardMessages.jsx";

const ShopInboxPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex  justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={8} setActive />
        </div>
        <DashboardMessages />
      </div>
    </div>
  );
};

export default ShopInboxPage;
