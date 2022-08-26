import NextLink from "next/link";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils";
import { tesloAPI } from "../../api";
import { ErrorOutline } from "@mui/icons-material";
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
  const { loginUser } = useContext(AuthContext);
  const router = useRouter();

  const destination = router.query.page?.toString() || "/";

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    const isValidLogin = await loginUser(email, password);

    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    router.replace(destination);
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
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
