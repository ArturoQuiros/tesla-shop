import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils";
import { tesloAPI } from "../../api";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    try {
      const { data } = await tesloAPI.post("/user/login", {
        email,
        password,
      });
      const { token, user } = data;

      console.log({ token, user });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout title={"Login"}>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component={"h1"}>
                LogIn
              </Typography>
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
              <NextLink href={`/auth/register`} passHref>
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
