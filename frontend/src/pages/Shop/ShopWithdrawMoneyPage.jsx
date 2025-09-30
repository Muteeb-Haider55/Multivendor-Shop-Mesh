import React from "react";
import DashboardHeader from "../../components/shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/shop/Layout/DashboardSideBar";
import WithdrawMoney from "../../components/shop/WithdrawMoney.jsx";

const ShopWithdrawMoneyPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={7} />
        </div>
        <div className="w-full justify-center flex">
          <WithdrawMoney />
        </div>
      </div>
    </div>
  );
};

export default ShopWithdrawMoneyPage;
