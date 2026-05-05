import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { API_BASE_URL } from "./utils/apiConfig";

const ProtectedRoute = ({ user, setUser, role }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const func = async () => {
      try {
        if (!user || !user.role) {
          const result = await axios.get(
            `${API_BASE_URL}/auth/verify`,
            { withCredentials: true }
          );
          setUser(result.data);
        }
      } catch (_e) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    func();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user || !user.role) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <div>Unauthorized access - Entry restricted</div>;
  }
  return <Outlet />;
};

export default ProtectedRoute;