import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import { Loading } from "../components/ui";
import { useProducts } from "../hooks";

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts("/products");

  return (
    <>
      <ShopLayout title="Teslo Shop" description="Welcome to Teslo Shop">
        <Typography variant="h1" component={"h1"}>
          Teslo Shop
        </Typography>
        <Typography variant="h2" component={"h1"} sx={{ mb: 1 }}>
          Todos los productos
        </Typography>

        {isLoading ? (
          <Loading></Loading>
        ) : (
          <ProductList products={products}></ProductList>
        )}
      </ShopLayout>
    </>
  );
};

export default HomePage;
