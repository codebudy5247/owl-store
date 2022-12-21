import Navbar from "../../components/Navbar";
import { Box } from "@mui/material";
import CardList from "../../components/layouts/CardList";
import SearchFilter from "../../components/layouts/SearchFilter";
import Footer from "../../components/Footer";
import Header from "../../components/layouts/Header";
import { ToastContainer } from "react-toastify";
import MerchantDashboard from "../merchant/Dashboard";

const Home = () => {
  const USER_ROLE = localStorage.getItem("userRole");
  const approvedByAdmin: any = localStorage.getItem("approvedByAdmin");
  
  return (
    <>
      {USER_ROLE === "ROLE_USER"  ? (
        <>
          <Box>
            <Navbar />
            {/* <Banner /> */}
            <Header title="Search Cards" subtitle="Owl Store > Search Cards" />
            <SearchFilter />
            <CardList />
            <Footer />
          </Box>
          <ToastContainer />
        </>
      ) : (
        <></>
      )}

      {USER_ROLE === "ROLE_SELLER" && approvedByAdmin === false  ? (
        <>
        <h1>Waiting for approval by admin.After that you can access to the merchant dashboard.</h1>
        </>
      ):(
        <></>
      )}

      {approvedByAdmin === true ? (
        <>
          <MerchantDashboard />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
