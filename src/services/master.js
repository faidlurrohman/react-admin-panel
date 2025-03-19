import api from "services";
import { URLParams } from "utils";

export const getProducts = (params) => {
  return api.get(URLParams("/products", params));
};
