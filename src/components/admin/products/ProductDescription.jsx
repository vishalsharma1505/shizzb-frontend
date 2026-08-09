import React from "react";

const ProductDescription = ({
  product,
  handleChange,
}) => {

  return (

    <div className="product-card">

      <h4>Product Description</h4>

      <div className="product-group">

        <label>Description</label>

        <textarea

          rows={8}

          name="description"

          value={product.description}

          onChange={handleChange}

          placeholder="Write detailed description..."

        />

      </div>

      <div className="product-group">

        
      </div>

    </div>

  );

};

export default ProductDescription;