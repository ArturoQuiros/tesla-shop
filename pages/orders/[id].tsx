import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import { ShopLayout } from "../../components/layouts";
import { CartList } from "../../components/cart/CartList";
import { OrderSummary } from "../../components/cart";
import NextLink from "next/link";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";

const OrderPage = () => {
  return (
    <ShopLayout title={"Order #XXX"} description={"Your order summary"}>
      <Typography variant="h1" component={"h1"}>
        Order #XXX
      </Typography>

      <Chip
        sx={{ my: 2 }}
        label="Not Paid"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      />

      <Chip
        sx={{ my: 2 }}
        label="Paid "
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />
      <Grid container sx={{ marginLeft: 2, marginTop: 2 }}>
        <Grid item xs={12} sm={7}>
          <CartList></CartList>
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Box display={"flex"} justifyContent="space-between">
                <Typography variant="h2">
                  <strong>Order Summary</strong>
                </Typography>
              </Box>

              <Divider sx={{ my: 1 }}> </Divider>

              <Box display={"flex"} justifyContent="space-between">
                <Typography variant="subtitle1">
                  <strong>Shipping Info</strong>
                </Typography>
                <NextLink href={"/checkout/address"} passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <Typography>Arturo Quirós</Typography>
              <Typography>Costa Rica</Typography>
              <Typography>Barrio San Roque, en la casa</Typography>
              <Typography>joseq2408@gmail.com</Typography>
              <Typography>+506 86683305</Typography>

              <Divider sx={{ my: 1 }}> </Divider>
              <Box display={"flex"} justifyContent="space-between">
                <Typography variant="h2">
                  <strong>Order Details</strong>
                </Typography>
                <NextLink href={"/cart"} passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>
              <OrderSummary></OrderSummary>

              <Box sx={{ mt: 3 }}>
                <h1>Pay</h1>
                <Chip
                  sx={{ my: 2 }}
                  label="Paid "
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
