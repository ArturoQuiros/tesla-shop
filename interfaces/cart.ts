import { ISize, IType } from "./products";

export interface ICartProduct {
  _id: string;
  image: string;
  price: number;
  sizes: ISize;
  slug: string;
  title: string;
  type: IType;
  gender: "men" | "women" | "kid" | "unisex";
  quantity: number;
}
