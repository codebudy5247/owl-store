import { Box, Stack, TextField, Autocomplete } from "@mui/material";
import React, { useState } from "react";
import { countries } from "../../_mock/_countries";
import { USAstates } from "../../_mock/_usStates";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "white",
  backgroundColor: "#EE2B70",
  "&:hover": {
    backgroundColor: "#EE2B70",
    // color: "white",
  },
}));

const classOption = [
  {
    value: "credit",
    label: "Credit",
  },
  {
    value: "debit",
    label: "Debit",
  },
];

const levelOption = [
  {
    value: "classic",
    label: "Classic",
  },
  {
    value: "platinum",
    label: "Platinum",
  },
];
const AddCard = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          <TextField
            required={true}
            fullWidth
            id="base"
            label="CC Number"
            variant="outlined"
          />
          <TextField
            type="date"
            fullWidth
            id="base"
            label="Expiry Date"
            variant="outlined"
            defaultValue="2017-05-24"
            InputLabelProps={{ shrink: true, required: true }}
          />
          {/* <DateSelector /> */}
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          <TextField
            required={true}
            fullWidth
            id="base"
            label="CVV"
            variant="outlined"
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          <TextField
            required={true}
            fullWidth
            id="base"
            label="Address"
            variant="outlined"
            multiline
            rows={3}
          />
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          <TextField
            required={true}
            fullWidth
            id="base"
            label="Zip Code"
            variant="outlined"
          />
          <Autocomplete
            fullWidth
            id="country-select-demo"
            // sx={{ width: 400 }}
            options={countries}
            // onChange={onChangeCountryCode}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.label} ({option.code})
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          <Autocomplete
            fullWidth
            id="country-select-demo"
            options={USAstates}
            // onChange={onChangeCountryCode}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                {option.label}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="States"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          {/* <Autocomplete
            fullWidth
            id="country-select-demo"
            options={levelOption}
            // onChange={onChangeCountryCode}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                {option.label}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Lavel"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          /> */}
          <TextField
            required={true}
            fullWidth
            id="zip"
            label="City"
            variant="outlined"
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          {/* <Autocomplete
            fullWidth
            id="country-select-demo"
            options={classOption}
            // onChange={onChangeCountryCode}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                {option.label}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Class"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          /> */}
          <TextField
            type="date"
            fullWidth
            id="dob"
            label="Date Of Birth"
            variant="outlined"
            defaultValue="2017-05-24"
            InputLabelProps={{ shrink: true, required: true }}
          />
          <TextField
            required={true}
            fullWidth
            id="dob"
            label="SSN"
            variant="outlined"
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          <TextField
            required={true}
            fullWidth
            id="zip"
            label="DL"
            variant="outlined"
          />
          <TextField
            required={true}
            fullWidth
            id="city"
            label="Other Details"
            variant="outlined"
          />
        </Stack>
      </Stack>
      <ColorButton variant="contained" startIcon={<AddIcon />} sx={{ mt: 3 }}>
        Add
      </ColorButton>
    </>
  );
};

export default AddCard;
