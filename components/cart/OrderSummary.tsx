import { Divider, Grid, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { CartContext } from "../../context";
import { IOrder } from "../../interfaces";
import { currency } from "../../utils";

interface Props {
  order?: IOrder;
}

export const OrderSummary: FC<Props> = ({ order }) => {
  let { numberOfItems, subTotal, taxRate, total } = useContext(CartContext);
  const taxPorcentage = Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100;

  if (order) {
    (numberOfItems = order.numberOfItems),
      (subTotal = order.subTotal),
      (taxRate = order.taxRate),
      (total = order.total);
  }

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
