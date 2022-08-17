import { Box, CircularProgress } from "@mui/material";
import React from "react";

export const Loading = () => {
  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      height="calc(100vh - 200px)"
      sx={{ flexDirection: { xs: "column", sm: "row" } }}
    >
      <CircularProgress size={"200px"} thickness={2}></CircularProgress>
    </Box>
  );
};
