import { Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "white",
  backgroundColor: "#EE2B70",
  "&:hover": {
    backgroundColor: "#EE2B70",
    // color: "white",
  },
}));
const BulkAddCards = () => {
  return (
    <>
    <Stack spacing={2} sx={{mt:2}}>
      <TextField
        fullWidth
        id="filled-multiline-static"
        label="Bulk Add"
        multiline
        rows={4}
        // defaultValue="Enter Amount"
        variant="outlined"
      />
      <TextField
        fullWidth
        id="filled-multiline-static"
        label="Price"
        // defaultValue="Enter Amount"
        variant="outlined"
      />
    </Stack>
     <ColorButton variant="contained" startIcon={<CurrencyExchangeIcon />} sx={{ mt: 3 }}>
       Submit
   </ColorButton>
    </>
    
  );
};

export default BulkAddCards;
