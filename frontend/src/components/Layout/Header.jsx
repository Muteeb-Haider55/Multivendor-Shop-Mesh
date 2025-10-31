import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";

import logo1 from "../../assets/logo.png";
import { CgProfile } from "react-icons/cg";
import Cart from "../../components/cart/Cart.jsx";
import Wishlist from "../../components/wishlist/Wishlist.jsx";

import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { BiMenuAltRight } from "react-icons/bi";
import Navbar from "./Navbar.jsx";
import { useSelector } from "react-redux";
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
  // header visual state (no dropdown/categories in new layout)
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

  // removed scroll listener since header is now sticky and single-row

  return (
    <>
      <div
        className={`${styles.section} w-full bg-white shadow sticky top-0 left-0 z-20 py-2 flex items-center justify-between`}
      >
        {/* Left: logo */}
        <div className="flex items-center flex-shrink-0">
          <Link to="/">
            <img src={logo1} alt="logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Center: search (collapses on small screens) */}
        <div className="flex-1 mx-6 hidden 800px:flex justify-center">
          <div className="w-[60%] max-w-2xl relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-10 w-full px-3 border border-gray-200 rounded-md shadow-sm"
            />
            <AiOutlineSearch
              size={20}
              className="absolute right-3 top-2.5 text-green-600 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className=" absolute left-0 right-0 mt-2 bg-white shadow p-2 z-30 rounded">
                {searchData.map((i, index) => (
                  <Link to={`/products/${i._id}`} key={index}>
                    <div className="w-full flex items-center gap-3 py-2 px-2 hover:bg-gray-50 rounded">
                      <img
                        src={i.images[0].url}
                        alt=""
                        className="w-10 h-10 object-cover rounded"
                      />
                      <h1 className="text-sm truncate">{i.name}</h1>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Right: nav (desktop) + icons */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="hidden 800px:flex">
            <Navbar active={activeHeading} />
          </div>

          <div className="flex items-center gap-4">
            <button
              className="relative p-1"
              onClick={() => setOpenWishlist(true)}
            >
              <AiOutlineHeart size={25} />
              <span className=" absolute -right-0 -top-0 rounded-full bg-green-500 w-4 h-4 text-white text-[10px] flex items-center justify-center">
                {wishlist?.length}
              </span>
            </button>

            <button className="relative p-1" onClick={() => setOpenCart(true)}>
              <AiOutlineShoppingCart size={25} />
              <span className=" absolute -right-0 -top-0 rounded-full bg-green-500 w-4 h-4 text-white text-[10px] flex items-center justify-center">
                {cart?.length}
              </span>
            </button>
            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
            <div className="flex items-center mr-2">
              {isAuthenticated ? (
                <Link to="/profile">
                  <img
                    src={user?.avatar?.url}
                    alt=""
                    className="w-8 h-8 rounded-full border border-gray-100"
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <CgProfile size={20} />
                </Link>
              )}
            </div>

            <Link
              to={`${isSeller ? "/dashboard" : "/shop-create"}`}
              className="hidden 800px:inline-flex mr-6 py-2"
            >
              <span
                className={`bg-green-500 !rounded-[4px] py-2 px-4 text-white`}
              >
                {isSeller ? "Dashboard" : "Become Seller"}
              </span>
            </Link>

            <div className="800px:hidden">
              <BiMenuAltRight
                size={28}
                onClick={() => setOpen(true)}
                className="cursor-pointer"
              />
            </div>
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
    </>
  );
};

export default Header;
