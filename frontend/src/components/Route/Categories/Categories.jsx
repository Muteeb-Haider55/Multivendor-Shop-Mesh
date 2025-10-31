import React from "react";
import styles from "../../../styles/styles";
import { brandingData, categoriesData } from "../../../static/data";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`w-full flex justify-between   shadow-sm p-5 rounded-md mb-5  mt-5`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div
                className={`   shadow-sm bg-white px-5 py-10 rounded-md ml-2 cursor-pointer hover:shadow-md transition-transform transform hover:-translate-y-1 duration-300 `}
              >
                <div className="flex items-start" key={index}>
                  {i.icon}
                  <div className="px-3">
                    <h3 className="font-bold text-sm md:text-base">
                      {i.title}
                    </h3>
                    <p className="text-xs md:text-sm">{i.Description}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className={`${styles.section} p-6 rounded-lg mb-12`} id="categories">
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap[30px]">
          {categoriesData &&
            categoriesData.map((i) => {
              const handeSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  className="  flex items-center justify-between cursor-pointer overflow-hidden rounded-full p-8 bg-white shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 duration-300 "
                  key={i.id}
                  onClick={() => handeSubmit(i)}
                >
                  <h5 className={`text-[15px] leading-[1.3]`}>{i.title}</h5>
                  <img
                    src={i.image_Url}
                    className="w-[60px] object-cover"
                    alt=""
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
