import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import { productData } from "../static/data";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";

const BestSellingPage = () => {
  const { allProducts } = useSelector((state) => state.product);

  const [data, setData] = useState([]);
  useEffect(() => {
    const d =
      allProducts && [...allProducts].sort((a, b) => a.sold_out - b.sold_out);
    setData(d);
    // window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default BestSellingPage;
