import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import axios from "axios";
import { loadSeller } from "../../redux/actions/seller";
import { toast } from "react-toastify";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller?.name);
  const [description, setDescription] = useState(
    seller?.description ? seller?.description : ""
  );
  const [address, setAddress] = useState(seller?.address);
  const [phoneNumber, setPhoneNumber] = useState(seller?.phoneNumber);
  const [zipCode, setZipcode] = useState(seller?.zipCode);

  const handleImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAvatar(file);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/shop/update-shop-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(loadSeller());
        toast.success("Image updated successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const updateHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${server}/shop/update-shop-info`,
        {
          name,
          description,
          address,
          phoneNumber,
          zipCode,
        },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(loadSeller());
        toast.success("Shop updated successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className=" w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-3">
        <div className=" w-full flex items-center justify-center ">
          <div className="relative">
            <img
              src={seller.avatar.url}
              className=" h-[150px] w-[150px] rounded-full  "
            />
            <div className=" w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>
        {/* shop info */}
        <form
          className=" flex flex-col items-center"
          onSubmit={updateHandler}
          aria-required={true}
        >
          <div className="w-[100%] px-2 mt-2 800px:w-[50%] items-center">
            <label className="block ">Shop name</label>
            <input
              type="name"
              placeholder={name}
              className={`${styles.input} !w-[95%] 800px:mb-0`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-[100%] mt-2 px-2 800px:w-[50%] ">
            <label className="block">Shop Description</label>
            <input
              type="text"
              placeholder={description ? description : "Enter shop description"}
              className={`${styles.input} !w-[95%] 800px:mb-0`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="w-[100%] mt-2 px-2 800px:w-[50%] ">
            <label className="block pb-2">Shop Address</label>
            <input
              type="text"
              placeholder={seller?.address}
              className={`${styles.input} !w-[95%] 800px:mb-0`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="w-[100%] px-2 mt-2 800px:w-[50%] ">
            <label className="block pb-2">Shop Phone Number</label>
            <input
              type="number"
              placeholder={phoneNumber}
              className={`${styles.input} !w-[95%] 800px:mb-0`}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="w-[100%] px-2 mt-2 800px:w-[50%] ">
            <label className="block pb-2">Zipcode</label>
            <input
              type="number"
              placeholder={zipCode}
              className={`${styles.input} !w-[95%] 800px:mb-0`}
              value={zipCode}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </div>
          <div className="w-[100%] px-2 mt-2 800px:w-[50%] ">
            <input
              type="submit"
              className={`${styles.button} !w-[95%] !rounded-[4px] 800px:mb-0`}
              value="Update Shop"
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
