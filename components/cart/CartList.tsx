import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React, { FC, useContext } from "react";
import NextLink from "next/link";
import { ItemCounter } from "../ui";
import { CartContext } from "../../context";

interface Props {
  isEditable?: boolean;
}

export const CartList: FC<Props> = ({ isEditable = false }) => {
  const { cart } = useContext(CartContext);
  return (
    <>
      {cart.map((product) => (
        <Grid container spacing={2} sx={{ mb: 1 }} key={product.slug}>
          <Grid item xs={3}>
            <NextLink href={"/products/slug"}>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.image}`}
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
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={99}
                  updateQuantity={() => {}}
                ></ItemCounter>
              ) : (
                <Typography>
                  Quantity: <strong>{product.quantity} products</strong>
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
