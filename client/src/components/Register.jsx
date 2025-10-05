import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

import { useNavigate } from "react-router-dom";

const Register = ({ setLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const payload = {
        username: (name || "").trim().toLowerCase(),
        email: (email || "").trim().toLowerCase(),
        password: password || "",
      };
      const response = await axiosInstance.post("/register", payload);
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/home");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message)
        console.log(error.response.data.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full px-10 text-white">
      <h1 className="text-3xl font-semibold text-white text-center select-none">
        Register
      </h1>
      <div className=" w-full mx-auto flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-base font-normal text-white select-none"
          >
            Name
          </label>
          <input
            type="text"
            className="outline-none bg-white/20 py-2 px-4 rounded-sm"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-base font-normal text-white select-none"
          >
            E-Mail
          </label>
          <input
            type="text"
            className="outline-none bg-white/20 py-2 px-4 rounded-sm"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-base font-normal text-white select-none"
          >
            Password
          </label>
          <input
            type="password"
            className="outline-none bg-white/20 py-2 px-4 rounded-sm"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <button
        onClick={handleRegister}
        type="submit"
        className="bg-purple-500 cursor-pointer hover:bg-purple-400 active:bg-violet-500 transition-colors duration-200 text-white px-4 py-2 rounded-sm w-fit"
      >
        Create account
      </button>
      <div className="flex gap-2 text-xs text-white">
        Already a User ?
        <button
          type="button"
          className="text-blue-300 hover:underline cursor-pointer bg-transparent border-none p-0 m-0 focus:outline-none"
          onClick={() => {
            setLogin(true);
          }}
        >
          Login Now
        </button>
      </div>
    </div>
  );
};

export default Register;
