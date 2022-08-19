import type { NextPage, GetServerSideProps } from "next";
import { Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { getAllProducts, getProductsByTerm } from "../../database";
import { IProduct } from "../../interfaces";
import { useRouter } from "next/router";
import { Box } from "@mui/system";

interface Props {
  products: IProduct[];
  query: string;
  foundProducts: boolean;
  quantity: number;
}

const HomePage: NextPage<Props> = ({
  products,
  query,
  foundProducts,
  quantity,
}) => {
  return (
    <>
      <ShopLayout
        title="Teslo Shop - Search"
        description="Welcome to Teslo Shop"
      >
        <Box display={"flex"} justifyContent="start">
          <Typography variant="h1" component={"h1"}>
            {"Tesla Shop: "}
          </Typography>
          <Typography
            variant="h1"
            color="secondary"
            component={"h1"}
            sx={{ ml: 1 }}
            textTransform="capitalize"
          >
            {` ${query}`}
          </Typography>
        </Box>

        {quantity !== 0 ? (
          <Typography variant="h2" component={"h1"} sx={{ mt: 1, mb: 2 }}>
            {`${quantity} Products found`}
          </Typography>
        ) : (
          <Typography variant="h2" component={"h1"} sx={{ mt: 1, mb: 2 }}>
            {`No products found, but here's some recomendations! `}
          </Typography>
        )}

        <ProductList products={products}></ProductList>
      </ShopLayout>
    </>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string }; // your fetch function here

  if (query.trim().length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  let products = await getProductsByTerm(query);
  let quantity = products.length;

  const foundProducts = products.length === 0;

  if (!!foundProducts) {
    products = await getAllProducts();
    quantity = 0;
  }

  return {
    props: { products, foundProducts, query, quantity },
  };
};

export default HomePage;
