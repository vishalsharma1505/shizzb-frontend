import * as dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

//internal import
import useCartInfo from "./use-cart-info";
import { set_shipping } from "@/redux/features/order/orderSlice";
import { set_coupon } from "@/redux/features/coupon/couponSlice";
import { notifyError, notifySuccess } from "@/utils/toast";
import {
  useCreateRazorpayOrderMutation,
  useSaveOrderMutation,
} from "@/redux/features/order/orderApi";
import { useGetOfferCouponsQuery } from "@/redux/features/coupon/couponApi";

const useCheckoutSubmit = () => {
  // offerCoupons
  const { data: offerCoupons, isError, isLoading } = useGetOfferCouponsQuery();
  // addOrder
  const [createRazorpayOrder] =
    useCreateRazorpayOrderMutation();
    const [saveOrder] =
  useSaveOrderMutation();
  // cart_products
  const { cart_products } = useSelector((state) => state.cart);
  // user
  const { user } = useSelector((state) => state.auth);
  // shipping_info
  const { shipping_info } = useSelector((state) => state.order);
  // total amount
  const { total, setTotal } = useCartInfo();
  // couponInfo
  const [couponInfo, setCouponInfo] = useState({});
  //cartTotal
  const [cartTotal, setCartTotal] = useState("");
  // minimumAmount
  const [minimumAmount, setMinimumAmount] = useState(0);
  // shippingCost
  const [shippingCost, setShippingCost] = useState(0);
  // discountAmount
  const [discountAmount, setDiscountAmount] = useState(0);
  // discountPercentage
  const [discountPercentage, setDiscountPercentage] = useState(0);
  // discountProductType
  const [discountProductType, setDiscountProductType] = useState("");
  // isCheckoutSubmit
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);

  // coupon apply message
  const [couponApplyMsg, setCouponApplyMsg] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();


  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  let couponRef = useRef("");

  useEffect(() => {
    if (localStorage.getItem("couponInfo")) {
      const data = localStorage.getItem("couponInfo");
      const coupon = JSON.parse(data);
      setCouponInfo(coupon);
      setDiscountPercentage(coupon.discountPercentage);
      setMinimumAmount(coupon.minimumAmount);
      setDiscountProductType(coupon.productType);
    }
  }, []);

  useEffect(() => {
    if (minimumAmount - discountAmount > total || cart_products.length === 0) {
      setDiscountPercentage(0);
      localStorage.removeItem("couponInfo");
    }
  }, [minimumAmount, total, discountAmount, cart_products]);

  // calculate total and discount value
  useEffect(() => {
    const result = cart_products?.filter(
      (p) => p.productType === discountProductType
    );

    const discountProductTotal = result?.reduce((preValue, currentValue) => {
      const finalPrice =
        Number(currentValue.discount) > 0
          ? Number(currentValue.discount)
          : Number(currentValue.price);

      return preValue + finalPrice * currentValue.orderQuantity;
    }, 0);

    const subTotal = Number((total + shippingCost).toFixed(2));

    const discountTotal = Number(
      ((discountProductTotal * discountPercentage) / 100).toFixed(2)
    );

    const totalValue = Number(
      (subTotal - discountTotal).toFixed(2)
    );

    setDiscountAmount(discountTotal);
    setCartTotal(totalValue);

  }, [
    total,
    shippingCost,
    discountPercentage,
    cart_products,
    discountProductType,
  ]);

  // handleCouponCode
  const handleCouponCode = (e) => {
    e.preventDefault();

    if (!couponRef.current?.value) {
      notifyError("Please Input a Coupon Code!");
      return;
    }
    if (isLoading) {
      return <h3>Loading...</h3>;
    }
    if (isError) {
      return notifyError("Something went wrong");
    }
    const result = offerCoupons?.filter(
      (coupon) => coupon.couponCode === couponRef.current?.value
    );

    if (result.length < 1) {
      notifyError("Please Input a Valid Coupon!");
      return;
    }

    if (dayjs().isAfter(dayjs(result[0]?.endTime))) {
      notifyError("This coupon is not valid!");
      return;
    }

    if (total < result[0]?.minimumAmount) {
      notifyError(
        `Minimum ${result[0].minimumAmount} INR required to Apply this coupon!`
      );
      return;
    } else {
      // notifySuccess(
      //   `Your Coupon ${result[0].title} is Applied on ${result[0].productType}!`
      // );
      setCouponApplyMsg(`Your Coupon ${result[0].title} is Applied on ${result[0].productType} productType!`)
      setMinimumAmount(result[0]?.minimumAmount);
      setDiscountProductType(result[0].productType);
      setDiscountPercentage(result[0].discountPercentage);
      dispatch(set_coupon(result[0]));
      setTimeout(() => {
        couponRef.current.value = "";
        setCouponApplyMsg("")
      }, 5000);
    }
  };

  // handleShippingCost
  const handleShippingCost = (value) => {
    setShippingCost(value);
  };

  //set values
  useEffect(() => {
    setValue("firstName", shipping_info.firstName);
    setValue("lastName", shipping_info.lastName);
    setValue("country", shipping_info.country);
    setValue("address", shipping_info.address);
    setValue("city", shipping_info.city);
    setValue("zipCode", shipping_info.zipCode);
    setValue("contactNo", shipping_info.contactNo);
    setValue("email", shipping_info.email);
    setValue("orderNote", shipping_info.orderNote);
  }, [user, setValue, shipping_info, router]);

  // Razorpay Loader
  const loadRazorpay = () => {
    return new Promise((resolve) => {

      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);

    });
  };

  // submitHandler
  const submitHandler = async (data) => {
    dispatch(set_shipping(data));
    setIsCheckoutSubmit(true);

    let orderInfo = {
      name: `${data.firstName} ${data.lastName}`,
      address: data.address,
      contact: data.contactNo,
      email: data.email,
      city: data.city,
      country: data.country,
      zipCode: data.zipCode,
      shippingOption: data.shippingOption,
      status: "pending",
      cart: cart_products,
      paymentMethod: data.payment,
      subTotal: total,
      shippingCost: shippingCost,
      discount: discountAmount,
      totalAmount: cartTotal,
      orderNote: data.orderNote,
      user: `${user?._id}`,
    };
    
if (data.payment === "Razorpay") {

    const loaded = await loadRazorpay();

    if (!loaded) {
        notifyError("Unable to load Razorpay");
        setIsCheckoutSubmit(false);
        return;
    }

    try {

        const res =
          await createRazorpayOrder({
            amount: Math.round(cartTotal),
          }).unwrap();

        const options = {

            key: "rzp_live_TNh42H7kurGyNL",

            amount: res.order.amount,

            currency: res.order.currency,

            order_id: res.order.id,

            name: "ShizzB Cosmetics",

            description: "Order Payment",

            handler: async function (response) {

                const orderData = {

                    ...orderInfo,

                    paymentMethod: "Razorpay",

                    paymentStatus: "paid",

                    razorpayPaymentId:
                      response.razorpay_payment_id,

                    razorpayOrderId:
                      response.razorpay_order_id,

                };

                try {

    const result =
      await saveOrder(orderData).unwrap();

    localStorage.removeItem("cart_products");
    localStorage.removeItem("couponInfo");
    localStorage.removeItem("shipping_info");

    setIsCheckoutSubmit(false);

    notifySuccess("Payment Successful");

    router.push(`/order/${result.order._id}`);

} catch (err) {

    setIsCheckoutSubmit(false);

    notifyError("Order Save Failed");

}

            },

            theme: {
                color: "#000000",
            },

        };

        const paymentObject =
          new window.Razorpay(options);

        paymentObject.open();
        paymentObject.on("payment.failed", function () {

    setIsCheckoutSubmit(false);

    notifyError("Payment Failed");

});

    }

    catch(err){

        console.log(err);

        setIsCheckoutSubmit(false);
        notifyError("Payment Failed");

    }

}

    if (data.payment === 'COD') {
      try {
        const res = await saveOrder(orderInfo).unwrap();

        localStorage.removeItem("cart_products");
        localStorage.removeItem("couponInfo");
        localStorage.removeItem("shipping_info");

        setIsCheckoutSubmit(false);

        notifySuccess("Your Order Confirmed!");

        router.push(`/order/${res.order._id}`);

      } catch (err) {

        setIsCheckoutSubmit(false);

        notifyError(
          err?.data?.message || "Unable to place order."
        );
      }
    }
  };


  return {
  handleCouponCode,
  couponRef,
  handleShippingCost,
  discountAmount,
  total,
  shippingCost,
  discountPercentage,
  discountProductType,
  isCheckoutSubmit,
  setTotal,
  register,
  errors,
  submitHandler,
  handleSubmit,
  cartTotal,
  couponApplyMsg,
};
};

export default useCheckoutSubmit;
