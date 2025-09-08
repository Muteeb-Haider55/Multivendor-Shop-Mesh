import React from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data.js";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  return (
    <div className={` block 800px:${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div key={index} className="flex">
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? "800px:text-green-800 text-green-600 "
                  : "text-black 800px:text-white "
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
