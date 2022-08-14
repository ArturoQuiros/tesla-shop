import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";

import NextLink from "next/link";

const emptyPage = () => {
  return (
    <ShopLayout
      title={"Empty Cart"}
      description={"Your cart is empty, keep exploring!"}
    >
      <Box
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <RemoveShoppingCartOutlined
          sx={{ fontSize: 80 }}
        ></RemoveShoppingCartOutlined>
        <Box display={"flex"} flexDirection="column" alignItems={"center"}>
          <Typography variant="h2">Your shopping cart is empty 🙁</Typography>
          <NextLink href={"/"} passHref>
            <Link typography={"h4"} color="secundary">
              Keep Shopping
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default emptyPage;
