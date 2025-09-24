import React, { useRef, useEffect } from "react";

import ProfileImage from "../assets/Profile.png";
import { LuSendHorizontal } from "react-icons/lu";
import Chat from "./Chat";
import axiosInstance from "../utils/axiosInstance";
import { useState } from "react";
const MainChat = ({ setShowUserProfile, showUserProfile, selectedUser }) => {
  const [message, setMessage] = useState("");
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [selectedUser]);

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
      // Scroll to bottom after sending a message
      setTimeout(scrollToBottom, 100); // Short timeout to ensure the new message has been rendered
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
      className={`${showUserProfile ? "w-1/2" : "w-3/4"} flex flex-col`}
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
          <p>{selectedUser ? "User" : "Select a user to start chatting"}</p>
        </div>
      </div>
      {selectedUser ? (
        <>
          <div
            ref={chatContainerRef}
            className="h-[80%] w-full px-4 overflow-scroll object-bottom"
          >
            <Chat sendby={"user"}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
              dolorum pariatur ut. Molestiae repellat modi consectetur
              consequuntur totam dolorem assumenda!
            </Chat>
            <Chat sendby={"user"}>Lorem ipsum dolor</Chat>
            <Chat sendby={"myself"}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
              dolorum pariatur ut. Molestiae repellat modi consectetur
              consequuntur totam dolorem assumenda!
            </Chat>
            <Chat sendby={"user"}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
              dolorum pariatur ut. Molestiae repellat modi consectetur
              consequuntur totam dolorem assumenda!
            </Chat>
            <Chat sendby={"myself"}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
              dolorum pariatur ut. Molestiae repellat modi consectetur
              consequuntur totam dolorem assumenda!
            </Chat>
            <Chat sendby={"myself"}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
              dolorum pariatur ut. Molestiae repellat modi consectetur
              consequuntur totam dolorem assumenda!
            </Chat>
            <Chat sendby={"user"}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
              dolorum pariatur ut. Molestiae repellat modi consectetur
              consequuntur totam dolorem assumenda!
            </Chat>
            <Chat sendby={"myself"}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
              dolorum pariatur ut. Molestiae repellat modi consectetur
              consequuntur totam dolorem assumenda!
            </Chat>
            <Chat sendby={"myself"}>Lorem ipsum dolor sit, amet consect</Chat>
            <Chat sendby={"myself"}>Hi</Chat>
          </div>
          <div className="w-full flex px-4 py-4 justify-between ">
            <input
              type="text"
              value={message}
              className="rounded-full bg-white/20 w-[90%] outline-none px-4 py-2 text-sm h-10 "
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
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
        </>
      ) : (
        <div className="h-[80%] w-full flex items-center justify-center">
          <div className="text-white/50 text-center">
            <p className="text-xl">
              Select a user from the left sidebar to start chatting
            </p>
            <p className="mt-2">Your conversations will appear here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainChat;
