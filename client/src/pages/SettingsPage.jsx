import React from "react";
import SettingsMenu from "../components/SettingsMenu";
import ProfileImage from "../assets/Profile.png";
import { LuCopy } from "react-icons/lu";

const SettingsPage = () => {
  return (
    <div className="flex border-white/15 overflow-hidden backdrop-blur-md border-2  rounded-xl absolute -translate-1/2 top-1/2 left-1/2">
      <div className="flex w-full">
        <SettingsMenu />
        <div className="w-full h-[100%-50px] px-12 py-4 mt-16">
          <div className="flex gap-4">
            <div className="rounded-full overflow-hidden border-2 border-white/75 w-[80px] h-[80px]">
              <img src={ProfileImage} alt="" className="w-full h-full" />
            </div>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                className="outline-none text-white/75 focus:text-white bg-white/10 transition-all duration-150 hover:bg-white/20 focus:bg-white/20 py-2 px-4 rounded-sm"
                id="Name"
                value={"User"}
              />
              <input
                type="text"
                className="outline-none  text-white/75 focus:text-white bg-white/10 transition-all duration-150 hover:bg-white/20 focus:bg-white/20 py-2 px-4 rounded-sm"
                id="Bio"
                value={"Bio"}
              />
            </div>
          </div>
          <div className="flex gap-2 items-center my-8">
            <p className="text-white text-sm">Id : 1328726</p>{" "}
            <LuCopy className="text-base text-white/75 w-6 h-6 p-1.5 rounded-lg cursor-pointer hover:bg-white/10 transition-all duration-150 hover:text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
