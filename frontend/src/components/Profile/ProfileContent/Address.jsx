import React, { useState } from "react";
import styles from "../../../styles/styles";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { Country, State } from "country-state-city";
import {
  deleteUseraddress,
  updateUserAddress,
} from "../../../redux/actions/user";
const Address = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);

  const addressTypeData = [
    { name: "Default" },
    { name: "Home" },
    { name: "Office" },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      addressType === "" ||
      country === "" ||
      city === "" ||
      address1 === ""
    ) {
      toast.error("All fields are required!");
    } else {
      dispatch(
        updateUserAddress(
          country,
          city,
          address1,
          address2,
          addressType,
          zipCode
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setAddressType("");
      setZipCode("");
    }
  };
  const handleDelete = (item) => {
    dispatch(deleteUseraddress(item._id));
  };
  return (
    <div className="w-full px-5">
      {open && (
        <div className=" fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center">
          <div className="800px:w-[45%] h-[80vh] relative overflow-y-scroll shadow rounded bg-white font-[Poppins] ">
            <div className=" w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-[20px] font-[600] text-[#000000ba] pb-2 text-center">
              Add New Address
            </h1>
            <div className="">
              <form area-required onSubmit={handleSubmit}>
                <div className=" w-full block p-4 ">
                  <div className=" w-full pb-2">
                    <label className="block pb-2"> Country</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full border p-2 rounded"
                    >
                      <option value="">choose your country</option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className=" w-full pb-2">
                    <label className="block pb-2"> City</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full border p-2 rounded"
                    >
                      <option value="">choose your city</option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className=" w-full pb-2">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="text"
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                      className={`${styles.input} !w-full focus:border-blue-600 focus:border-[2px]`}
                    />
                  </div>
                  <div className=" w-full pb-2">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="text"
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                      className={`${styles.input} !w-full focus:border-blue-600 focus:border-[2px]`}
                    />
                  </div>
                  <div className=" w-full pb-2">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="text"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                      className={`${styles.input} !w-full focus:border-blue-600 focus:border-[2px]`}
                    />
                  </div>
                  <div className=" w-full pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className={`${styles.input} !w-full focus:border-blue-600 focus:border-[2px]`}
                    />
                  </div>
                  <div className=" w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-full border p-2 rounded"
                    >
                      <option value="">Select Address Type</option>
                      {addressTypeData.map((item, index) => (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className=" w-[30%] pb-2 mt-4 justify-center items-center ">
                    <input
                      type="submit"
                      className={`${styles.button} !w-full  !rounded-[4px]  cursor-pointer text-white`}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className=" text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className={`text-[#fff] `}>Add New</span>
        </div>
      </div>
      <br />

      {user &&
        user.addresses.map((item, index) => (
          <div
            key={index}
            className=" w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-3"
          >
            <div className=" flex items-center ">
              <h5 className=" pl-5 font-[600]">{item.addressType} </h5>
            </div>
            <div className=" pl-8 flex items-center">
              <h6>
                {item.address1} {`${item.address2}`}
              </h6>
            </div>
            <div className=" pl-8 flex items-center">
              <h6>{user && user.phoneNumber}</h6>
            </div>
            <div
              className=" min-w-[10%] flex items-center justify-between pl-8"
              onClick={() => handleDelete(item)}
            >
              <AiOutlineDelete size={25} className=" cursor-pointer" />
            </div>
          </div>
        ))}
      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-10 text-[19px]">
          You don't have any save address!
        </h5>
      )}
    </div>
  );
};

export default Address;
