import {
  Box,
  Card,
  Container,
  Grid,
  CardHeader,
  Typography,
  Table,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
  CardContent,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "../../components/layouts/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import OrderSummary from "./OrderSummary";
import EmptyContent from "../../components/EmptyContent";
import EmtyCartImg from "../../images/empty-cart.png";
import { Icon } from "@iconify/react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import * as Api from "../../services/api";
import moment from "moment";
import { toast } from "react-toastify";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "../../components/Image";
import CoinPaymentImg from "../../images/coinpayment.png";
import PerfectMoneyImg from "../../images/perfectmoney.png";

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
  { id: "country", label: "Country", alignRight: true },
  { id: "price", label: "Price", alignRight: true },
];

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<any>();
  const [totalPrice, setTotalPrice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [payWithCoinPayment, setPayWithCoinPayment] = useState(false);
  const [payWithPerfectMoney, setPayWithPerfectMoney] = useState(false);

  const handleChangePayWithCoinPayment = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPayWithCoinPayment(event.target.checked);
    setPaymentMethod("coinpayment");
  };

  const handleChangePayWithPerfectMoney = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPayWithPerfectMoney(event.target.checked);
    setPaymentMethod("perfectmoney");
  };

  const getUserCart = async () => {
    const [err, res] = await Api.getCartItems();
    if (res) {
      setTotalPrice(res?.data?.totalPrice);
      setCartItems(res?.data?.cart);
    }
  };
  useEffect(() => {
    const init = async () => {
      getUserCart();
    };
    init();
  }, []);

  const displayIcon = (type: any) => {
    if (type === "master")
      return <Icon icon="logos:mastercard" height={40} width={40} />;
    if (type === "visa")
      return <Icon icon="logos:visa" height={40} width={40} />;
  };
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

  return (
    <>
      <Navbar totalPrice={totalPrice} />
      <Header title="Checkouts" subtitle="Owl Store > Checkouts" />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} sx={{ mb: 5 }}>
            <Card sx={{ mb: 3, boxShadow: 5, borderRadius: 3 }}>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Cart
                    <Typography
                      component="span"
                      sx={{ color: "text.secondary" }}
                    >
                      &nbsp;({cartItems?.length} item)
                    </Typography>
                  </Typography>
                }
                sx={{ mb: 1 }}
              />

              <CardContent>
                {cartItems?.length === 0 || cartItems === undefined ? (
                  <EmptyContent
                    title="Cart is empty"
                    description="Look like you have no items in your shopping cart."
                    img={EmtyCartImg}
                  />
                ) : (
                  <>
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
                                      {moment(card?.itemId?.base).format(
                                        "MMMM YY"
                                      )}
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Typography variant="subtitle2" noWrap>
                                    {card?.itemId?.address?.zip}
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
                                    onClick={() =>
                                      removeFromCart(card?.itemId?._id)
                                    }
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
                  </>
                )}
              </CardContent>
            </Card>

            {/* Payment OPtions */}

            <Card sx={{ mb: 3, boxShadow: 5, borderRadius: 3 }}>
              <CardHeader
                title={<Typography variant="h6">Payment Options</Typography>}
                sx={{ mb: 1 }}
              />
              <CardContent>
                <Box
                  sx={{
                    border: "1px solid gray",
                    borderRadius: 2,
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Checkbox
                      checked={payWithCoinPayment}
                      onChange={handleChangePayWithCoinPayment}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                    <Box>
                      <Typography variant="subtitle2">
                        Pay with Coin Payment
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        You will be redirected to CoinPayment website to
                        complete your purchase securely
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <Image
                      disabledEffect
                      visibleByDefault
                      alt="coin payment"
                      src={CoinPaymentImg}
                      sx={{ height: 40 }}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    border: "1px solid gray",
                    borderRadius: 2,
                    p: 2,
                    mt: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Checkbox
                      checked={payWithPerfectMoney}
                      onChange={handleChangePayWithPerfectMoney}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                    <Box>
                      <Typography variant="subtitle2">
                        Pay with Perfect Money
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        You will be redirected to PerfectMoney website to
                        complete your purchase securely
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <Image
                      disabledEffect
                      visibleByDefault
                      alt="coin payment"
                      src={PerfectMoneyImg}
                      sx={{ height: 40 }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <ColorButton startIcon={<Icon icon={"eva:arrow-ios-back-fill"} />}>
              Continue Shopping
            </ColorButton>
          </Grid>

          <Grid item xs={12} md={4} sx={{ mb: 5 }}>
            {/* Order Summary */}
            <OrderSummary
              totalItems={cartItems?.length}
              totalPrice={totalPrice}
            />

            <ColorButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={cartItems?.length === 0 || cartItems === undefined}
            >
              Check Out
            </ColorButton>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Checkout;
