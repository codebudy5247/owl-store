import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "../../components/layouts/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import OrderList from "../../components/layouts/OrderList";
import * as Api from "../../services/api";

const Orders = () => {

  

  return (
    <Box>
      <Navbar />
      <Header title="Your Orders" subtitle="Owl Store > Orders" />
      <OrderList />
      <Footer />
    </Box>
  );
};

export default Orders;
