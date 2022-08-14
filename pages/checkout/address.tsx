import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { ShopLayout } from "../../components/layouts";

const AddressPage = () => {
  return (
    <ShopLayout title={"Billing"} description={"Lets finish your order"}>
      <Typography variant="h1" component={"h1"}>
        Contact Information
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6}>
          <TextField label="First Name" variant="filled" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Last Name" variant="filled" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select variant="filled" label="Country" value={1}>
              <MenuItem value={1}>Costa Rica</MenuItem>
              <MenuItem value={2}>Honduras</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Address"
            variant="filled"
            fullWidth
            multiline
          ></TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Postcode / ZIP"
            variant="filled"
            fullWidth
          ></TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Phone" variant="filled" fullWidth></TextField>
        </Grid>
      </Grid>
      <Box
        sx={{
          mt: 2,
        }}
        display="flex"
        justifyContent={"center"}
      >
        <Button fullWidth color="secondary" className="circular-btn">
          Confirm Order
        </Button>
      </Box>
    </ShopLayout>
  );
};

export default AddressPage;