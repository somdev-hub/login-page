import React, { useEffect, useState } from "react";
import profile from "../files/ic_user.svg";
import axios from "axios";

const MainPage = () => {
  const [email, setEmail] = useState("");
  const deleteToken = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  const verifyToken = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const url = "https://login-page-backend.onrender.com/verify";
      const res = await axios.post(url, { token: token });
      console.log(res.data);
      if (res.data.data === "token expired") {
        localStorage.clear();
        window.location = "/login";
        alert("your session has expired, please login again");
      }
      setEmail(res.data.email);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    verifyToken();
  }, []);
  return (
    <div className="container">
      <div className="form-container">
        <div className="img-container">
          <img src={profile} alt="" />
        </div>
        <h1>Welcome!</h1>
        <p>{email}</p>
        {/* <button onClick={deleteToken}>delete</button> */}
      </div>
    </div>
  );
};

export default MainPage;
