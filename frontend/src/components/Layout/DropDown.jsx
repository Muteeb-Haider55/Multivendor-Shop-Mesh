import React from "react";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data.js";
import styles from "../../styles/styles";

const DropDown = ({ categories, setDropDown }) => {
  const navigat = useNavigate();
  const submitHandle = (i) => {
    navigat(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };
  return (
    <div className=" pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className={`${styles.noramlFlex}`}
            onClick={() => {
              submitHandle(i);
            }}
          >
            <img
              src={i.image_Url}
              alt=""
              className=" h-[25px] w-[25px] ml-2.5  select-none object-contain"
            />
            <h3 className="cursor-pointer m-3 select-none">{i.title}</h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
