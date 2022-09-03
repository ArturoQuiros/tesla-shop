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
import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { SummaryTile } from "../../components/admin";
import { AdminLayout } from "../../components/layouts";

const DashboardPage = () => {
  return (
    <AdminLayout
      title={"Dashboard"}
      subTitle={"Stats"}
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTile
          title={"99"}
          subTitle={"Total Orders"}
          icon={
            <CreditCardOutlined
              color="primary"
              sx={{ fontSize: 40 }}
            ></CreditCardOutlined>
          }
        />

        <SummaryTile
          title={"99"}
          subTitle={"Paid Orders"}
          icon={
            <AttachMoneyOutlined
              color="secondary"
              sx={{ fontSize: 40 }}
            ></AttachMoneyOutlined>
          }
        />

        <SummaryTile
          title={"99"}
          subTitle={"Pending Orders"}
          icon={
            <CreditCardOffOutlined
              color="error"
              sx={{ fontSize: 40 }}
            ></CreditCardOffOutlined>
          }
        />

        <SummaryTile
          title={"99"}
          subTitle={"Users"}
          icon={
            <GroupOutlined color="error" sx={{ fontSize: 40 }}></GroupOutlined>
          }
        />

        <SummaryTile
          title={"99"}
          subTitle={"Out of Stock"}
          icon={
            <CancelPresentationOutlined
              color="error"
              sx={{ fontSize: 40 }}
            ></CancelPresentationOutlined>
          }
        />

        <SummaryTile
          title={"99"}
          subTitle={"Out of Stock"}
          icon={
            <ProductionQuantityLimitsOutlined
              color="error"
              sx={{ fontSize: 40 }}
            ></ProductionQuantityLimitsOutlined>
          }
        />

        <SummaryTile
          title={"99"}
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
