import React from "react";

import ProfileImage from "../assets/Profile.png";
const RightBar = () => {
  return (
    <div
      id="userprofile"
      className="flex flex-col gap-4 px-4 bg-white/10 w-1/4 h-full border-l-2 border-l-white/10 items-center py-24"
    >
      <div className="rounded-full overflow-hidden border-2 w-18 h-18 border-white/75 ">
        <img src={ProfileImage} alt="" className="" />
      </div>
      <div className="text-xl font-semibold">UserName</div>
      <p className="text-sm leading-tight ">
        Bio Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam,
        aperiam.
      </p>
    </div>
  );
};

export default RightBar;
