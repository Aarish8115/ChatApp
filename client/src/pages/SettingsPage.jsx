import React, { useEffect, useState } from "react";
import SettingsMenu from "../components/SettingsMenu";
import ProfileImage from "../assets/Profile.png";
import { LuCopy } from "react-icons/lu";
import axiosInstance from "../utils/axiosInstance";
const SettingsPage = () => {
  const [user, setuser] = useState({});
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  useEffect(() => {
    const getActiveUser = async () => {
      try {
        const response = await axiosInstance.get("/me");
        setuser(response.data.user);
        setUsername(response.data.user.username);
        setBio(response.data.user.bio);
      } catch (error) {}
    };
    getActiveUser();
  }, []);
  const updateUser = async () => {
    try {
      const response = await axiosInstance.post("/update-user", {
        newUsername: username,
        newBio: bio,
      });
      console.log(response.data);
    } catch (error) {}
  };

  return (
    <div className="flex border-white/15 overflow-hidden backdrop-blur-md border-2  rounded-xl absolute -translate-1/2 top-1/2 left-1/2">
      <div className="flex w-full">
        <SettingsMenu />
        <div className="w-full h-[100%-50px] px-12 py-4 mt-16">
          <div className="flex gap-4">
            <div className="rounded-full overflow-hidden border-2 border-white/75 w-[80px] h-[80px]">
              <img src={ProfileImage} alt="" className="w-full h-full" />
            </div>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                className="outline-none text-white/75 focus:text-white bg-white/10 transition-all duration-150 hover:bg-white/20 focus:bg-white/20 py-2 px-4 rounded-sm"
                id="Name"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
              />
              <input
                type="text"
                className="outline-none  text-white/75 focus:text-white bg-white/10 transition-all duration-150 hover:bg-white/20 focus:bg-white/20 py-2 px-4 rounded-sm"
                id="Bio"
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                value={bio}
              />
              <div className="flex justify-end gap-4">
                <button
                  onClick={updateUser}
                  className="bg-purple-500 cursor-pointer hover:bg-purple-400 active:bg-violet-500 transition-colors duration-200 text-white px-4 py-2 rounded-sm w-fit"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center my-8">
            <p className="text-white text-sm">
              Id : {user ? user.userId : "Loading"}
            </p>
            <LuCopy className="text-base text-white/75 w-6 h-6 p-1.5 rounded-lg cursor-pointer hover:bg-white/10 transition-all duration-150 hover:text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
