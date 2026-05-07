import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { API_BASE_URL } from "./utils/apiConfig";

const ProtectedRoute = ({ user, setUser, role }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/auth/verify`,
          { withCredentials: true }
        );

        console.log(res.data);

        if (res.data.user) {
          setUser(res.data.user);
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          setUser(null);
        }

      } catch (err) {
        console.log(err);
        setAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  if (role && user?.role !== role) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;