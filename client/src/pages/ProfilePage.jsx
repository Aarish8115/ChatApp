import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import FriendCard from "../components/FriendCard";
const ProfilePage = () => {
  const [Id, setId] = useState("");
  const [users, setUsers] = useState([]);

  const searchUser = async () => {
    if (Id.trim() === "") {
      setUsers([]);
      return;
    }

    try {
      const response = await axiosInstance.post("/users", { query: Id });

      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div
      className={`flex flex-col  border-white/15 overflow-hidden backdrop-blur-md border-2  rounded-xl absolute -translate-1/2 top-1/2 left-1/2 p-8`}
    >
      <input
        type="text"
        className="outline-none bg-white/20 py-2 px-4 rounded-sm"
        placeholder="Enter User Id"
        value={Id}
        onChange={(e) => {
          setId(e.target.value);
          searchUser();
        }}
      />
      <div className=" rounded-lg flex flex-col gap-2">
        {users &&
          users.map((user, index) => (
            <FriendCard
              key={index}
              userId={user.userId}
              className={`${index == 0 ? "mt-6" : ""}`}
            />
          ))}
      </div>
    </div>
  );
};

export default ProfilePage;
