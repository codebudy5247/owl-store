import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Typography, Box, TextField, Stack, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import * as Api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import logoImg from "../../images/logo.png";
import layout from "../../images/layout.png";
import Image from "../../components/Image";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#EE2B70",
  backgroundColor: "#FDE7EF",
  "&:hover": {
    backgroundColor: "#EE2B70",
    color: "white",
  },
}));

const Signin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const onClickSubmit = async () => {
    setLoading(true);
    const [signInError, signInResponse] = await Api.signIn(email, password);
    if (signInError) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (signInResponse) {
      console.log(signInResponse?.data?.token);
      localStorage.setItem("authToken", signInResponse?.data?.token);
      navigate("/");
      toast.success("Login Success !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setLoading(false);
  };
  return (
    <>
      <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
        <Box sx={{ width: "50%", height: "100vh", backgroundColor: "#F8AAC6" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              p: 5,
            }}
          >
            <Image disabledEffect src={logoImg} />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              p: 1,
            }}
          >
            <Image
              disabledEffect
              src={layout}
              sx={{ width: 342, height: 342 }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: "50%",
            height: "fix-layout",
            p: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Typography>Welcome back! 👋</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              mb: 2,
            }}
          >
            <Typography>Login to your account</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "column" }}
              spacing={3}
              sx={{ width: "60%" }}
            >
              <TextField
                required={true}
                label="Email"
                variant="outlined"
                onChange={onChangeEmail}
              />
              <TextField
                required={true}
                label="Password"
                variant="outlined"
                onChange={onChangePassword}
              />
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <Link variant="subtitle2">Forgot password?</Link>
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Don’t have an account? {""}? {""}
              <Link
                variant="subtitle2"
                onClick={() => navigate("/register")}
                sx={{ cursor: "pointer" }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              mt: 3,
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "column" }}
              spacing={3}
              sx={{ width: "60%" }}
            >
              <LoadingButton
                fullWidth
                loading={loading}
                size="large"
                type="submit"
                variant="contained"
                onClick={onClickSubmit}
                disabled={!email || !password}
                // sx={{backgroundColor:"#F8AAC6"}}
              >
                SIGNIN
              </LoadingButton>
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              mt: 3,
            }}
          >
            {/* <Typography>Or</Typography> */}
            {/* <Stack
              direction={{ xs: "column", sm: "column" }}
              spacing={3}
              sx={{ width: "60%" }}
            >
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="outlined"
                startIcon={<GoogleIcon />}
                // sx={{backgroundColor:"#F8AAC6"}}
              >
                Signin with Google
              </LoadingButton>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="outlined"
                startIcon={<FacebookIcon />}
                // sx={{backgroundColor:"#F8AAC6"}}
              >
                Signin with Facebook
              </LoadingButton>
            </Stack> */}
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
};

export default Signin;
