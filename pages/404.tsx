import { Box, Typography } from "@mui/material";
import { ShopLayout } from "../components/layouts/ShopLayout";
const Custom404 = () => {
  return (
    <ShopLayout title="Not Found" description="Page not found :(">
      <Box
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <Typography
          variant="h1"
          component={"h1"}
          fontSize={80}
          fontWeight={100}
        >
          404 |
        </Typography>
        <Typography marginLeft={2} fontSize={40} fontWeight={100}>
          Not Found
        </Typography>
      </Box>
    </ShopLayout>
  );
};

export default Custom404;
