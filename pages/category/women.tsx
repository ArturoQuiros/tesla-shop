import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { Loading } from "../../components/ui";
import { useProducts } from "../../hooks";

const WomenPage: NextPage = () => {
  const { products, isLoading } = useProducts("/products?gender=women");

  return (
    <>
      <ShopLayout
        title="Teslo Shop - Women"
        description="Welcome to Teslo Shop"
      >
        <Typography variant="h1" component={"h1"}>
          Women's
        </Typography>
        <Typography variant="h2" component={"h1"} sx={{ mb: 2, mt: 1 }}>
          Products for Women's
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

export default WomenPage;
