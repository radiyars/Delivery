import { CartItem } from "../redux/cart/types";
import { calculateTotalCount } from "./calcTotalCount";
import { calculateTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calculateTotalPrice(items);
  const totalCount = calculateTotalCount(items);

  return {
    items: items as CartItem[],
    totalPrice,
    totalCount,
  };
};
