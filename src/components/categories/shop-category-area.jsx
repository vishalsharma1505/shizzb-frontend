import React from "react";
import ErrorMsg from "../common/error-msg";
import { useGetShowCategoryQuery } from "@/redux/features/categoryApi";
import { useRouter } from "next/router";
import ShopCategoryLoader from "../loader/shop/shop-category-loader";

const ShopCategoryArea = () => {

  const {
    data: categories,
    isLoading,
    isError,
  } = useGetShowCategoryQuery();

  const router = useRouter();

  // ==========================
  // DEBUG
  // ==========================

  console.log("SHOP CATEGORY COMPONENT");
  console.log("API Response =>", categories);

  // ==========================
  // Category Route
  // ==========================

  const handleCategoryRoute = (title) => {

    router.push(
      `/shop?category=${title
        .toLowerCase()
        .replace("&", "")
        .split(" ")
        .join("-")}`
    );

  };

  // ==========================
  // Render
  // ==========================

  let content = null;

  if (isLoading) {

    content = <ShopCategoryLoader loading={isLoading} />;

  }

  else if (isError) {

    content = <ErrorMsg msg="There was an error loading categories." />;

  }

  else if (!categories?.result?.length) {

    content = <ErrorMsg msg="No Category Found!" />;

  }

  else {

    const category_items = [...categories.result].sort(
      (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
    );

    console.log("Categories Rendering =>", category_items);

    content = category_items.map((item) => (

      <div
        key={item._id}
        className="col-lg-3 col-md-4 col-sm-6"
      >

        <div
          className="tp-category-main-box mb-25 p-relative fix"
          style={{
            background: "#F3F5F7",
            cursor: "pointer",
          }}
          onClick={() => handleCategoryRoute(item.parent)}
        >

          <div className="tp-category-main-content">

            {/* Image */}

            {item.img && (

              <div
                style={{
                  textAlign: "center",
                  marginBottom: "15px",
                }}
              >

                <img
                  src={item.img}
                  alt={item.parent}
                  style={{
                    width: "100%",
                    maxHeight: "180px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />

              </div>

            )}

            <h3 className="tp-category-main-title pb-1">

              <a className="cursor-pointer">

                {item.parent}

              </a>

            </h3>

            <span className="tp-category-main-item">

              {item.products?.length || 0} Products

            </span>

          </div>

        </div>

      </div>

    ));

  }

  return (

    <section className="tp-category-area pb-120">

      <div className="container">

        <div className="row">

          {content}

        </div>

      </div>

    </section>

  );

};

export default ShopCategoryArea;