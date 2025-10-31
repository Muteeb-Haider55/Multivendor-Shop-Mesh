import React from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data.js";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  return (
    <div className={` block 800px:${styles.noramlFlex} justify-center mt-3`}>
      {navItems &&
        navItems.map((i, index) => (
          <div key={index} className="flex">
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? "800px:text-green-500 text-green-600 "
                  : "text-black "
              } font-[500] px-6 cursor-pointer m-auto pb-4`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
