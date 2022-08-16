import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import useSWR from "swr";

const fetcher = (...args: [key: string]) =>
  fetch(...args).then((res) => res.json());

const HomePage: NextPage = () => {
  const { data, error } = useSWR("/api/products", fetcher);

  return (
    <>
      <ShopLayout title="Teslo Shop" description="Welcome to Teslo Shop">
        <Typography variant="h1" component={"h1"}>
          Teslo Shop
        </Typography>
        <Typography variant="h2" component={"h1"} sx={{ mb: 1 }}>
          Todos los productos
        </Typography>

        <ProductList products={data}></ProductList>
      </ShopLayout>
    </>
  );
};

export default HomePage;
