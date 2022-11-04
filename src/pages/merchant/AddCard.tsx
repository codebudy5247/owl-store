import {
  Card,
  Container,
  Box,
  Typography,
  Stack,
  TextField,
  Chip,
  Autocomplete,
  InputLabel,
} from "@mui/material";
import React from "react";
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
  return (
    <>
      <Stack spacing={2} sx={{mt:2}}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          <TextField fullWidth id="base" label="Base" variant="outlined" />
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
          />
          <TextField fullWidth id="bins" label="Bins" variant="outlined" />
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
                label="Only for USA"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          <Autocomplete
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
          />
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          <TextField fullWidth id="zip" label="Zip code" variant="outlined" />
          <TextField fullWidth id="city" label="City" variant="outlined" />
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          <TextField fullWidth id="type" label="Type" variant="outlined" />
          <TextField
            fullWidth
            id="bankname"
            label="Bank name"
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
