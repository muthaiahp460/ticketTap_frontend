import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./utils/apiConfig";

const ProtectedRoute = ({ user, setUser, role }) => {
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/auth/verify`,
          { withCredentials: true }
        );

        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      checkUser();
    } else {
      setLoading(false);
    }
  }, []); // ❗ run only once

  if (loading) return <div>Loading...</div>;

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Wrong role
  if (role && user.role !== role) {
    navigate("/login")
    return <div>Unauthorized access</div>;
  }

  return <Outlet />;
};

export default ProtectedRoute;