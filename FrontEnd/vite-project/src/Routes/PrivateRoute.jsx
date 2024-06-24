import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNotify } from "../Provider/NotifyProvider";

function PrivateRoute() {
  const { notifyWarning, setNotified, notified } = useNotify();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (currentUser) {
        try {
          const idTokenResult = await currentUser.getIdTokenResult(true);
          setIsAdmin(!!idTokenResult.claims.admin);
        } catch (error) {
          console.error("Error fetching admin claims:", error);
        }
      }
      setLoading(false);
    };

    checkAdminStatus();
  }, [currentUser]);

  useEffect(() => {
    if (!loading && (!currentUser || !isAdmin) && location.pathname !== "/") {
      notifyWarning("You are not authorized to view this page");
    }
  }, [currentUser, isAdmin, loading, notifyWarning, location]);
  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!currentUser || !isAdmin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default PrivateRoute;
