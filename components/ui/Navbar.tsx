import NextLink from "next/link";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  SearchOutlined,
  ShoppingBagOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";

export const Navbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <NextLink href={"/"} passHref>
          <Link display={"flex"} alignItems="center">
            <Typography variant="h6">Teslo</Typography>
            <Typography sx={{ marginLeft: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1}></Box>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <NextLink href={"/category/men"} passHref>
            <Link>
              <Button>Men</Button>
            </Link>
          </NextLink>
          <NextLink href={"/category/men"} passHref>
            <Link>
              <Button>Women</Button>
            </Link>
          </NextLink>
          <NextLink href={"/category/men"} passHref>
            <Link>
              <Button>Kids</Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1}></Box>

        <IconButton>
          <SearchOutlined />
        </IconButton>

        <NextLink href={"/cart"} passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={2} color={"secondary"}>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
