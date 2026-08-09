import React from "react";

const ProductBrandCategory = ({
  brands = [],
  categories = [],
  product,
  selectBrand,
  selectCategory,
}) => {
  return (
    <div className="product-card">

      <h4>Brand & Category</h4>

      <div className="product-grid">

        <div className="product-group">

          <label>Brand</label>

          <select
            value={product.brand.id}
            onChange={(e) => selectBrand(e.target.value)}
          >

            <option value="">
              Select Brand
            </option>

            {brands.map((brand) => (

              <option
                key={brand._id}
                value={brand._id}
              >

                {brand.name}

              </option>

            ))}

          </select>

        </div>

        <div className="product-group">

          <label>Category</label>

          <select
            value={product.category.id}
            onChange={(e) => selectCategory(e.target.value)}
          >

            <option value="">
              Select Category
            </option>

            {categories.map((category) => (

  <option
    key={category._id}
    value={category._id}
  >

    {category.parent}

  </option>

))}

          </select>

        </div>

      </div>

    </div>
  );
};

export default ProductBrandCategory;