import React from "react";

const ProductInventory = ({ product, handleChange }) => {
  return (
    <div className="product-card">

      <h4>Inventory</h4>

      <div className="product-grid">

        <div className="product-group">

          <label>Quantity</label>

          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            placeholder="Available Stock"
          />

        </div>

        <div className="product-group">

          <label>Low Stock Alert</label>

          <input
            type="number"
            name="lowStockLimit"
            value={product.lowStockLimit}
            onChange={handleChange}
          />

        </div>

      </div>

    </div>
  );
};

export default ProductInventory;