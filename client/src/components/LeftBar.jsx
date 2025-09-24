import React from "react";
import UserCard from "./UserCard";
import { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { LuMessagesSquare, LuBolt, LuUserRoundPlus } from "react-icons/lu";
import { Link } from "react-router-dom";

const LeftBar = ({ setSelectedUser }) => {
  const [friends, setFriends] = React.useState([]);
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axiosInstance.get("/friends");
        const friends = response.data.friends;
        setFriends(friends);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFriends();
  }, []);
  return (
    <div
      id="leftbar"
      className="flex flex-col bg-white/10 w-1/4 h-full border-r-2 border-r-white/10"
    >
      <div className="border-b-2 min-h-[50px] border-white/10 flex w-full justify-between px-4 text-2xl items-center text-white/75 font-medium">
        <div className="flex gap-2 items-center">
          <LuMessagesSquare className="text-xl" />
          <p className="">Chat</p>
        </div>
        <div className="flex gap-2 ">
          <Link to={"/profile"}>
            <LuUserRoundPlus className="text-xl cursor-pointer hover:text-white transition-all duration-200" />
          </Link>
          <Link to={"/settings"}>
            <LuBolt className="text-xl cursor-pointer hover:text-white transition-all duration-200" />
          </Link>
        </div>
      </div>
      <div className="px-2 py-2 overflow-y-scroll">
        {friends.map((friendId) => (
          <UserCard
            key={friendId}
            userId={friendId}
            setSelectedUser={setSelectedUser}
          />
        ))}
      </div>
    </div>
  );
};

export default LeftBar;
