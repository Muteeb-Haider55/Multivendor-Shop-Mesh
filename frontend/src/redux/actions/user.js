import axios from "axios";
import { server } from "../../../server";
//load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

// user info update
export const updateUserInformation =
  (email, password, phoneNumber, name) => async (dispatch, action) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });
      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        { withCredentials: true }
      );
      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFailed",
        payload: error.response.data.message,
      });
    }
  };
// update user address information
export const updateUserAddress =
  (country, city, address1, address2, addressType, zipCode) =>
  async (dispatch) => {
    try {
      dispatch({ type: "updateUserAddressRequest" });
      const { data } = await axios.put(
        `${server}/user/update-user-address`,
        {
          country,
          city,
          address1,
          address2,
          addressType,
          zipCode,
        },
        { withCredentials: true }
      );
      dispatch({
        type: "updateUserAddressSuccess",
        payload: {
          successMessage: "User Address updated successfully",
          user: data.user,
        },
      });
    } catch (error) {
      dispatch({
        type: "updateUserAddressFailed",
        payload: error.response.data.message,
      });
    }
  };
// deleet user address
export const deleteUseraddress = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteUserAddressRequest" });
    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        successMessage: "User Address Deleted successfully",
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFailed",
      payload: error.response.data.message,
    });
  }
};
