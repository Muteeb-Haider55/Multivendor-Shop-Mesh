import React from "react";
import styles from "../../../styles/styles";
import CountDown from "./CountDown.jsx";
const EventCard = () => {
  return (
    <div className={` w-full bg-white block rounded-lg 800px:flex p-2 mb-12`}>
      <div className=" w-full  lg:w-[50%] m-auto">
        <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
      </div>
      <div className=" w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>Iphone 14pro max 8/256gb</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium
          sit iste dolorum. Fugit delectus incidunt earum voluptatum provident
          possimus repellendus facilis, iusto nesciunt aperiam, facere, nulla
          fugiat dolore quia maiores. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Numquam velit porro consequuntur voluptates facilis
          suscipit repudiandae recusandae labore voluptatem. Velit quis modi
          totam non at atque deleniti, ex placeat quos.
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className=" font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              1099$
            </h5>
            <h5 className=" font-bold text-[20px] font-Roboto text-[#333]">
              999$
            </h5>
          </div>
          <div className=" rounded items-center  mt-2 mr-2 text-center  text-white bg-green-400 pr-3 font-[400] text-[17px] ">
            <span
              className=" ml-2
            "
            >
              120 sold
            </span>
          </div>
        </div>
        <CountDown />
      </div>
    </div>
  );
};

export default EventCard;
