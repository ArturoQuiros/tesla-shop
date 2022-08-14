import { Divider, Grid, Typography } from "@mui/material";
import React from "react";

export const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Quantity:</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent={"end"}>
        <Typography>3</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>SubTotal:</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent={"end"}>
        <Typography>$300</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>IVA:</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent={"end"}>
        <Typography>15%</Typography>
      </Grid>

      <Divider></Divider>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography>
          <strong>Total:</strong>
        </Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent={"end"}>
        <Typography>
          <strong>$345</strong>
        </Typography>
      </Grid>
    </Grid>
  );
};
