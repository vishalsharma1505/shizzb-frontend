import React from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";

const PrivacyPolicy = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Privacy Policy" />
      <HeaderTwo style_2={true} />

      <section className="tp-policy-area pt-90 pb-90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">

              {/* Header */}
              <div className="text-center mb-5">
                <h2 className="tp-section-title">Privacy Policy</h2>
                <p className="text-muted mt-2">
                  Effective Date: July 2026
                </p>
              </div>

              {/* Content Box */}
              <div className="tp-policy-box bg-white p-5 shadow-sm rounded">

                <p className="mb-4">
                  This Privacy Policy explains how{" "}
                  <strong>
                    <a
                      href="https://shizzb.in"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ShizzB.in
                    </a>
                  </strong>{" "}
                  ("we", "our", "us") collects, uses, and protects your personal information
                  when you use our website and services. By using our platform, you agree to
                  this policy.
                </p>

                <hr className="my-4" />

                <h4 className="mb-3">1. Information We Collect</h4>
                <ul className="mb-4">
                  <li>Name, email, phone number</li>
                  <li>Billing and shipping address</li>
                  <li>Order and payment details</li>
                  <li>Device and browser data</li>
                  <li>Cookies and usage data</li>
                </ul>

                <hr className="my-4" />

                <h4 className="mb-3">2. How We Use Information</h4>
                <ul className="mb-4">
                  <li>Process orders and payments</li>
                  <li>Deliver products and updates</li>
                  <li>Customer support</li>
                  <li>Improve website experience</li>
                  <li>Send offers (if allowed)</li>
                </ul>

                <hr className="my-4" />

                <h4 className="mb-3">3. Cookies Policy</h4>
                <p className="mb-4">
                  We use cookies to improve user experience, store cart items,
                  and remember preferences. You can disable cookies in browser settings.
                </p>

                <hr className="my-4" />

                <h4 className="mb-3">4. Data Security</h4>
                <p className="mb-4">
                  We use encryption and secure servers to protect your data.
                  However, no system is 100% secure.
                </p>

                <hr className="my-4" />

                <h4 className="mb-3">5. Sharing Information</h4>
                <ul className="mb-4">
                  <li>Payment gateways</li>
                  <li>Delivery partners</li>
                  <li>Analytics services</li>
                  <li>Legal authorities (if required)</li>
                </ul>

                <hr className="my-4" />

                <h4 className="mb-3">6. Your Rights</h4>
                <ul className="mb-4">
                  <li>Access your data</li>
                  <li>Update or delete data</li>
                  <li>Withdraw consent</li>
                </ul>

                <hr className="my-4" />

                <h4 className="mb-3">7. Data Retention</h4>
                <p className="mb-4">
                  We store data only as long as necessary for legal and business purposes.
                </p>

                <hr className="my-4" />

                {/* CONTACT SECTION UPDATED */}
                <h4 className="mb-3">8. Contact Us</h4>

                <p className="mb-2">
                  If you have any questions regarding this Privacy Policy, contact us:
                </p>

                <p className="mb-2">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:contact@shizzb.in"
                    style={{ color: "#0d6efd", textDecoration: "none" }}
                  >
                    contact@shizzb.in
                  </a>
                </p>

                <p className="mb-0">
                  <strong>Website:</strong>{" "}
                  <a
                    href="https://shizzb.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0d6efd", textDecoration: "none" }}
                  >
                    https://shizzb.in
                  </a>
                </p>

              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default PrivacyPolicy;