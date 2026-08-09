import { useSelector } from "react-redux";
// internal
import useCartInfo from "@/hooks/use-cart-info";
import ErrorMsg from "../common/error-msg";

const CheckoutOrderArea = ({ checkoutData }) => {
  const {
    handleShippingCost,
    cartTotal = 0,
    register,
    errors,
    isCheckoutSubmit,
    shippingCost,
    discountAmount,
  } = checkoutData;

  const { cart_products } = useSelector((state) => state.cart);
  const { total } = useCartInfo();

  return (
    <div className="tp-checkout-place white-bg">
      <h3 className="tp-checkout-place-title">Your Order</h3>

      <div className="tp-order-info-list">
        <ul>
          <li className="tp-order-info-list-header">
            <h4>Product</h4>
            <h4>Total</h4>
          </li>

          {cart_products.map((item) => {
            const finalPrice =
              Number(item.discount) > 0
                ? Number(item.discount)
                : Number(item.price);

            return (
              <li key={item._id} className="tp-order-info-list-desc">
                <p>
                  {item.title} <span>x {item.orderQuantity}</span>
                </p>

                <span>
                  ₹{(finalPrice * item.orderQuantity).toFixed(2)}
                </span>
              </li>
            );
          })}

          <li className="tp-order-info-list-shipping">
            <span>Shipping</span>

            <div className="tp-order-info-list-shipping-item d-flex flex-column align-items-end">
              <span>
                <input
                  {...register("shippingOption", {
                    required: "Shipping Option is required!",
                  })}
                  id="flat_shipping"
                  type="radio"
                  name="shippingOption"
                />

                <label
                  htmlFor="flat_shipping"
                  onClick={() => handleShippingCost(60)}
                >
                  Delivery: Today Cost :
                  <span>₹60.00</span>
                </label>

                <ErrorMsg msg={errors?.shippingOption?.message} />
              </span>

              <span>
                <input
                  {...register("shippingOption", {
                    required: "Shipping Option is required!",
                  })}
                  id="flat_rate"
                  type="radio"
                  name="shippingOption"
                />

                <label
                  htmlFor="flat_rate"
                  onClick={() => handleShippingCost(20)}
                >
                  Delivery: 7 Days Cost :
                  <span>₹20.00</span>
                </label>

                <ErrorMsg msg={errors?.shippingOption?.message} />
              </span>
            </div>
          </li>

          <li className="tp-order-info-list-subtotal">
            <span>Subtotal</span>
            <span>₹{total.toFixed(2)}</span>
          </li>

          <li className="tp-order-info-list-subtotal">
            <span>Shipping Cost</span>
            <span>₹{shippingCost.toFixed(2)}</span>
          </li>

          <li className="tp-order-info-list-subtotal">
            <span>Discount</span>
            <span>₹{discountAmount.toFixed(2)}</span>
          </li>

          <li className="tp-order-info-list-total">
            <span>Total</span>
            <span>₹{parseFloat(cartTotal).toFixed(2)}</span>
          </li>
        </ul>
      </div>

      <div className="tp-checkout-payment">

        {/* Razorpay */}

        <div className="tp-checkout-payment-item">
          <input
            {...register("payment", {
              required: "Payment Option is required!",
            })}
            type="radio"
            id="razorpay"
            name="payment"
            value="Razorpay"
          />

          <label htmlFor="razorpay">
            Pay Online (Razorpay)
          </label>

          <ErrorMsg msg={errors?.payment?.message} />
        </div>

        {/* COD */}

        <div className="tp-checkout-payment-item">
          <input
            {...register("payment", {
              required: "Payment Option is required!",
            })}
            type="radio"
            id="cod"
            name="payment"
            value="COD"
          />

          <label htmlFor="cod">
            Cash on Delivery
          </label>

          <ErrorMsg msg={errors?.payment?.message} />
        </div>

      </div>

      <div className="tp-checkout-btn-wrapper">
        <button
          type="submit"
          disabled={isCheckoutSubmit}
          className="tp-checkout-btn w-100"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrderArea;