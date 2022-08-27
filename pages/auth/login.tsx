import { useState, useContext, useEffect } from "react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";

import { getProviders, getSession, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils";
import { AuthContext } from "../../context";
import { useRouter } from "next/router";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  const [providers, setProviders] = useState<any>({});
  const router = useRouter();
  const destination = router.query.page?.toString() || "/";

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  const onLoginUser = async ({ email, password }: FormData) => {
    await signIn(`credentials`, { email, password });
  };

  return (
    <AuthLayout title={"Login"}>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component={"h1"}>
                Log In
              </Typography>
              <Chip
                sx={{ mt: 2, display: showError ? "flex" : "none" }}
                label="Wrong password"
                color="error"
                icon={<ErrorOutline></ErrorOutline>}
                className="fadeIn"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register("email", {
                  required: "Your email is required",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                label="Email"
                variant="filled"
                type="email"
                fullWidth
              ></TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register("password", {
                  required: "Your password is required",
                  minLength: {
                    value: 6,
                    message: "Your password must be +6 characters",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                label="Password"
                type={"password"}
                variant="filled"
                fullWidth
              ></TextField>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent={"center"}>
              <NextLink
                href={
                  destination !== "/"
                    ? `/auth/register?page=${destination}`
                    : `/auth/register`
                }
                passHref
              >
                <Link underline="always">Register</Link>
              </NextLink>
            </Grid>

            <Grid
              item
              xs={12}
              display="flex"
              flexDirection={"column"}
              justifyContent={"center"}
            >
              <Divider sx={{ widht: "100%", mb: 2 }} />
              {Object.values(providers)
                .filter((provider: any) => provider.id !== "credentials")
                .map((provider: any) => {
                  return (
                    <Button
                      key={provider.id}
                      variant="outlined"
                      color="primary"
                      fullWidth
                      sx={{ mb: 1 }}
                      onClick={() => signIn(provider.id)}
                    >
                      {provider.name}
                    </Button>
                  );
                })}
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  const { page = "/" } = query;

  if (session) {
    return {
      redirect: {
        destination: page.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
