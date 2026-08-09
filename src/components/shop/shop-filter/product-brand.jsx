import React from "react";
import Image from "next/image";
// internal
import ErrorMsg from "@/components/common/error-msg";
import { useGetActiveBrandsQuery } from "@/redux/features/brandApi";
import ShopBrandLoader from "@/components/loader/shop/shop-brand-loader";

const ProductBrand = () => {

  const { data: brands, isError, isLoading } = useGetActiveBrandsQuery();

  // Open Brand Website
  const openWebsite = (website) => {

    if (!website) return;

    let url = website.trim();

    if (
      !url.startsWith("http://") &&
      !url.startsWith("https://")
    ) {
      url = `https://${url}`;
    }

    window.open(url, "_blank", "noopener,noreferrer");

  };

  let content = null;

  if (isLoading) {

    content = <ShopBrandLoader loading={isLoading} />;

  } else if (!isLoading && isError) {

    content = <ErrorMsg msg="There was an error" />;

  } else if (!isLoading && !isError && brands?.result?.length === 0) {

    content = <ErrorMsg msg="No Brands found!" />;

  } else if (!isLoading && !isError && brands?.result?.length > 0) {

    const sortedBrands = brands.result
      .slice()
      .sort((a, b) => b.products.length - a.products.length);

    const brand_items = sortedBrands.slice(0, 6);

    content = brand_items.map((b) => (

      <div
        key={b._id}
        className="tp-shop-widget-brand-item"
      >

        <div
          style={{
            cursor: "pointer",
            display: "inline-block",
          }}
          onClick={() => openWebsite(b.website)}
        >

          <Image
            src={b.logo}
            alt={b.name}
            width={60}
            height={50}
          />

        </div>

      </div>

    ));

  }

  return (
    <div className="tp-shop-widget mb-50">

      <h3 className="tp-shop-widget-title">
        Popular Brands
      </h3>

      <div className="tp-shop-widget-content">

        <div className="tp-shop-widget-brand-list d-flex align-items-center justify-content-between flex-wrap">

          {content}

        </div>

      </div>

    </div>
  );
};

export default ProductBrand;