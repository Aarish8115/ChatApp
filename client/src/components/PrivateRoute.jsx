import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useEffect, useState } from "react";
import { SocketProvider } from "../utils/SocketContext";

const PrivateRoute = ({ children, ...rest }) => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get("/check-user");
        if (response.data && response.data.verified === true) {
          setAuth(true);
        }
      } catch (error) {
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div></div>;
  }

  return auth ? (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
