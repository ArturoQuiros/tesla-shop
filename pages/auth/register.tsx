import NextLink from "next/link";
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
import { useForm } from "react-hook-form";
import { tesloAPI } from "../../api";
import { validations } from "../../utils";
import { useState } from "react";
import { ErrorOutline } from "@mui/icons-material";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);

  const onRegisterUser = async ({ name, email, password }: FormData) => {
    setShowError(false);

    try {
      const { data } = await tesloAPI.post("/user/register", {
        email,
        password,
        name,
      });

      const { token, user } = data;
      console.log({ token, user });
    } catch (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      console.log(error);
    }
  };

  return (
    <AuthLayout title={"Login"}>
      <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component={"h1"}>
                Register
              </Typography>
              <Chip
                sx={{ mt: 2, display: showError ? "flex" : "none" }}
                label="Email already in use"
                color="error"
                icon={<ErrorOutline></ErrorOutline>}
                className="fadeIn"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register("name", {
                  required: "Your name is required",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
                label="Full Name"
                variant="filled"
                fullWidth
              ></TextField>
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
                Register
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent={"center"}>
              <NextLink href={`/auth/login`} passHref>
                <Link underline="always">LogIn</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
