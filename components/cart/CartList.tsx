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
import { ICartProduct, IOrderItem } from "../../interfaces";

interface Props {
  isEditable?: boolean;
  products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ isEditable = false, products }) => {
  const { cart, updateCartQuantity, removeCartProduct } =
    useContext(CartContext);

  const changeCartItemQuantity = (
    product: ICartProduct,
    newQuantity: number
  ) => {
    product.quantity = newQuantity;
    updateCartQuantity(product);
  };

  const removeProductCart = (product: ICartProduct) => {
    removeCartProduct(product);
  };

  const productsToShow = products ? products : cart;

  return (
    <>
      {productsToShow.map((product) => (
        <Grid
          container
          spacing={2}
          sx={{ mb: 1 }}
          key={product.slug + product.size}
        >
          <Grid item xs={3}>
            <NextLink href={`products/${product.slug}`}>
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
                Size: <strong>{product.size}</strong>
              </Typography>

              {isEditable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={99}
                  updateQuantity={(value) => {
                    changeCartItemQuantity(product as ICartProduct, value);
                  }}
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
              <Button
                onClick={() => removeProductCart(product as ICartProduct)}
                variant="text"
                color="secondary"
              >
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
