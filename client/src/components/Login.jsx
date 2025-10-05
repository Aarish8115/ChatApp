import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { BASE_URL } from "../utils/constants";

import { useNavigate } from "react-router-dom";

const Login = ({ setLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");

  const handleLogin = async () => {
    setLoginError("");
    setDebugInfo("");
    // Basic client validation
    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanPassword = password || "";
    if (!cleanEmail || !cleanPassword) {
      setLoginError("Email and password are required");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Attempting login to:", BASE_URL);
      const response = await axiosInstance.post("/login", {
        email: cleanEmail,
        password: cleanPassword,
      });
      console.log("Login response:", response);

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error:", error);

      // Detailed debug information
      let errorDetails = "";
      if (error.code) errorDetails += `Code: ${error.code}. `;
      if (error.message) errorDetails += `Message: ${error.message}. `;
      if (error.response?.status)
        errorDetails += `Status: ${error.response.status}. `;
      if (error.response?.data?.message)
        errorDetails += `Server: ${error.response.data.message}. `;
      setDebugInfo(errorDetails);

      if (error.code === "ERR_NETWORK") {
        setLoginError(
          "Network error. The server might be down or CORS might be blocking the request."
        );
      } else if (error.code === "ECONNABORTED") {
        setLoginError(
          "Connection timed out. The server might be starting up, please try again."
        );
      } else if (error.response?.data?.message) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError("An error occurred during login. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full px-10 text-white">
      <h1 className="text-3xl font-semibold text-white text-center select-none">
        Login
      </h1>
      <div className="w-full mx-auto flex flex-col gap-4">
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
      {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
      {debugInfo && (
        <p className="text-yellow-400 text-xs mt-1 max-w-xs overflow-hidden">
          {debugInfo}
        </p>
      )}
      <button
        onClick={handleLogin}
        disabled={isLoading}
        className={`${
          isLoading
            ? "bg-purple-700"
            : "bg-purple-500 hover:bg-purple-400 active:bg-violet-500"
        } cursor-pointer transition-colors duration-200 text-white px-4 py-2 rounded-sm w-fit`}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
      <div className="flex gap-2 text-xs text-white">
        New User ?
        <button
          type="button"
          className="text-blue-300 hover:underline cursor-pointer bg-transparent border-none p-0 m-0 focus:outline-none"
          onClick={() => {
            setLogin(false);
          }}
        >
          Create Account Now
        </button>
      </div>
    </div>
  );
};

export default Login;
