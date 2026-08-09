import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useCartInfo = () => {
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);

  const { cart_products } = useSelector((state) => state.cart);

  useEffect(() => {
    const cart = cart_products.reduce(
      (cartTotal, cartItem) => {
        const {
          price = 0,
          discount = 0,
          orderQuantity = 0,
        } = cartItem;

        // discount field = final selling price
        const finalPrice = discount > 0 ? discount : price;

        const itemTotal = finalPrice * orderQuantity;

        cartTotal.total += itemTotal;
        cartTotal.quantity += orderQuantity;

        return cartTotal;
      },
      {
        total: 0,
        quantity: 0,
      }
    );

    setQuantity(cart.quantity);
    setTotal(Number(cart.total.toFixed(2)));
  }, [cart_products]);

  return {
    quantity,
    total,
    setTotal,
  };
};

export default useCartInfo;