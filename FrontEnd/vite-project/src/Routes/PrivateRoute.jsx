import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNotify } from "../Provider/NotifyProvider";

function PrivateRoute() {
  const { notifyWarning, setNotified, notified } = useNotify();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (currentUser) {
      currentUser.getIdTokenResult().then((idTokenResult) => {
        setIsAdmin(!!idTokenResult.claims.admin);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!loading && (!currentUser || !isAdmin) && !notified) {
      notifyWarning("You are not authorized to view this page");
      setNotified(true);
    }
  }, [loading, currentUser, isAdmin, notified, notifyWarning, setNotified]);// this thing is triggering the warning two times

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!currentUser || !isAdmin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default PrivateRoute;
