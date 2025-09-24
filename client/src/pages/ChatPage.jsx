import React from "react";
import LeftBar from "../components/LeftBar";
import MainChat from "../components/MainChat";
import { useState,useEffect } from "react";
import RightBar from "../components/RightBar";

const ChatPage = () => {
  const [showUserProfile, setshowUserProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    console.log(selectedUser);
  }, [selectedUser]);

  return (
    <div className="flex border-white/15 overflow-hidden backdrop-blur-md border-2  md:w-4/5 md:h-[90vh] rounded-xl absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <div className="text-white flex w-full h-full">
        <LeftBar setSelectedUser={setSelectedUser} />
        <MainChat
          selectedUser={selectedUser}
          showUserProfile={showUserProfile}
          setShowUserProfile={setshowUserProfile}
        />
        {showUserProfile ? <RightBar /> : ""}
      </div>
    </div>
  );
};

export default ChatPage;
