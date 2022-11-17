import React, { useEffect, useState } from "react";
import {
  Table,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
  TableHead,
  TableSortLabel,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import moment from "moment";
import * as Api from "../services/api";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#EE2B70",
  backgroundColor: "#FDE7EF",
  "&:hover": {
    backgroundColor: "#EE2B70",
    color: "white",
  },
}));

const TableComp = (props: any) => {
  const TABLE_HEAD = [
    { id: "bin", label: "Bin", alignRight: false },
    { id: "base", label: "Base", alignRight: false },
    { id: "zip", label: "Zip", alignRight: false },
    { id: "city", label: "City", alignRight: true },
    { id: "state", label: "State", alignRight: true },
    { id: "country", label: "Country", alignRight: true },
    { id: "lavel", label: "Lavel", alignRight: true },
    { id: "class", label: "Class", alignRight: true },
    { id: "extra", label: "Extra", alignRight: true },
    { id: "price", label: "Price", alignRight: true },
  ];
  const [cartItems, setCartItems] = useState<any>();

  //Check item is present or not in the cart.
  function checkItem(arr: any, item_id: string) {
    const found = arr.some((el: any) => el.itemId._id === item_id);
    if (found) return true;
  }

  const addToCart = async (item_id: string) => {
    let itemIsPresentOrNot = checkItem(cartItems, item_id);

    if (itemIsPresentOrNot === true) {
      toast.info("This item already exist in your cart.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const [addToCartError, addToCartResponse] = await Api.addToCart(item_id);
      if (addToCartError) {
        toast.error("Something went wrong.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (addToCartResponse) {
        toast.success("Item successfully added to cart.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  useEffect(() => {
    const getCart = async () => {
      const [getUserCartErr, getUserCartRes] = await Api.getCartItems();
      if (getUserCartErr) {
        toast.error("Something went wrong.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setCartItems(getUserCartRes?.data?.cart);
    };
    getCart();
  }, []);

  return (
    <>
      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              {TABLE_HEAD.map((headCell) => (
                <TableCell key={headCell.id}>
                  <TableSortLabel hideSortIcon>{headCell.label}</TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.cardList.map((card: any) => (
              <>
                <TableRow key={card?._id}>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" noWrap>
                      {card?.bin}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" noWrap>
                      {moment(card?.base).format("DD-MM-YYYY,h:mm a")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" noWrap>
                      {card?.zip}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" noWrap>
                      {card?.city}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" noWrap>
                      {card?.state}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <img
                      loading="lazy"
                      width="50"
                      height="25"
                      src={`https://countryflagsapi.com/png/${card?.country.toLowerCase()}`}
                      alt=""
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" noWrap>
                      {card?.level}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" noWrap>
                      {card?.class}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" noWrap>
                      {card?.extraField}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" noWrap>
                      {card?.price}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ cursor: "pointer" }}>
                    <ColorButton
                      variant="contained"
                      onClick={() => addToCart(card?._id)}
                    >
                      <AddShoppingCartIcon />
                    </ColorButton>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableComp;
