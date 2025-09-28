import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

const Rating = ({ ratings }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= ratings) {
      stars.push(
        <AiFillStar
          key={i}
          size={20}
          color="#f6b100"
          className="mr-2 cursor-pointer"
        />
      );
    } else if (i === Math.ceil(ratings) && !Number.isInteger(ratings)) {
      stars.push(
        <BsStarHalf
          key={i}
          size={17}
          color="#f6b100"
          className="mr-2 cursor-pointer"
        />
      );
    } else {
      stars.push(
        <AiOutlineStar
          key={i}
          size={20}
          color="#f6b100"
          className="mr-2 cursor-pointer"
        />
      );
    }
  }
  return <div className=" flex ">{stars}</div>;
};

export default Rating;
