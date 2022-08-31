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

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "Full Name", width: 200 },
  {
    field: "paid",
    headerName: "Status",
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
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Link underline="always">Go to order</Link>
        </NextLink>
      );
    },
  },
];

const row = [
  { id: 1, paid: true, fullname: "Arturo Quiros" },
  { id: 2, paid: true, fullname: "Arturo Quiros" },
  { id: 3, paid: true, fullname: "Arturo Quiros" },
  { id: 4, paid: true, fullname: "Arturo Quiros" },
  { id: 5, paid: false, fullname: "Arturo Quiros" },
  { id: 6, paid: false, fullname: "Arturo Quiros" },
  { id: 7, paid: false, fullname: "Arturo Quiros" },
  { id: 8, paid: false, fullname: "Arturo Quiros" },
];

interface Props {
  //orders: IOrder[];
  //id: number;
  session: any;
}

const HistoryPage: NextPage<Props> = ({ session }) => {
  console.log({ session });

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

  return {
    props: {
      session,
    },
  };
};
export default HistoryPage;
