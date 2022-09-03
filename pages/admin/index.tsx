import { useEffect, useState } from "react";
import useSWR from "swr";
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { SummaryTile } from "../../components/admin";
import { AdminLayout } from "../../components/layouts";
import { IDashboardResponse } from "../../interfaces";

const DashboardPage = () => {
  const { data, error } = useSWR<IDashboardResponse>("/api/admin/dashboard", {
    refreshInterval: 30 * 1000,
  });

  const [refreshInterval, setRefreshInterval] = useState(30);
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshInterval((refreshInterval) =>
        refreshInterval > 0 ? refreshInterval - 1 : 30
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!error && !data) {
    return <></>;
  }

  if (error) {
    console.log(error);
    return <Typography>An unexpected error has ocurred</Typography>;
  }

  return (
    <AdminLayout title={"Dashboard"} subTitle={""} icon={<DashboardOutlined />}>
      <Grid container spacing={2}>
        <SummaryTile
          title={`${data?.numberOfOrders}`}
          subTitle={"Total Orders"}
          icon={
            <CreditCardOutlined
              color="primary"
              sx={{ fontSize: 40 }}
            ></CreditCardOutlined>
          }
        />

        <SummaryTile
          title={`${data?.paidOrders}`}
          subTitle={"Paid Orders"}
          icon={
            <AttachMoneyOutlined
              color="secondary"
              sx={{ fontSize: 40 }}
            ></AttachMoneyOutlined>
          }
        />

        <SummaryTile
          title={`${data?.notPaidOrders}`}
          subTitle={"Pending Orders"}
          icon={
            <CreditCardOffOutlined
              color="error"
              sx={{ fontSize: 40 }}
            ></CreditCardOffOutlined>
          }
        />

        <SummaryTile
          title={`${data?.numberOfClients}`}
          subTitle={"Clients"}
          icon={
            <GroupOutlined color="error" sx={{ fontSize: 40 }}></GroupOutlined>
          }
        />

        <SummaryTile
          title={`${data?.noStockProducts}`}
          subTitle={"Out of Stock"}
          icon={
            <CancelPresentationOutlined
              color="error"
              sx={{ fontSize: 40 }}
            ></CancelPresentationOutlined>
          }
        />

        <SummaryTile
          title={`${data?.lowStockProducts}`}
          subTitle={"Out of Stock"}
          icon={
            <ProductionQuantityLimitsOutlined
              color="error"
              sx={{ fontSize: 40 }}
            ></ProductionQuantityLimitsOutlined>
          }
        />

        <SummaryTile
          title={refreshInterval}
          subTitle={"Reaload in"}
          icon={
            <AccessTimeOutlined
              color="error"
              sx={{ fontSize: 40 }}
            ></AccessTimeOutlined>
          }
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
