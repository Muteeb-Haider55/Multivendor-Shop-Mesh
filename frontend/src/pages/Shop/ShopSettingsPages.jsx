import React from "react";
import Header from "../../components/Layout/Header";
import ShopSettings from "../../components/shop/ShopSettings.jsx";
import DashboardHeader from "../../components/shop/Layout/DashboardHeader.jsx";
import DashboardSideBar from "../../components/shop/Layout/DashboardSideBar.jsx";
const ShopSettingsPages = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={11} />
        </div>
        <div className="w-full justify-center flex">
          <ShopSettings />
        </div>
      </div>
    </div>
  );
};

export default ShopSettingsPages;
