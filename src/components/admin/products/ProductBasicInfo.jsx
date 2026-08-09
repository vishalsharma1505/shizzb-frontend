import React from "react";

const ProductBasicInfo = ({ product, handleChange }) => {
  return (
    <div className="product-card">

      <h4>Basic Information</h4>

      <div className="product-grid">

        <div className="product-group">
          <label>
            Product Name <span className="required">*</span>
          </label>

          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Ex. Vitamin C Face Serum"
            required
          />
        </div>

        <div className="product-group">
          <label>Product Code (SKU)</label>

          <input
            type="text"
            name="sku"
            value={product.sku}
            onChange={handleChange}
            placeholder="Ex. SHIZZB-001"
          />
        </div>

        <div className="product-group">
          <label>Unit</label>

          <select
            name="unit"
            value={product.unit}
            onChange={handleChange}
          >
            <option value="pcs">Piece</option>
            <option value="box">Box</option>
            <option value="set">Set</option>
            <option value="ml">ml</option>
            <option value="gm">gm</option>
          </select>
        </div>

      </div>

    </div>
  );
};

export default ProductBasicInfo;