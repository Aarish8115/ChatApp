import React from "react";

import ProfileImage from "../assets/Profile.png";
const RightBar = ({ user }) => {
  return (
    <div
      id="userprofile"
      className="flex flex-col gap-4 px-4 bg-white/10 w-1/4 h-full border-l-2 border-l-white/10 items-center py-24"
    >
      <div className="rounded-full overflow-hidden border-2 w-18 h-18 border-white/75 ">
        <img src={ProfileImage} alt="" className="" />
      </div>
      <div className="text-xl font-semibold">{user.username}</div>
      <p className="text-sm leading-tight ">
        {user.bio ? user.bio : "nothing to see here"}
      </p>
    </div>
  );
};

export default RightBar;
