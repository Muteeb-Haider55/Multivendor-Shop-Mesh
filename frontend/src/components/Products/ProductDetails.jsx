import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { backend_url } from "../../../server";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/product";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";
import Rating from "./Rating";
import { all } from "axios";

const ProductDetails = ({ data }) => {
  const { allProducts } = useSelector((state) => state.product);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const incrementCount = () => {
    setCount(count + 1);
  };
  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=507jkHSKJskj");
  };
  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully");
      }
    }
  };
  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };
  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);
  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );
  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <div className=" bg-white ">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className=" w-full py-5 ">
            <div className="block w-full 800px:flex">
              <div className=" w-full 800px:w-[50%]">
                <img
                  src={`${backend_url}/${data && data.images[select]}`}
                  alt=""
                  className="p-4 rounded-[23px]"
                />
                <div className="w-full flex">
                  {data &&
                    data.images.map((i, index) => (
                      <div
                        className={`${
                          select === 0 ? "border" : "null"
                        } cursor-pointer`}
                      >
                        <img
                          src={`${backend_url}/${i}`}
                          className="h-[200px] overflow-hidden mr-3 mt-3"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className=" w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}> {data.name}</h1>
                <p>{data.description}</p>
                <div className=" flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice} $
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "$" : null}
                  </h3>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  <div className="">
                    <button
                      onClick={decrementCount}
                      className=" bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    >
                      -
                    </button>
                    <span className=" bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      onClick={incrementCount}
                      className=" bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer "
                        onClick={() => addToWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>

                <div
                  className={`${styles.button} bg-[#000] mt-4 !rounded-[4px] h-11`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className=" text-[#ffff] flex items-center ">
                    Add to cart
                    <AiOutlineShoppingCart size={22} className="ml-1" />
                  </span>
                </div>
                <div className=" flex items-center pt-8 ">
                  <Link to={`/shop/preview/${data?.shop?._id}`}>
                    <img
                      src={`${backend_url}/${data?.shop?.avatar}`}
                      alt=""
                      className=" h-[50px] w-[50px] rounded-full mr-2"
                    />
                    <div className=" pr-8">
                      <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                        {data.shop.name}
                      </h3>
                      <h5 className=" pb-3 text-[15px]">(4/5) Ratings</h5>
                    </div>
                  </Link>
                  <div
                    className={`${styles.button} bg-green-500 mt-4 !rounded-md h-11 flex`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white text-center">Send Message</span>{" "}
                    <AiOutlineMessage className="ml-1 " color="white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <br />
      <br />
      <ProductDetailsInfo
        data={data}
        products={products}
        allProducts={allProducts}
        totalReviewsLength={totalReviewsLength}
        // totalRatings={totalRatings}
        averageRating={averageRating}
      />
      <br />
      <br />
    </div>
  );
};
const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  allProducts,
  averageRating,
}) => {
  const [active, setActive] = useState(1);
  return (
    <div className=" bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded w-[90%] justify-center items-center m-auto">
      <div className=" w-full flex justify-between border-b pt-10 pb-2">
        <div className=" relative">
          <h5
            className=" text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => {
              setActive(1);
            }}
          >
            {active === 1 ? (
              <div className={`${styles.active_indicator}`}></div>
            ) : null}
            Product Details
          </h5>
        </div>

        <div className=" relative">
          <h5
            className=" text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => {
              setActive(2);
            }}
          >
            {active === 2 ? (
              <div className={`${styles.active_indicator}`}></div>
            ) : null}
            Product Reviews
          </h5>
        </div>

        <div className=" relative">
          <h5
            className=" text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => {
              setActive(3);
            }}
          >
            {active === 3 ? (
              <div className={`${styles.active_indicator}`}></div>
            ) : null}
            Seller Information
          </h5>
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className=" py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data?.description}
          </p>
        </>
      ) : null}
      {active === 2 ? (
        <div className=" w-full  flex flex-col items-center min-h-[40vh] overflow-y-scroll  py-3">
          {data &&
            data.reviews.map((item, index) => (
              <div className=" w-full flex my-2">
                <img
                  src={`${backend_url}/${item.user.avatar}`}
                  alt=""
                  className=" w-[50px] h-[50px] rounded-full "
                />
                <div>
                  <div className=" w-full flex items-center ">
                    <h1 className=" pl-2 font-[500] mr-3">{item.user.name}</h1>
                    <Rating ratings={data?.ratings} />
                  </div>
                  <p className="pl-2">{item.comment}</p>
                </div>
              </div>
            ))}
          <div className=" w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5>No Review for this product</h5>
            )}
          </div>
        </div>
      ) : null}
      {active === 3 ? (
        <div className=" w-full block 800px:flex p-5">
          <div className=" w-full 800px:w-[50%]">
            <div className=" flex items-center">
              <img
                src={`${backend_url}/${data?.shop?.avatar}`}
                alt=""
                className=" w-[50px] h-[50px] rounded-full"
              />
              <Link to={`/shop/preview/${data?.shop?._id}`}>
                <div className="pl-3 pr-8">
                  <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                    {data?.shop?.name}
                  </h3>
                  <h5 className="  pb-2 text-[15px]">
                    ({averageRating}/5) Ratings
                  </h5>
                </div>
              </Link>
            </div>
            <p className="pt-2">{data?.shop?.description}</p>
          </div>
          <div className=" w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className=" text-left">
              <h5 className="font-[600]">
                Joined on :{" "}
                <span className=" font-[500]">
                  {data?.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products :
                <span className=" font-[500]">{products.length}</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews:{" "}
                <span className=" font-[500]">{totalReviewsLength}</span>
              </h5>
              <Link to="/">
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className=" text-white"> Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
