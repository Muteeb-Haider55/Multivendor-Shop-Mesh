import React, { useState } from "react";
import { backend_url } from "../../../server";
import { useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import AllOrders from "../Profile/ProfileContent/AllOrders.jsx";
import AllRefundOrders from "../Profile/ProfileContent/AllRefundOrders.jsx";
import TrackOrders from "../Profile/ProfileContent/TrackOrders.jsx";
import PaymentMethods from "../Profile/ProfileContent/PaymentMethods.jsx";
import Address from "../Profile/ProfileContent/Address.jsx";

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState();
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className=" w-full ">
      {/* Profile Page */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backend_url}/${user?.avatar?.public_id}`}
                alt=""
                className=" w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
              />
              <div className=" w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <AiOutlineCamera />
              </div>
            </div>
          </div>
          <br />
          <div className=" w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className=" w-full 800px:flex pb-3 block ">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="email"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className=" w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Zip Code</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>

              <div className=" w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Address 1</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Address 2</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] `}
                    required
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
              </div>
              <input
                className=" w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer ml-[auto]"
                type="submit"
                value="Update"
                required
              />
            </form>
          </div>
        </>
      )}

      {/* Orders */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}
      {/* Refunds */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}
      {/* Track Orders */}
      {active === 5 && (
        <div>
          <TrackOrders />
        </div>
      )}
      {/* Payment Method */}
      {active === 6 && (
        <div>
          <PaymentMethods />
        </div>
      )}
      {/* address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
      {/* Logout */}
      {active === 8 && <div>
        
        </div>}
    </div>
  );
};

export default ProfileContent;
