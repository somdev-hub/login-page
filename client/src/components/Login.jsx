import React, { useState } from "react";
import "./Login.css";
import profile from "../files/ic_user.svg";
import hideLogo from "../files/ic_hide_password.svg";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [inputType, setInputType] = useState(true);
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/login";
      const { data: res } = await axios.post(url, data);
      // localStorage.setItem("email", data.email);
      localStorage.setItem("token", res.data);
      window.location = "/";
      console.log(res.data);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.status <= 500
      ) {
        console.log(error);
      }
    }
  };
  return (
    <div className="container">
      <div className="form-container">
        <div className="img-container">
          <img src={profile} alt="" />
        </div>
        <h1>Welcome!</h1>
        <p>
          Lets connect to your workspace <br />
          Please enter your credentials to continue
        </p>
        <div className="login-form">
          <form action="/" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email address"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
            <i
              onClick={() => {
                setInputType(!inputType);
              }}
            >
              <img src={hideLogo} alt="" />
            </i>
            <input
              type={inputType ? "password" : "text"}
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;