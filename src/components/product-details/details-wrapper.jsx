import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useDispatch } from "react-redux";
import Link from "next/link";

// internal
import { AskQuestion, CompareTwo, WishlistTwo } from "@/svg";
import DetailsBottomInfo from "./details-bottom-info";
import ProductDetailsCountdown from "./product-details-countdown";
import ProductQuantity from "./product-quantity";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { add_to_compare } from "@/redux/features/compareSlice";
import { handleModalClose } from "@/redux/features/productModalSlice";

const DetailsWrapper = ({
  productItem,
  handleImageActive,
  activeImg,
  detailsBottom = false,
}) => {
  const {
    sku,
    img,
    title,
    imageURLs = [],
    category,
    description,
    discount,
    price,
    status,
    reviews = [],
    tags = [],
    offerDate,
  } = productItem || {};

  const [ratingVal, setRatingVal] = useState(0);
  const [textMore, setTextMore] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (reviews.length > 0) {
      const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [reviews]);

  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };

  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  const handleCompareProduct = (prd) => {
    dispatch(add_to_compare(prd));
  };

  return (
    <div className="tp-product-details-wrapper">
      <div className="tp-product-details-category">
        <span>{category?.name}</span>
      </div>

      <h3 className="tp-product-details-title">{title}</h3>

      {/* Inventory */}

      <div className="tp-product-details-inventory d-flex align-items-center mb-10">
        <div className="tp-product-details-stock mb-10">
          <span>{status}</span>
        </div>

        <div className="tp-product-details-rating-wrapper d-flex align-items-center mb-10">
          <div className="tp-product-details-rating">
            <Rating
              allowFraction
              size={16}
              initialValue={ratingVal}
              readonly
            />
          </div>

          <div className="tp-product-details-reviews">
            <span>({reviews.length} Review)</span>
          </div>
        </div>
      </div>

      <p>
        {textMore
          ? description
          : `${description?.substring(0, 100)}...`}

        <span
          style={{ cursor: "pointer", marginLeft: "5px" }}
          onClick={() => setTextMore(!textMore)}
        >
          {textMore ? "See less" : "See more"}
        </span>
      </p>

      {/* Price */}

      <div className="tp-product-details-price-wrapper mb-20">
        {Number(discount) > 0 ? (
          <>
            <span className="tp-product-details-price old-price">
              ₹{Number(price).toFixed(2)}
            </span>

            <span className="tp-product-details-price new-price">
              ₹{Number(discount).toFixed(2)}
            </span>
          </>
        ) : (
          <span className="tp-product-details-price new-price">
            ₹{Number(price).toFixed(2)}
          </span>
        )}
      </div>

      {/* Color */}

      {imageURLs.some(
        (item) => item?.color && item?.color?.name
      ) && (
        <div className="tp-product-details-variation">
          <div className="tp-product-details-variation-item">
            <h4 className="tp-product-details-variation-title">
              Color :
            </h4>

            <div className="tp-product-details-variation-list">
              {imageURLs.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleImageActive(item)}
                  className={`color tp-color-variation-btn ${
                    item.img === activeImg ? "active" : ""
                  }`}
                >
                  <span
                    data-bg-color={item.color.clrCode}
                    style={{
                      backgroundColor: item.color.clrCode,
                    }}
                  ></span>

                  {item.color?.name && (
                    <span className="tp-color-variation-tootltip">
                      {item.color.name}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {offerDate?.endDate && (
        <ProductDetailsCountdown
          offerExpiryTime={offerDate.endDate}
        />
      )}

      {/* Action */}

      <div className="tp-product-details-action-wrapper">
        <h3 className="tp-product-details-action-title">
          Quantity
        </h3>

        <div className="tp-product-details-action-item-wrapper d-sm-flex align-items-center">
          <ProductQuantity />

          <div className="tp-product-details-add-to-cart mb-15 w-100">
            <button
              onClick={() => handleAddProduct(productItem)}
              disabled={status === "out-of-stock"}
              className="tp-product-details-add-to-cart-btn w-100"
            >
              Add To Cart
            </button>
          </div>
        </div>

        <Link
          href="/cart"
          onClick={() => dispatch(handleModalClose())}
        >
          <button className="tp-product-details-buy-now-btn w-100">
            Buy Now
          </button>
        </Link>
      </div>

      <div className="tp-product-details-action-sm">
        <button
          disabled={status === "out-of-stock"}
          onClick={() => handleCompareProduct(productItem)}
          className="tp-product-details-action-sm-btn"
        >
          <CompareTwo />
          Compare
        </button>

        <button
          disabled={status === "out-of-stock"}
          onClick={() => handleWishlistProduct(productItem)}
          className="tp-product-details-action-sm-btn"
        >
          <WishlistTwo />
          Add Wishlist
        </button>

        <button className="tp-product-details-action-sm-btn">
          <AskQuestion />
          Ask a question
        </button>
      </div>

      {/* Bottom Info */}

      {detailsBottom && (
        <DetailsBottomInfo
          sku={sku}
          category={category?.name}
          tags={tags}
          product={productItem}
        />
      )}
    </div>
  );
};

export default DetailsWrapper;