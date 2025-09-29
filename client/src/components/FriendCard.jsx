import React from "react";
import ProfileImage from "../assets/Profile.png";
import axiosInstance from "../utils/axiosInstance";

import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

const FriendCard = ({ userId, className }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const response = await axiosInstance.get(`/user/${userId}`);
          setUserData(response.data.user);
        } catch (error) {
          console.error(error);
        }
      } else {
        setUserData(null);
      }
    };
    fetchUserData();
  }, [userId]);
  const addFriend = async () => {
    try {
      const response = await axiosInstance.post("/add-friend", {
        friendId: userId,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`w-full text-white/60 bg-white/10 flex gap-4 cursor-pointer items-center hover:bg-white/15 hover:text-white/70 transition-all duration-200 rounded-lg px-2 py-2 ${className}`}
    >
      <div className="rounded-full overflow-hidden border-2 border-white/75">
        <img src={ProfileImage} alt="" className="w-8" />
      </div>
      <div className="text-base flex items-center justify-between w-4/5">
        <p>{userData ? userData.username : "Loading..."}</p>
        <LuPlus
          onClick={() => addFriend()}
          className="text-xl text-white/75 w-8 h-8 p-1 rounded-lg cursor-pointer hover:bg-white/10 transition-all duration-150 hover:text-white"
        />
      </div>
    </div>
  );
};

export default FriendCard;
