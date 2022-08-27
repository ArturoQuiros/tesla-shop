import { useContext, useEffect } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { CartList } from "../../components/cart/CartList";
import { OrderSummary } from "../../components/cart";
import { CartContext } from "../../context";
import { countries } from "../../utils";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const SummaryPage = () => {
  const router = useRouter();
  const { shippingInfo } = useContext(CartContext);

  useEffect(() => {
    if (!Cookies.get("firstName")) {
      router.push("/checkout/address");
    }
  }, [router]);

  if (!shippingInfo) {
    return <></>;
  }

  return (
    <ShopLayout title={"Order Summary"} description={"Your order summary"}>
      <Typography variant="h1" component={"h1"}>
        Order Summary
      </Typography>

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

              <Typography>{`${shippingInfo?.firstName} ${shippingInfo?.lastName}`}</Typography>
              <Typography>{shippingInfo?.country} </Typography>
              <Typography>{shippingInfo?.address}</Typography>
              <Typography>{shippingInfo?.zip}</Typography>
              <Typography>{shippingInfo?.phone}</Typography>

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
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirm
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
