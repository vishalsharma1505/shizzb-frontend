import React from "react";

const ProductPricing = ({ product, handleChange }) => {
  return (
    <div className="product-card">

      <h4>Pricing</h4>

      <div className="product-grid">

        <div className="product-group">

          <label>Regular Price</label>

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter Price"
          />

        </div>

        <div className="product-group">

          <label>Discount Price</label>

          <input
            type="number"
            name="discount"
            value={product.discount}
            onChange={handleChange}
            placeholder="Enter Discount"
          />

        </div>

      </div>

    </div>
  );
};

export default ProductPricing;