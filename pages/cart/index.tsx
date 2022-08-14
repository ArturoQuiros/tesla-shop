import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { ShopLayout } from "../../components/layouts";
import { CartList } from "../../components/cart/CartList";
import { OrderSummary } from "../../components/cart";

const CartPage = () => {
  return (
    <ShopLayout title={"Cart"} description={"Confirm your order"}>
      <Typography variant="h1" component={"h1"}>
        Cart
      </Typography>

      <Grid container sx={{ marginLeft: 2 }}>
        <Grid item xs={12} sm={7}>
          <CartList isEditable={true}></CartList>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                <strong>Order Summary</strong>
              </Typography>
              <Divider sx={{ my: 1 }}> </Divider>
              <OrderSummary></OrderSummary>
              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
