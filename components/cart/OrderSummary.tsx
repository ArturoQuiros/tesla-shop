import { Divider, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../context";
import { currency } from "../../utils";

export const OrderSummary = () => {
  const { numberOfItems, subTotal, taxRate, total } = useContext(CartContext);
  const taxPorcentage = Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100;

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Quantity:</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent={"end"}>
        <Typography>{numberOfItems}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>SubTotal:</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent={"end"}>
        <Typography>{currency.format(subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Tax ({taxPorcentage}%)</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent={"end"}>
        <Typography>{currency.format(taxRate)}</Typography>
      </Grid>

      <Divider></Divider>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography>
          <strong>Total:</strong>
        </Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent={"end"}>
        <Typography>
          <strong>{currency.format(total)}</strong>
        </Typography>
      </Grid>
    </Grid>
  );
};
