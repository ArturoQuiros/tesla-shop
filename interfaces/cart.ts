import { ISize } from "./products";

export interface ICartProduct {
  _id: string;
  image: string;
  price: number;
  size?: ISize;
  slug: string;
  title: string;
  gender: "men" | "women" | "kid" | "unisex";
  quantity: number;
}
