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

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUserName = (e: any) => {
    setUserName(e.target.value);
  };
  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const onClickSubmit = async () => {
    setLoading(true);

    const [signUpError, signUpResponse] = await Api.signUp(
      username,
      email,
      password
    );
    if (signUpError) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (signUpResponse) {
      console.log({ signUpResponse });
      localStorage.setItem("authToken", signUpResponse?.data?.token);
      navigate("/");
      toast.success("Register Success !", {
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
            <Typography>
              Create a free account on devias and get started 👋
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              mb: 2,
            }}
          >
            <Typography>Create Account</Typography>
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
                label="User name"
                variant="outlined"
                onChange={onChangeUserName}
              />
              <TextField
                required={true}
                label="Email ID"
                variant="outlined"
                onChange={onChangeEmail}
              />
              <TextField
                required={true}
                label="Password"
                variant="outlined"
                onChange={onChangePassword}
              />

              {/* <TextField
                label="Password"
                id="password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Iconify
                          icon={
                            showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={onChangePassword}
              /> */}

              {/* <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
                <TextField label="15+2" variant="outlined" disabled />
                <TextField
                  required={true}
                  label="Answer"
                  variant="outlined"
                  // onChange={onChangeAnswer}
                />
              </Stack> */}
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              mt: 5,
            }}
          >
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Already have an account? {""}
              <Link
                variant="subtitle2"
                onClick={() => navigate("/login")}
                sx={{ cursor: "pointer" }}
              >
                Login
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
                disabled={!email || !password || !username}
                onClick={onClickSubmit}
                // sx={{backgroundColor:"#F8AAC6"}}
              >
                SIGNUP
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
              >
                Signup with Google
              </LoadingButton>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="outlined"
                startIcon={<FacebookIcon />}
              >
                Signup with Facebook
              </LoadingButton>
            </Stack> */}
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
};

export default Signup;
