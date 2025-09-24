import React from "react";

import ProfileImage from "../assets/Profile.png";
import { LuSendHorizontal } from "react-icons/lu";
import Chat from "./Chat";

const MainChat = ({ setShowUserProfile, showUserProfile }) => {
  return (
    <div id="mainchat" className={`${showUserProfile?"w-1/2":"w-3/4"} flex flex-col`}>
      <div className="border-b-2 min-h-[50px] border-white/10 flex w-full justify-between px-4  text-base items-center text-white/75">
        <div
          className="flex gap-2 items-center"
          onClick={() => {
            setShowUserProfile(!showUserProfile);
          }}
        >
          <div className="rounded-full overflow-hidden border-2 border-white/75">
            <img src={ProfileImage} alt="" className="w-6" />
          </div>
          <p>User</p>
        </div>
      </div>
      <div className="h-[80%] w-full px-4 overflow-scroll">
        <Chat sendby={"user"}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est dolorum
          pariatur ut. Molestiae repellat modi consectetur consequuntur totam
          dolorem assumenda!
        </Chat>
        <Chat sendby={"user"}>Lorem ipsum dolor</Chat>
        <Chat sendby={"myself"}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est dolorum
          pariatur ut. Molestiae repellat modi consectetur consequuntur totam
          dolorem assumenda!
        </Chat>
        <Chat sendby={"user"}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est dolorum
          pariatur ut. Molestiae repellat modi consectetur consequuntur totam
          dolorem assumenda!
        </Chat>
        <Chat sendby={"myself"}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est dolorum
          pariatur ut. Molestiae repellat modi consectetur consequuntur totam
          dolorem assumenda!
        </Chat>
        <Chat sendby={"myself"}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est dolorum
          pariatur ut. Molestiae repellat modi consectetur consequuntur totam
          dolorem assumenda!
        </Chat>
        <Chat sendby={"user"}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est dolorum
          pariatur ut. Molestiae repellat modi consectetur consequuntur totam
          dolorem assumenda!
        </Chat>
        <Chat sendby={"myself"}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est dolorum
          pariatur ut. Molestiae repellat modi consectetur consequuntur totam
          dolorem assumenda!
        </Chat>
        <Chat sendby={"myself"}>Lorem ipsum dolor sit, amet consect</Chat>
        <Chat sendby={"myself"}>Hi</Chat>
      </div>
      <div className="w-full flex px-4 py-4 justify-between ">
        <input
          type="text"
          className="rounded-full bg-white/20 w-[90%] outline-none px-4 py-2 text-sm h-10 "
        />
        <div className="w-[5%] mr-4">
          <button className="bg-white h-10 text-2xl w-10 flex items-center justify-center rounded-full text-black">
            <LuSendHorizontal />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainChat;
