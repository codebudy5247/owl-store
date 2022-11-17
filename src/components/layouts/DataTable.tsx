import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
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
const DataTable = (props: any) => {
  const TABLE_HEAD = [
    { field: "bin", headerName: "Bin" },
    { field: "base", headerName: "Base" },
    { field: "zip", headerName: "Zip" },
    { field: "city", headerName: "City" },
    { field: "state", headerName: "State" },
    { field: "country", headerName: "Country" },
    { field: "lavel", headerName: "Lavel" },
    { field: "class", headerName: "Class" },
    { field: "extra", headerName: "Extra" },
    { field: "price", headerName: "Price" },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: () => {
        return (
          <div className="cellAction">
            <ColorButton variant="contained">
              <AddShoppingCartIcon />
            </ColorButton>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={props?.cardList}
        columns={TABLE_HEAD.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
