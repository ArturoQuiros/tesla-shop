import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React, { FC, useMemo, useState } from "react";
import { IProduct } from "../../interfaces";
import NextLink from "next/link";
import { Loading } from "../ui";

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState("second");

  const productImage = useMemo(() => {
    return isHovered
      ? `/products/${product.images[1]}`
      : `/products/${product.images[0]}`;
  }, [isHovered, product.images]);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <NextLink href={`/products/${product.slug}`} prefetch={false} passHref>
          <Link>
            <CardActionArea>
              {product.inStock === 0 && (
                <Chip
                  color="error"
                  label="Out of Stock"
                  sx={{
                    position: "absolute",
                    zIndex: 99,
                    top: "10px",
                    left: "10px",
                  }}
                />
              )}

              <CardMedia
                component={"img"}
                className="fadeIn"
                image={productImage}
                alt={product.title}
                onLoad={() => {
                  <Loading></Loading>;
                }}
              ></CardMedia>
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box
        sx={{ mt: 1, display: isLoading ? "block" : "none" }}
        className="fadeIn"
      >
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>{`$${product.price}`}</Typography>
      </Box>
    </Grid>
  );
};
