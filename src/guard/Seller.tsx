import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Seller = () => {
  const auth = localStorage.getItem("authToken");
  const userRole: any = localStorage.getItem("userRole");
  return auth && userRole === "ROLE_SELLER" ? (
    <Outlet />
  ) : (
    <Navigate to="/register-seller" />
  );
};

export default Seller;
