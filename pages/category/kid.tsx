import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { Loading } from "../../components/ui";
import { useProducts } from "../../hooks";

const KidPage: NextPage = () => {
  const { products, isLoading } = useProducts("/products?gender=kid");

  return (
    <>
      <ShopLayout title="Teslo Shop - Kid" description="Welcome to Teslo Shop">
        <Typography variant="h1" component={"h1"}>
          Kid's
        </Typography>
        <Typography variant="h2" component={"h1"} sx={{ mb: 2, mt: 1 }}>
          Products for Kid's
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

export default KidPage;
