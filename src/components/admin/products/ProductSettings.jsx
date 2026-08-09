import React from "react";

const ProductSettings = ({
  product,
  handleChange,
}) => {
  return (

    <div className="product-card">

      <h4>Product Settings</h4>

      <div className="product-grid">

        <div className="product-group">

          <label>Status</label>

          <select
            name="status"
            value={product.status}
            onChange={handleChange}
          >

            <option value="in-stock">
  In Stock
</option>

<option value="out-of-stock">
  Out Of Stock
</option>

<option value="discontinued">
  Discontinued
</option>

          </select>

        </div>

        <div className="product-group full">

  <label className="checkbox-inline">

    <input
      type="checkbox"
      name="featured"
      checked={product.featured}
      onChange={handleChange}
    />

    <span>Show on Homepage</span>

  </label>

</div>

      </div>

    </div>

  );
};

export default ProductSettings;