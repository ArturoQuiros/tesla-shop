import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { initialData } from "../../database/products";
import NextLink from "next/link";
import { ItemCounter } from "../ui";

const productsinCard = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  isEditable?: boolean;
}

export const CartList: FC<Props> = ({ isEditable = false }) => {
  return (
    <>
      {productsinCard.map((product) => (
        <Grid container spacing={2} sx={{ mb: 1 }} key={product.slug}>
          <Grid item xs={3}>
            <NextLink href={"/products/slug"}>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images[0]}`}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  ></CardMedia>
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display={"flex"} flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>

              <Typography variant="body1">
                Size: <strong>M</strong>
              </Typography>

              {isEditable ? (
                <ItemCounter></ItemCounter>
              ) : (
                <Typography>
                  Quantity: <strong>3</strong>
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems={"center"}
            flexDirection="column"
          >
            <Typography variant="subtitle2">{`$${product.price}`} </Typography>

            {isEditable && (
              <Button variant="text" color="secondary">
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
