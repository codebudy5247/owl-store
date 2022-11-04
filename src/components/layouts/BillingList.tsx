import { Box } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
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
const BillingList = () => {
  return (
    <Box
      sx={{
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        mt: 4,
      }}
    >
      <Box>
        <ColorButton
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ ml: "18px" }}
        >
          {" "}
          Add Money
        </ColorButton>
      </Box>
    </Box>
  );
};

export default BillingList;
