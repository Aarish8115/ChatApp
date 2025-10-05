import React, { createContext, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import axiosInstance from "./axiosInstance";
import { constants } from "./constants";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axiosInstance.get("/me");
        if (response.data && response.data.user) {
          const userId = response.data.user.userId;
          setUserId(userId);

          const newSocket = io(constants.API_URL || "http://localhost:3000");
          setSocket(newSocket);

          newSocket.emit("user_connected", userId);

          newSocket.on("user_status_changed", (activeUsers) => {
            setOnlineUsers(activeUsers);
          });
          return () => {
            newSocket.disconnect();
          };
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const value = {
    socket,
    userId,
    onlineUsers,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketContext;
