import store from "@/redux/store";
import { Provider } from "react-redux";
import ReactModal from "react-modal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from "react-toastify";
import Script from "next/script";

import "react-toastify/dist/ReactToastify.css";
import "../styles/index.scss";
import "../styles/admin/ProductForm.scss";
import "../styles/admin/product-view.scss";
import "../styles/admin/login.scss";
import "../styles/admin/dashboard.scss";
import "../styles/admin/order-details.scss";
import "../styles/admin/customers.scss";
import "../styles/admin/contact.scss";
import "../styles/admin/categories.scss";
import "../styles/admin/category-add.scss";
import "../styles/admin/brand.scss";
import "../styles/admin/review.scss";
import "../styles/admin/coupon.scss";
import "../styles/admin/blog.scss";

import { GoogleOAuthProvider } from "@react-oauth/google";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

if (typeof window !== "undefined") {
  ReactModal.setAppElement("body");
}

// Stripe
const NEXT_PUBLIC_STRIPE_KEY =
  "pk_test_51NYXCFGndYsQkAEFifIbJH64sZFMDpF7DcLYvUUN2az3VdK1M7qVPo7Z2j9rhunf3Pd0C3aFLENIxFriJWwx1P6a00lQFqaoc6";

const stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_KEY);

// Google
const NEXT_PUBLIC_GOOGLE_CLIENT_ID =
  "482468768541-aou5r4mlaf9s2m544ubcj83r35o2ei2a.apps.googleusercontent.com";

export default function App({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId={NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <Elements stripe={stripePromise}>

          {/* Razorpay SDK */}
          <Script
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="beforeInteractive"
          />

          <div id="root">
            <Component {...pageProps} />

            {/* Toast */}
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              limit={1}
              theme="light"
            />
          </div>

        </Elements>
      </Provider>
    </GoogleOAuthProvider>
  );
}