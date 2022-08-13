import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../components/layouts";

const Home: NextPage = () => {
  return (
    <>
      <ShopLayout title="Teslo Shop" description="Welcome to Teslo Shop">
        <Typography variant="h1" component={"h1"}>
          Teslo Shop
        </Typography>
        <Typography variant="h2" component={"h1"} sx={{ mb: 1 }}>
          Todos los productos
        </Typography>
      </ShopLayout>
    </>
  );
};

export default Home;
