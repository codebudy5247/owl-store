import { Box } from "@mui/material";
import React from "react";
import Header from "../../components/layouts/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import OrderList from "../../components/layouts/OrderList";
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
