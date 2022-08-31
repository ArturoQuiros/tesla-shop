import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { CartList } from "../../components/cart/CartList";
import { OrderSummary } from "../../components/cart";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces";
import { PayPalButtons } from "@paypal/react-paypal-js";

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  return (
    <ShopLayout title={`Order Summary`} description={"Your order summary"}>
      <Typography variant="h1" component={"h1"}>
        Order #{order._id}
      </Typography>

      {!order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Not Paid"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Paid "
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      )}

      <Grid container sx={{ marginLeft: 2, marginTop: 2 }}>
        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems}></CartList>
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
              </Box>

              <Typography>{`${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`}</Typography>
              <Typography>{order.shippingInfo.country}</Typography>
              <Typography>{order.shippingInfo.address}</Typography>
              <Typography>{order.shippingInfo.phone}</Typography>
              <Typography>{order.shippingInfo.zip}</Typography>

              <Divider sx={{ my: 1 }}> </Divider>
              <Box display={"flex"} justifyContent="space-between">
                <Typography variant="h2">
                  <strong>Order Details</strong>
                </Typography>
              </Box>

              <OrderSummary order={order} />
              <Divider sx={{ my: 1 }}> </Divider>

              <Grid item xs={12}>
                {order.isPaid ? (
                  <Button
                    disabled
                    type="submit"
                    color="secondary"
                    className="circular-btn"
                    size="large"
                    fullWidth
                  >
                    Paid
                  </Button>
                ) : (
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: "999999",
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order!.capture().then((details) => {
                        const name = details.payer.name!.given_name;
                        alert(`Transaction completed by ${name}`);
                      });
                    }}
                  />
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = "" } = query; // your fetch function here
  const session: any = await getSession({ req });

  if (!session) {
    redirect: {
      destination: `/auth/login?page=/orders/${id}`;
      permanent: false;
    }
  }

  const order = await dbOrders.getOrderByID(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    };
  }

  if (order.user !== session?.user._id) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    };
  }

  return {
    props: { order },
  };
};

export default OrderPage;
