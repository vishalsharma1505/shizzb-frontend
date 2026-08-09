import React from "react";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import Link from "next/link";
// internal
import ErrorMsg from "@/components/common/error-msg";
import { useGetAllProductsQuery } from "@/redux/features/productApi";
import ShopTopRatedLoader from "@/components/loader/shop/top-rated-prd-loader";

const TopRatedProducts = () => {
  const { data: products, isError, isLoading } = useGetAllProductsQuery();

  let content = null;

  if (isLoading) {
    content = <ShopTopRatedLoader loading={isLoading} />;
  } else if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (!isLoading && !isError && products?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  } else if (!isLoading && !isError && products?.data?.length > 0) {

    // Latest 3 Products
    const product_items = [...products.data]
      .sort(
        (a, b) =>
          new Date(b.createdAt || b._id) -
          new Date(a.createdAt || a._id)
      )
      .slice(0, 3);

    content = product_items.map((item) => (
      <div
        key={item._id}
        className="tp-shop-widget-product-item d-flex align-items-center"
      >
        <div className="tp-shop-widget-product-thumb">
          <Link href={`/product-details/${item._id}`}>
            <Image
              src={item.img}
              alt={item.title}
              width={70}
              height={70}
            />
          </Link>
        </div>

        <div className="tp-shop-widget-product-content">
          <div className="tp-shop-widget-product-rating-wrapper d-flex align-items-center">
            <div className="tp-shop-widget-product-rating">
              <Rating
                allowFraction
                size={16}
                initialValue={item.rating || 0}
                readonly
              />
            </div>

            <div className="tp-shop-widget-product-rating-number">
              <span>({item.rating || 0})</span>
            </div>
          </div>

          <h4 className="tp-shop-widget-product-title">
            <Link href={`/product-details/${item._id}`}>
              {item.title.length > 20
                ? item.title.substring(0, 20) + "..."
                : item.title}
            </Link>
          </h4>

          <div className="tp-shop-widget-product-price-wrapper">
            <span className="tp-shop-widget-product-price">
              ₹
              {Number(
                item.discount > 0 ? item.discount : item.price
              ).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div className="tp-shop-widget mb-50">
      <h3 className="tp-shop-widget-title">
        Latest Products
      </h3>

      <div className="tp-shop-widget-content">
        <div className="tp-shop-widget-product">
          {content}
        </div>
      </div>
    </div>
  );
};

export default TopRatedProducts;