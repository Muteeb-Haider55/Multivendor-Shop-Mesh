import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";

import logo1 from "../../assets/logo123.png";

import { categoriesData, productData } from "../../static/data.js";
import { CgProfile } from "react-icons/cg";
import Cart from "../../components/cart/Cart.jsx";
import Wishlist from "../../components/wishlist/Wishlist.jsx";

import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft, BiMenuAltRight } from "react-icons/bi";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import { useSelector } from "react-redux";
import { backend_url } from "../../../server.js";
import { RxCross1 } from "react-icons/rx";
import Breadcrumb from "./Breadcrumb.jsx";

const Header = ({ activeHeading }) => {
  const { allProducts } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const { isSeller } = useSelector((state) => state.seller);

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  //for mobile Header
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section} py-4`}>
        <div className="hidden 800px:h-[50px] 800px:flex items-center justify-between">
          <div className="">
            <Link to="/">
              <img src={logo1} alt="logo" className="m-auto" />
            </Link>
          </div>
          {/* Search box */}
          <div className=" w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-green-600 border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className=" absolute min-h-[30vh] bg-slate-50 shadow-sm-2  z-[9] p-4">
                {searchData.map((i, index) => {
                  return (
                    <Link to={`/products/${i._id}`} key={index}>
                      <div className="w-full flex items-start-py-3">
                        <img
                          src={i.images[0].url}
                          alt=""
                          className="w-[40px] h-[40px]"
                        />
                        <h1>{i.name}</h1>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className={`${styles.button} bg-green-500  !rounded-[4px]`}>
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <h1 className=" flex items-center text-[#fff]">
                {isSeller ? "Go Dashboard" : "Become Seller"}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-green-500 h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* Catogories */}
          <div className="">
            <div
              onClick={() => setDropDown(!dropDown)}
              className=" relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block"
            >
              <BiMenuAltLeft size={30} className=" absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full justify-between items-center pr-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className=" absolute right-2 top-4 cursor-pointer"
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* NavItems */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>
          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineHeart
                  onClick={() => setOpenWishlist(true)}
                  size={30}
                  color={"rgb(255 255 255 / 83%)"}
                />
                <span className=" absolute right-0 top-0 rounded-full bg-[#7e9c8b] w-4 h-4 p-0 m-0 text-white font-nano text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color={"rgb(255 255 255 / 83%)"}
                />
                <span className=" absolute right-0 top-0 rounded-full bg-[#7e9c8b] w-4 h-4 p-0 m-0 text-white font-nano text-[12px] leading-tight text-center">
                  {cart?.length}
                </span>
              </div>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={user.avatar.url}
                      alt=""
                      className=" w-[35px] h-[35px] rounded-full"
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color={"rgb(255 255 255 / 83%)"} />
                  </Link>
                )}
              </div>
            </div>
            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>
      {/* Mobile Header */}
      <div className=" w-full h-[60px] fixed bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden">
        <div className=" w-full flex items-center justify-between">
          <div
            className=" relative ml-4 cursor-pointer"
            onClick={() => setOpenCart(true)}
          >
            <AiOutlineShoppingCart size={30} />
            <span className=" absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-nano text-[12px] leading-tight text-center">
              {cart && cart.length}
            </span>
          </div>
          <div className=" ">
            <Link to="/">
              <img
                src={logo1}
                alt="logo"
                className="ml-6 h-[60px]
            "
              />
            </Link>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
          <div className="">
            <BiMenuAltRight
              size={40}
              className="mr-4 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
        {/* Header sidebar */}

        {open && (
          <div className=" fixed  w-full bg-[#0000005f] z-20 h-full top-0 right-0">
            <div className=" fixed w-[60%] h-screen top-0 right-0 z-10 bg-white overflow-y-scroll">
              <div className=" w-full justify-between flex pr-3">
                <div
                  className=" relative mr-[15px]"
                  onClick={() => setOpen(false) || setOpenWishlist(true)}
                >
                  <AiOutlineHeart className=" mt-5 ml-3" size={30} />{" "}
                  <span className=" absolute right-0 top-5 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-nano text-[12px] leading-tight text-center">
                    {wishlist && wishlist.length}
                  </span>
                </div>

                <RxCross1
                  size={25}
                  className=" mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="relative my-8 w-[92%] m-auto h-[40px]">
                <input
                  type="text"
                  placeholder="Search Product..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="h-[40px] w-full px-2 border-green-600 border-[2px] rounded-md"
                />
                {searchData && searchData.length !== 0 ? (
                  <div className=" absolute min-h-[30vh] bg-slate-50 shadow-sm-2  z-[9] p-4">
                    {searchData.map((i, index) => {
                      const d = i._id;

                      return (
                        <Link
                          key={index}
                          to={`/products/${d}`}
                          onClick={() => {
                            setOpen(false);
                            setSearchTerm("");
                            setSearchData(null);
                          }}
                        >
                          <div className="w-full flex items-start-py-3">
                            <img
                              src={i.images[0].url}
                              alt=""
                              className="w-[40px] h-[40px]"
                            />
                            <h1>{i.name}</h1>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
              <Navbar active={activeHeading} />
              {isSeller ? (
                <Link to="/dashboard">
                  <div className={`${styles.button} m-auto !rounded-[4px]`}>
                    <h1 className=" text-[#fff] flex items-center">
                      Go DashBoard
                      <IoIosArrowForward className="ml-1" />
                    </h1>
                  </div>
                </Link>
              ) : (
                <Link to="/shop-create">
                  <div className={`${styles.button} m-auto !rounded-[4px]`}>
                    <h1 className=" text-[#fff] flex items-center">
                      Become Seller
                      <IoIosArrowForward className="ml-1" />
                    </h1>
                  </div>
                </Link>
              )}
              <br />

              <div
                className="flex w-full justify-center
              "
              >
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px]  text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                ) : (
                  <Link to="/profile">
                    <img
                      src={user.avatar.url}
                      alt=""
                      className=" w-[50px] h-[50px] rounded-full border-[3px] border-green-400"
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Breadcrumb navigation: shows path like Home / Products / Item
          Added here so every page that renders Header gets a consistent breadcrumb
          Why: improves navigation and discoverability for users, especially on nested pages */}
      <Breadcrumb />
    </>
  );
};

export default Header;
