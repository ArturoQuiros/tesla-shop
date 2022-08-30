import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
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
import { ShopLayout } from "../../components/layouts";
import { CartList } from "../../components/cart/CartList";
import { OrderSummary } from "../../components/cart";
import { CartContext } from "../../context";
import Cookies from "js-cookie";

const SummaryPage = () => {
  const router = useRouter();
  const { shippingInfo } = useContext(CartContext);
  const { createOrder } = useContext(CartContext);
  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!Cookies.get("firstName")) {
      router.push("/checkout/address");
    }
  }, [router]);

  if (!shippingInfo) {
    return <></>;
  }

  const onCreateNewOrder = async () => {
    setIsPosting(true);
    const { hasError, message } = await createOrder();

    if (hasError) {
      setIsPosting(false);
      setErrorMessage(message);
    }

    router.replace(`/orders/${message}`);
  };

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

              <Box sx={{ mt: 3 }} display="flex" flexDirection={"column"}>
                <Button
                  onClick={onCreateNewOrder}
                  color="secondary"
                  className="circular-btn"
                  disabled={!isPosting}
                  fullWidth
                >
                  Confirm
                </Button>

                <Chip
                  color="error"
                  label={errorMessage}
                  sx={{ mt: 1, display: errorMessage ? "flex" : "none" }}
                ></Chip>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
