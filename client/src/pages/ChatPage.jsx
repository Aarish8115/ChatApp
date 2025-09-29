import React from "react";
import LeftBar from "../components/LeftBar";
import MainChat from "../components/MainChat";
import { useState, useEffect } from "react";
import RightBar from "../components/RightBar";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
const ChatPage = () => {
  const [showUserProfile, setshowUserProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [user, setuser] = useState({});
  const { chatId } = useParams();

  // Set the selectedUser based on chatId when the component mounts or chatId changes
  useEffect(() => {
    if (chatId) {
      setSelectedUser(chatId);
    }
  }, [chatId]);

  const fetchUserData = async () => {
    try {
      if (!selectedUser) return;

      const response = await axiosInstance.get(`/user/${selectedUser}`);
      setuser(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch user data whenever selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      fetchUserData();
    }
  }, [selectedUser]);

  return (
    <div className="flex border-white/15 overflow-hidden backdrop-blur-md border-2  md:w-4/5 md:h-[90vh] rounded-xl absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <div className="text-white flex w-full h-full">
        <LeftBar setSelectedUser={setSelectedUser} />
        <MainChat
          selectedUser={selectedUser}
          showUserProfile={showUserProfile}
          setShowUserProfile={setshowUserProfile}
          user={user}
        />
        {showUserProfile ? <RightBar user={user} /> : ""}
      </div>
    </div>
  );
};

export default ChatPage;
