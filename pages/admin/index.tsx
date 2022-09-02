import { DashboardOutlined } from "@mui/icons-material";
import React from "react";
import { AdminLayout } from "../../components/layouts";

const DashboardPage = () => {
  return (
    <AdminLayout
      title={"Dashboard"}
      subTitle={"Stats"}
      icon={<DashboardOutlined />}
    />
  );
};

export default DashboardPage;
