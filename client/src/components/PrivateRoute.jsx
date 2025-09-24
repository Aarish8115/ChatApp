import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useEffect, useState } from "react";

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

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
