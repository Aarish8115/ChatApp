import React from "react";
import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
const HomePage = () => {
  
  return (
    <div className="flex border-white/15 overflow-hidden backdrop-blur-md border-2  md:w-4/5 md:h-[90vh] rounded-xl absolute -translate-1/2 top-1/2 left-1/2">
      <div className="text-white flex w-full h-full">
        <LeftBar />
      </div>
    </div>
  );
};

export default HomePage;
