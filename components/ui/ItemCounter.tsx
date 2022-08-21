import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { trusted } from "mongoose";
import { FC, useState } from "react";

interface Props {
  currentValue: number;
  updateQuantity: (quantity: number) => void;
  maxValue: number;
}

export const ItemCounter: FC<Props> = ({
  currentValue = 1,
  updateQuantity,
  maxValue,
}) => {
  const [quantity, setQuantity] = useState<number>(currentValue);

  return (
    <Box display={"flex"} alignItems="center">
      <IconButton
        onClick={() => {
          setQuantity(quantity - 1);
          updateQuantity(quantity - 1);
        }}
        disabled={quantity > 1 ? false : true}
      >
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ widnth: 40, textAlign: "center" }}>
        {quantity}
      </Typography>

      <IconButton
        onClick={() => {
          setQuantity(quantity + 1);
          updateQuantity(quantity + 1);
        }}
        disabled={quantity <= maxValue ? false : true}
      >
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
