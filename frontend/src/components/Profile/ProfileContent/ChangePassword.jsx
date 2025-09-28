import React, { useState } from "react";
import styles from "../../../styles/styles";
import { AiOutlineDelete } from "react-icons/ai";
import { server } from "../../../../server";
import axios from "axios";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
      });
  };
  return (
    <div className="w-full px-2">
      <h1 className="text-center text-[25px] font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className=" w-full py-5 items-center justify-center">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className=" flex flex-col items-center"
        >
          <div className="w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter Your Old Password </label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] 800px:mb-0`}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] 800px:w-[50%] mt-3">
            <label className="block pb-2">Enter Your New Password </label>
            <input
              type="password"
              className={`${styles.input} !w-[95%]  800px:mb-0`}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] 800px:w-[50%] mt-3">
            <label className="block pb-2">Enter Your Confirm Password </label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] 800px:w-[50%] mt-3">
            <input
              className=" w-full h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-4 cursor-pointer "
              type="submit"
              value="Update"
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
