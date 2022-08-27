import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { countries } from "../../utils";
import { ShopLayout } from "../../components/layouts";
import { CartContext } from "../../context";

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  address: string;
  zip: string;
};

const AddressPage = () => {
  const router = useRouter();
  const { updateShipping } = useContext(CartContext);

  const getDatafromCookies = (): FormData => {
    return {
      firstName: Cookies.get("firstName") || "",
      lastName: Cookies.get("lastName") || "",
      phone: Cookies.get("phone") || "",
      country: Cookies.get("country") || "",
      address: Cookies.get("address") || "",
      zip: Cookies.get("zip") || "",
    };
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      country: countries[0].code,
      address: "",
      zip: "",
    },
  });

  const onConfirmInfo = (data: FormData) => {
    updateShipping(data);
    router.push("/checkout/summary");
  };

  useEffect(() => {
    reset(getDatafromCookies());
  }, [reset]);

  return (
    <ShopLayout title={"Order Billing"} description={"Lets finish your order"}>
      <form onSubmit={handleSubmit(onConfirmInfo)} noValidate>
        <Typography variant="h1" component={"h1"}>
          Contact Information
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("firstName", {
                required: "First Name is required",
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              label="First Name"
              variant="filled"
              fullWidth
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("lastName", {
                required: "Last Name is required",
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              label="Last Name"
              variant="filled"
              fullWidth
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            {
              //            <FormControl fullWidth>
            }{" "}
            <TextField
              //select
              {...register("country", {
                required: "Country is required",
              })}
              //defaultValue={Cookies.get("country") || countries[0].code}
              error={!!errors.country}
              helperText={errors.country?.message}
              variant="filled"
              label="Country"
              fullWidth
            >
              {countries.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name}
                </MenuItem>
              ))}
            </TextField>
            {
              //            </FormControl>
            }{" "}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("address", {
                required: "Address is required",
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
              label="Address"
              variant="filled"
              fullWidth
              multiline
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register("zip", {
                required: "Zip Code is required",
              })}
              error={!!errors.zip}
              helperText={errors.zip?.message}
              label="Postcode / ZIP"
              variant="filled"
              fullWidth
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register("phone", {
                required: "Phone number is required",
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              label="Phone"
              variant="filled"
              fullWidth
            ></TextField>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 2,
          }}
          display="flex"
          justifyContent={"center"}
        >
          <Button
            fullWidth
            type="submit"
            color="secondary"
            className="circular-btn"
          >
            Confirm
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

export default AddressPage;
