import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LogoutIcon from "@mui/icons-material/Logout";
import Image from "./Image";
import logoImg from "../../src/images/logo.png";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import * as Api from "../services/api";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#EE2B70",
  backgroundColor: "#FDE7EF",
  "&:hover": {
    backgroundColor: "#EE2B70",
    color: "white",
  },
}));

const headersData = [
  {
    label: "Listings",
    href: "/listings",
  },
  {
    label: "Mentors",
    href: "/mentors",
  },
  {
    label: "My Account",
    href: "/account",
  },
  {
    label: "Log Out",
    href: "/logout",
  },
];

export default function Header() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const [totalCartPrice, setTotalCartPrice] = useState("");
  useEffect(() => {
    const init = async () => {
      const [err, res] = await Api.getCartItems();
      if (res) {
        setTotalCartPrice(res?.data?.totalPrice);
      }
    };
    init();
  }, []);

  const { mobileView, drawerOpen } = state;
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
        {femmecubatorLogo}
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        {/* <IconButton
            {...{
              edge: "start",
              color: "black",
              "aria-label": "menu",
              "aria-haspopup": "true",
              onClick: handleDrawerOpen,
            }}
          >
            <MenuIcon />
          </IconButton> */}

        <IconButton onClick={handleDrawerOpen}>
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div style={{ padding: "20px 30px", color: "black" }}>
            {getDrawerChoices()}
          </div>
        </Drawer>

        <div>{femmecubatorLogo}</div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return <MenuItem>{label}</MenuItem>;
    });
  };

  const femmecubatorLogo = (
    <>
      <Image src={logoImg} sx={{ width: "fix-layout", height: "46px" }} />
    </>
  );

  const getMenuButtons = () => {
    const user_role: any = localStorage.getItem("userRole");
    const logout = () => {
      localStorage.removeItem("authToken");
      navigate("/login");
    };
    const onClickCardHandler = () => {
      navigate("/");
    };
    const onClickBillingHandler = () => {
      navigate("/billings");
    };
    const onClickCartHandler = () => {
      navigate("/orders");
    };
    return (
      <>
        {user_role === "ROLE_SELLER" ? (
          <>
          <Button
            sx={{
              fontFamily: "Open Sans, sans-serif",
              fontWeight: 500,
              size: "15px",
              marginLeft: "18px",
              color: "black",
            }}
            onClick={() => navigate("/merchant-dashboard")}
          >
            Dashboard
          </Button>
           <Button
           sx={{
             fontFamily: "Open Sans, sans-serif",
             fontWeight: 500,
             size: "15px",
             marginLeft: "18px",
             color: "black",
           }}
          //  onClick={onClickCartHandler}
         >
           Order
         </Button>
          </>
        ) : (
          <></>
        )}

        {user_role === "ROLE_USER" ? (
          <>
          <Button
          sx={{
            fontFamily: "Open Sans, sans-serif",
            fontWeight: 500,
            size: "15px",
            marginLeft: "18px",
            color: "black",
          }}
          onClick={onClickCardHandler}
        >
          Cards
        </Button>
        <Button
          sx={{
            fontFamily: "Open Sans, sans-serif",
            fontWeight: 500,
            size: "15px",
            marginLeft: "18px",
            color: "black",
          }}
          onClick={onClickCartHandler}
        >
          Order
        </Button>
        <Button
          sx={{
            fontFamily: "Open Sans, sans-serif",
            fontWeight: 500,
            size: "15px",
            marginLeft: "18px",
            color: "black",
          }}
          onClick={onClickBillingHandler}
        >
          Billings
        </Button>

        <ColorButton
          variant="contained"
          startIcon={<AccountBalanceWalletIcon />}
          sx={{ ml: "18px" }}
        >
          {" "}
          $ 0.00
        </ColorButton>
        <ColorButton
          variant="contained"
          startIcon={<AddShoppingCartIcon />}
          sx={{ ml: "18px" }}
        >
          {" "}
          $ {totalCartPrice}
        </ColorButton>
          </>
        ):(
          <></>
        )}
        
        <ColorButton variant="contained" sx={{ ml: "18px" }} onClick={logout}>
          <LogoutIcon />
        </ColorButton>
      </>
    );
  };

  return (
    <header>
      <AppBar
        sx={{
          backgroundColor: "white",
          paddingRight: "79px",
          paddingLeft: "118px",
          "@media (max-width: 900px)": {
            paddingLeft: 0,
          },
        }}
      >
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}
