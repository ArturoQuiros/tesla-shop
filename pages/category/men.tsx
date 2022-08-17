import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { Loading } from "../../components/ui";
import { useProducts } from "../../hooks";

const MenPage: NextPage = () => {
  const { products, isLoading } = useProducts("/products?gender=men");

  return (
    <>
      <ShopLayout title="Teslo Shop - Men" description="Welcome to Teslo Shop">
        <Typography variant="h1" component={"h1"}>
          Men's
        </Typography>
        <Typography variant="h2" component={"h1"} sx={{ mb: 2, mt: 1 }}>
          Products for Men's
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

export default MenPage;
