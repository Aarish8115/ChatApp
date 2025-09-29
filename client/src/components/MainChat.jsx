import React, { useRef, useEffect } from "react";

import ProfileImage from "../assets/Profile.png";
import { LuSendHorizontal } from "react-icons/lu";
import Chat from "./Chat";
import axiosInstance from "../utils/axiosInstance";
import { useState } from "react";
const MainChat = ({
  setShowUserProfile,
  showUserProfile,
  selectedUser,
  user,
}) => {
  const [message, setMessage] = useState("");
  const [messages, setmessages] = useState([]);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const fetchmessages = async () => {
    try {
      if (!selectedUser) return;

      console.log("Fetching messages for user:", selectedUser);
      const response = await axiosInstance.get(`/messages/${selectedUser}`);
      setmessages(response.data.messages);
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setmessages([]);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      fetchmessages();
    }
  }, [selectedUser]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSendMessage = async (message) => {
    if (!selectedUser) {
      alert("Please select a user to chat with first!");
      return;
    }

    if (!message.trim()) {
      return;
    }

    try {
      const response = await axiosInstance.post("/messages", {
        message: message.trim(),
        receiverId: selectedUser,
      });
      console.log("Message sent:", response.data);
      setMessage("");
      fetchmessages();
    } catch (error) {
      console.error("Error sending message:", error);

      if (error.response) {
        console.error("Server response:", error.response.data);
        alert(
          `Failed to send message: ${
            error.response.data.message || "Server error"
          }`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("Failed to send message: No response from server");
      } else {
        alert(`Failed to send message: ${error.message}`);
      }
    }
  };

  return (
    <div
      id="mainchat"
      className={`${showUserProfile ? "w-1/2" : "w-3/4"} flex flex-col h-full`}
    >
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
          <p>
            {selectedUser
              ? user
                ? user.username
                : "Loading"
              : "Select a user"}
          </p>
        </div>
      </div>

      <div className="flex flex-col h-[calc(100%-50px)]">
        <div
          ref={chatContainerRef}
          className="flex-1 w-full px-4 overflow-y-auto"
        >
          {messages.map((chat, index) => (
            <Chat
              key={index}
              sendby={chat.senderId == selectedUser ? "user" : "myself"}
            >
              {chat.message}
            </Chat>
          ))}
        </div>
        <div className="w-full flex px-4 py-4 justify-between   ">
          <input
            type="text"
            value={message}
            className="rounded-full bg-white/20 w-[90%] outline-none px-4 py-2 text-sm h-10 "
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage(message);
              }
            }}
            placeholder="Type a message..."
          />
          <div className="w-[5%] mr-4">
            <button
              onClick={() => handleSendMessage(message)}
              className="bg-white h-10 text-2xl w-10 flex items-center justify-center rounded-full text-black"
            >
              <LuSendHorizontal />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChat;
