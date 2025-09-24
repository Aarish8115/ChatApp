import React from "react";
import ProfileImage from "../assets/Profile.png";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const UserCard = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/user/${userId}`);
        setUserData(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [userId]);

  return (
    <div
      onClick={() => navigate(`/chat/${userId}`)}
      onLoad={() => fetchUserData()}
      className="w-full flex gap-4 cursor-pointer items-center hover:bg-white/10 transition-all duration-200 rounded-lg px-2 py-2"
    >
      <div className="rounded-full overflow-hidden border-2 border-white/75">
        <img src={ProfileImage} alt="" className="w-8" />
      </div>
      <div className="text-base flex items-center justify-between w-4/5">
        <p>{userData ? userData.username : "Loading..."}</p>
        <div className="bg-green-500 flex h-1.5 w-1.5 rounded-full"></div>
      </div>
    </div>
  );
};

export default UserCard;
