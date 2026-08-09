import React from "react";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";

const TermsConditions = () => {
  return (
    <Wrapper>
      <HeaderTwo style_2={true} />

      <div className="tp-section pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">

              <h1 className="text-center mb-30">Terms & Conditions</h1>

              <p>
                These Terms & Conditions govern the use of{" "}
                <strong>
                  <a href="https://shizzb.in" target="_blank" rel="noopener noreferrer">
                    ShizzB.in
                  </a>
                </strong>
                .
                <br />
                By using this website, you agree to all terms mentioned below.
              </p>

              <br />

              <h3>1. Acceptance of Terms</h3>
              <p>
                By accessing ShizzB website, you confirm that you accept these Terms.
                If you do not agree, please stop using the website immediately.
              </p>

              <br />

              <h3>2. Services</h3>
              <p>
                ShizzB provides an online cosmetics shopping platform.
                We can update, modify, or stop any service anytime without notice.
              </p>

              <br />

              <h3>3. User Responsibility</h3>
              <p>
                Users must provide correct details during registration and checkout.
                Any misuse may result in account suspension.
              </p>

              <br />

              <h3>4. Orders</h3>
              <p>
                All orders are subject to availability and confirmation.
                We reserve the right to cancel any order if required.
              </p>

              <br />

              <h3>5. Payments</h3>
              <p>
                Payments are processed via secure third-party gateways.
                We do not store card details.
              </p>

              <br />

              <h3>6. Refund Policy</h3>
              <p>
                Refunds are processed only for eligible cancellations or defective products.
                Processing time: 5–7 working days.
              </p>

              <br />

              <h3>7. Prohibited Activities</h3>
              <p>
                Users must NOT:
                <br /><br />
                • Hack or misuse system<br />
                • Upload harmful content<br />
                • Spam or fraud activities<br />
                • Violate laws
              </p>

              <br />

              <h3>8. Limitation of Liability</h3>
              <p>
                We are not responsible for any indirect or accidental damages.
              </p>

              <br />

              <h3>9. Changes</h3>
              <p>
                We may update these Terms anytime. Continued use means acceptance.
              </p>

              <br />

              <h3>10. Contact</h3>
              <p className="mb-2">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:contact@shizzb.in"
                  style={{ color: "#0d6efd", textDecoration: "none" }}
                >
                  contact@shizzb.in
                </a>
              </p>

              <p className="mb-2">
  <strong>Email:</strong>{" "}
  <a
    href="mailto:info@shizzb.in"
    style={{ color: "#0d6efd", textDecoration: "none" }}
  >
    info@shizzb.in
  </a>
</p>

 <p className="mb-2">
  <strong>Support Email:</strong>{" "}
  <a
    href="mailto:support@shizzb.in"
    style={{ color: "#0d6efd", textDecoration: "none" }}
  >
    support@shizzb.in
  </a>
</p>

            </div>
          </div>
        </div>
      </div>

      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default TermsConditions;