import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Table,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TableHead,
  TableSortLabel,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import moment from "moment";

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
  return (
    <TableContainer sx={{ minWidth: 800 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              {/* <Checkbox/> */}
            </TableCell>
            {TABLE_HEAD.map((headCell) => (
              <TableCell
                key={headCell.id}
                // align={headCell.alignRight ? "right" : "left"}
              >
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
                  {/* <Checkbox /> */}
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
                  <ColorButton variant="contained">
                    <AddShoppingCartIcon />
                  </ColorButton>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComp;
