import NextLink from "next/link";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../../components/layouts";

const LoginPage = () => {
  return (
    <AuthLayout title={"Login"}>
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component={"h1"}>
              LogIn
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField label="email" variant="filled" fullWidth></TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="password"
              type={"password"}
              variant="filled"
              fullWidth
            ></TextField>
          </Grid>

          <Grid item xs={12}>
            <Button
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
            >
              Login
            </Button>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent={"center"}>
            <NextLink href={`/auth/register`} passHref>
              <Link underline="always">Register</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
