import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";
import axios from "axios";

const SellerActivationPage = () => {
  const [error, setError] = useState(false);
  const { activation_token } = useParams();

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        const res = await axios
          .post(`${server}/shop/activation`, {
            activation_token,
          })

          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(err);
          });
      };
      sendRequest();
    }
  }, [activation_token]);
  console.log(error);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>your token is expired</p>
      ) : (
        <p>Your account has been created successfully</p>
      )}
    </div>
  );
};

export default SellerActivationPage;
