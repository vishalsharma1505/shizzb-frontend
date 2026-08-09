import React from "react";
import Image from "next/image";
import payment_option_img from "@assets/img/product/icons/payment-option.png";
import { notifySuccess } from "@/utils/toast";

const DetailsBottomInfo = ({
  sku,
  category,
  tags = [],
  additionalInformation = [],
  product,
}) => {

  const productUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "";

  const shareTitle = product?.title || "";

  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    productUrl
  )}`;

  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(
    `${shareTitle} ${productUrl}`
  )}`;

  const handleInstagram = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      notifySuccess("Product link copied! Paste it on Instagram.");
      window.open("https://www.instagram.com/", "_blank");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      notifySuccess("Product link copied!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* Product Info */}

      <div className="tp-product-details-query">

        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>SKU:</span>
          <p>{sku}</p>
        </div>

        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>Category:</span>
          <p>{category}</p>
        </div>

        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>Tags:</span>
          <p>{tags.length > 0 ? tags.join(", ") : "-"}</p>
        </div>

      </div>

      {/* Additional Information */}

      {additionalInformation.length > 0 && (
        <div className="tp-product-details-query mt-25">

          <h4 className="mb-15">
            Additional Information
          </h4>

          {additionalInformation.map((item, index) => (
            <div
              key={index}
              className="tp-product-details-query-item d-flex align-items-center"
            >
              <span>{item.key} :</span>
              <p>{item.value}</p>
            </div>
          ))}

        </div>
      )}

      {/* Social */}

<div className="tp-product-details-social">

  <span>Share:</span>

  {/* Facebook */}
  <a
    href={facebookShare}
    target="_blank"
    rel="noopener noreferrer"
    className="tp-social-share-btn"
  >
    <i className="fa-brands fa-facebook-f"></i>
  </a>

  {/* WhatsApp */}
  <a
    href={whatsappShare}
    target="_blank"
    rel="noopener noreferrer"
    className="tp-social-share-btn"
  >
    <i className="fa-brands fa-whatsapp"></i>
  </a>

  {/* Instagram */}
  <button
    type="button"
    onClick={handleInstagram}
    className="tp-social-share-btn"
  >
    <i className="fa-brands fa-instagram"></i>
  </button>

  {/* Copy */}
  <button
    type="button"
    onClick={handleCopy}
    className="tp-social-share-btn"
  >
    <i className="fa-regular fa-copy"></i>
  </button>

</div>

      {/* Message */}

      <div className="tp-product-details-msg mb-15">

        <ul>

          <li>30 days easy returns</li>

          <li>Order yours before 2.30pm for same day dispatch</li>

        </ul>

      </div>

      {/* Payment */}

      <div className="tp-product-details-payment d-flex align-items-center flex-wrap justify-content-between">

        <p>
          Guaranteed safe
          <br />
          & secure checkout
        </p>

        <Image
          src={payment_option_img}
          alt="payment_option_img"
        />

      </div>
    </>
  );
};

export default DetailsBottomInfo;

