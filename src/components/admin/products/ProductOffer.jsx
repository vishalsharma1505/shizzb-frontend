import React from "react";

const ProductOffer = ({ product, setProduct }) => {

  const formatDate = (date) => {

    if (!date) return "";

    return new Date(date).toISOString().split("T")[0];

  };

  return (

    <div className="product-card">

      <h4>Offer Date</h4>

      <div className="product-grid">

        <div className="product-group">

          <label>Start Date</label>

          <input
            type="date"
            value={formatDate(product?.offerDate?.startDate)}
            onChange={(e) =>
              setProduct({
                ...product,
                offerDate: {
                  ...product.offerDate,
                  startDate: e.target.value,
                },
              })
            }
          />

        </div>

        <div className="product-group">

          <label>End Date</label>

          <input
            type="date"
            value={formatDate(product?.offerDate?.endDate)}
            onChange={(e) =>
              setProduct({
                ...product,
                offerDate: {
                  ...product.offerDate,
                  endDate: e.target.value,
                },
              })
            }
          />

        </div>

      </div>

    </div>

  );

};

export default ProductOffer;