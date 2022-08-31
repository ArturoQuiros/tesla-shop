import { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import { Chip, Grid, Link, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import { IOrder } from "../../interfaces";
import { getSession } from "next-auth/react";
import { dbOrders } from "../../database";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "Full Name", width: 200 },
  { field: "orderId", headerName: "Order ID", width: 250 },
  {
    field: "paid",
    headerName: "Payment",
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <Chip
          label="Paid "
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          label="Pending "
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      );
    },
  },
  {
    field: "order",
    headerName: "Order",
    width: 100,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row.orderId}`} passHref>
          <Link underline="always">Go to order</Link>
        </NextLink>
      );
    },
  },
];

interface Props {
  orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const row = orders.map((order, index) => {
    return {
      id: index,
      paid: order.isPaid,
      fullname: `${order.shippingInfo.firstName}  ${order.shippingInfo.lastName}`,
      orderId: order._id,
    };
  });

  return (
    <ShopLayout title={"Order History"} description={"Orders History"}>
      <Typography variant="h1" component="h1">
        Orders History
      </Typography>

      <Grid container>
        <Grid
          item
          xs={12}
          sx={{ mt: 2, height: "calc(100vh - 200px)", width: "100px" }}
        >
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          ></DataGrid>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/orders?page=/orders/history`,
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getOrderByUserID(session.user._id);

  return {
    props: {
      orders,
    },
  };
};
export default HistoryPage;
