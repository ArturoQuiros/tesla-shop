import React from "react";
import { NextPage } from "next";
import { Box, Button, Grid, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import {
  ProductSizeSelector,
  ProductSlideShow,
} from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { IProduct } from "../../interfaces";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  return (
    <ShopLayout
      title={`${product.title}`}
      description={`${product.description}`}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display={"flex"} flexDirection={"column"}>
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {`$${product.price}`}
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2"> Quantity</Typography>
              <ItemCounter></ItemCounter>
              <ProductSizeSelector
                //selectedSize={product.sizes[1]}
                sizes={product.sizes}
              ></ProductSizeSelector>
            </Box>

            <Button color="secondary" className="circular-btn">
              Add to Cart
            </Button>

            {
              //            <Chip label="Not in stock" color="error" variant="outlined" />
            }
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import { getProductBySlug } from "../../database";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const product = await getProductBySlug(slug); // your fetch function here

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { product },
  };
};

export default ProductPage;
