import { countries } from "../../utils";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
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
    Cookies.set("firstName", data.firstName);
    Cookies.set("lastName", data.lastName);
    Cookies.set("phone", data.phone);
    Cookies.set("country", data.country);
    Cookies.set("address", data.address);
    Cookies.set("zip", data.zip);

    router.push("/checkout/summary");
  };

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
            <FormControl fullWidth>
              <TextField
                select
                {...register("country", {
                  required: "Country is required",
                })}
                defaultValue={countries[0].code}
                error={!!errors.country}
                helperText={errors.country?.message}
                variant="filled"
                label="Country"
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
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
