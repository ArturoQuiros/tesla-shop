import React from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Box, Button, Grid, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import {
  ProductSizeSelector,
  ProductSlideShow,
} from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { IProduct } from "../../interfaces";
import { getAllProductsSlugs, getProductBySlug } from "../../database";

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

//paths
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const slugs = await getAllProductsSlugs();

  return {
    paths: slugs.map(({ slug }) => ({
      params: { slug },
    })),

    fallback: "blocking",
  };
};

//server side
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //validates every 24h
  };
};

export default ProductPage;
