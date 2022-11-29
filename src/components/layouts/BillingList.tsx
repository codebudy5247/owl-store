import { Box, Card } from "@mui/material";
import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
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
  Container,
} from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";
import * as Api from "../../services/api";
import moment from "moment";
import { Icon } from "@iconify/react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import EmptyContent from "../../components/EmptyContent";
import EmtyCartImg from "../../images/empty-cart.png"

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#EE2B70",
  backgroundColor: "#FDE7EF",
  "&:hover": {
    backgroundColor: "#EE2B70",
    color: "white",
  },
}));

const TABLE_HEAD = [
  { id: "bin", label: "Bin", alignRight: false },
  { id: "base", label: "Base", alignRight: false },
  { id: "zip", label: "Zip", alignRight: false },
  { id: "city", label: "City", alignRight: true },
  { id: "state", label: "State", alignRight: true },
  { id: "country", label: "Country", alignRight: true },
  { id: "price", label: "Price", alignRight: true },
];

const BillingList = () => {
  const [cartItems, setCartItems] = useState<any>();
  const [loading, setLoading] = useState(false);
  const getUserCart = async () => {
    const [err, res] = await Api.getCartItems();
    if (res) {
      setCartItems(res?.data?.cart);
    }
  };

  useEffect(() => {
    const init = async () => {
      getUserCart();
    };
    init();
  }, []);

  const removeFromCart = async (itemID: any) => {
    setLoading(true);
    const [error, response] = await Api.removeItem(itemID);
    if (error) {
      toast.error("Something went wrong.Plz try after sometime.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (response?.status === 200) {
      getUserCart();
      toast.info(response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setLoading(false);
  };

  const displayIcon = (type: any) => {
    if (type === "master")
      return <Icon icon="logos:mastercard" height={40} width={40} />;
    if (type === "visa")
      return <Icon icon="logos:visa" height={40} width={40} />;
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          mt: 4,
        }}
      >
        <Box>
          <ColorButton variant="contained" startIcon={<AddIcon />}>
            {" "}
            Add Money
          </ColorButton>
        </Box>
      </Box>
      <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
        <Card sx={{ borderRadius: 5, p: 3 }}>
          {cartItems?.length === 0 || cartItems === undefined ? (
            <EmptyContent
                  title="Cart is empty"
                  description="Look like you have no items in your shopping cart."
                  img={EmtyCartImg}
                />
          ) : (
            <TableContainer sx={{ minWidth: 500 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {TABLE_HEAD?.map((headCell) => (
                      <TableCell key={headCell.id}>
                        <TableSortLabel hideSortIcon>
                          {headCell.label}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems?.map((card: any) => (
                    <>
                      <TableRow key={card?.itemId?._id}>
                        <TableCell sx={{ display: "flex" }}>
                          {displayIcon(card.itemId.type)}
                          <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ ml: 1, mt: 1 }}
                          >
                            {card?.itemId?.cardNumber?.slice(0, 6)}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ p: 2 }}>
                          <Box
                            sx={{
                              backgroundColor: "#FDE7EF",
                              p: 1,
                              textAlign: "center",
                            }}
                          >
                            <Typography variant="subtitle2" noWrap>
                              {moment(card?.itemId?.base).format("MMMM YY")}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {card?.itemId?.address?.zip}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {card?.itemId?.address?.city}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {card?.itemId?.address?.state}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <img
                            loading="lazy"
                            width="50"
                            height="25"
                            src={`https://countryflagsapi.com/png/${card?.itemId?.address?.country?.toLowerCase()}`}
                            alt=""
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {card?.itemId?.price}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ cursor: "pointer" }}>
                          <ColorButton
                            variant="contained"
                            onClick={() => removeFromCart(card?.itemId?._id)}
                          >
                            {loading ? (
                              <CircularProgress />
                            ) : (
                              <DeleteOutlineIcon />
                            )}
                          </ColorButton>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Card>
      </Container>
    </Box>
  );
};

export default BillingList;
