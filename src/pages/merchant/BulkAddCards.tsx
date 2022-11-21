import { Stack, TextField, Typography, Box } from "@mui/material";
import React, { useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Modal from '@mui/material/Modal';
var XLSX = require("xlsx");


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto'
};

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "white",
  backgroundColor: "#EE2B70",
  "&:hover": {
    backgroundColor: "#EE2B70",
    // color: "white",
  },
}));
const BulkAddCards = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [xlsxData,setXlsxData] = useState<any>()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e?.target?.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setXlsxData(json)
        handleOpen()
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click();
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <ColorButton
          variant="contained"
          startIcon={<FileDownloadIcon />}
          sx={{ mt: 3 }}
          onClick={handleInputFileRefClick}
        >
          Import through xlsx/xls file
        </ColorButton>
        <input
          onChange={handleFileInput}
          type="file"
          id="file"
          ref={inputFileRef}
          style={{ display: "none" }}
        />
      </Box>
      <Stack spacing={2} sx={{ mt: 2 }}>
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
      <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
        <ColorButton
          variant="contained"
          startIcon={<CurrencyExchangeIcon />}
          sx={{ mt: 3 }}
        >
          Submit
        </ColorButton>
        {/*  */}
      </Stack>

      <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>{JSON.stringify(xlsxData)}</p>
        </Box>
      </Modal>
    </div>
    </>
  );
};

export default BulkAddCards;
