import { Box, Typography } from "@mui/material";
import React from "react";

const Header = (props:any) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItem: "center",
        backgroundColor: "#F8AAC6",
        mt: -10,
        p: 10,
        // borderBottomLeftRadius: "550px",
        // borderBottomRightRadius: "550px",
        borderRadius:'50%'
      }}
    >
      <Box sx={{mt:'78px'}}>
        <Typography variant="h3">{props?.title}</Typography>
        <Typography variant="body2" sx={{textAlign:'center'}}>{props?.subtitle}</Typography>
      </Box>
    </Box>
  );
};

export default Header;
