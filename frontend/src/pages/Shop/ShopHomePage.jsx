import React from "react";
import styles from "../../styles/styles";
import ShopInfo from "../../components/shop/ShopInfo.jsx";
import ShopProfileData from "../../components/shop/ShopProfileData.jsx";
import Breadcrumb from "../../components/Layout/Breadcrumb.jsx";

const ShopHomePage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <Breadcrumb />
      <div className=" w-full flex py-10 justify-between ">
        <div className=" w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
          <ShopInfo isOwner={true} />
        </div>
        <div className=" w-[72%] arounded-[4px]">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
