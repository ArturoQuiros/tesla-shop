import { useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";

import { ICartProduct, IProduct, ISize } from "../../interfaces";
import { getAllProductsSlugs, getProductBySlug } from "../../database";

import { ShopLayout } from "../../components/layouts/ShopLayout";
import {
  ProductSizeSelector,
  ProductSlideShow,
} from "../../components/products";
import { ItemCounter } from "../../components/ui";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 3,
  });

  const selectedSize = (size: ISize) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      size: size,
    }));
  };

  const updateQuantity = (quantity: number) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity: quantity,
    }));
  };

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
              {`$${product.price} `}
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2"> Quantity</Typography>

              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updateQuantity={updateQuantity}
                maxValue={product.inStock}
              />

              <ProductSizeSelector
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onSelectedSize={selectedSize}
              />
            </Box>

            {product.inStock === 0 ? (
              <Chip label="Out of Stock" color="error" variant="outlined" />
            ) : (
              <Button
                disabled={tempCartProduct.size === undefined ? true : false}
                color="secondary"
                className="circular-btn"
              >
                Add to Cart
              </Button>
            )}

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
