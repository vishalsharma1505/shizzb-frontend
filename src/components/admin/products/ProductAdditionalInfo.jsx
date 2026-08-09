import React, { useEffect, useState } from "react";

const ProductAdditionalInfo = ({
  product,
  setProduct,
}) => {

  const [info, setInfo] = useState({
    skinType: "",
    netQuantity: "",
    shelfLife: "",
    manufacturer: "",
    country: "",
    ingredients: "",
    howToUse: "",
  });

  useEffect(() => {

  if (!product?.additionalInformation?.length) return;

  const getValue = (key) => {

    const item = product.additionalInformation.find(
      (x) => x.key === key
    );

    return item ? item.value : "";

  };

  setInfo({

    skinType: getValue("Skin Type"),

    netQuantity: getValue("Net Quantity"),

    shelfLife: getValue("Shelf Life"),

    manufacturer: getValue("Manufacturer"),

    country: getValue("Country of Origin"),

    ingredients: getValue("Ingredients"),

    howToUse: getValue("How To Use"),

  });

}, [product.additionalInformation]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    const updated = {
      ...info,
      [name]: value,
    };

    setInfo(updated);

    setProduct({
      ...product,
      additionalInformation: [
        {
          key: "Skin Type",
          value: updated.skinType,
        },
        {
          key: "Net Quantity",
          value: updated.netQuantity,
        },
        {
          key: "Shelf Life",
          value: updated.shelfLife,
        },
        {
          key: "Manufacturer",
          value: updated.manufacturer,
        },
        {
          key: "Country of Origin",
          value: updated.country,
        },
        {
          key: "Ingredients",
          value: updated.ingredients,
        },
        {
          key: "How To Use",
          value: updated.howToUse,
        },
      ],
    });

  };

  return (

    <div className="product-card">

      <h4>Additional Information</h4>

      <div className="product-grid">

        <div className="product-group">

          <label>Skin Type</label>

          <input
            type="text"
            name="skinType"
            value={info.skinType}
            onChange={handleChange}
            placeholder="All Skin Types"
          />

        </div>

        <div className="product-group">

          <label>Net Quantity</label>

          <input
            type="text"
            name="netQuantity"
            value={info.netQuantity}
            onChange={handleChange}
            placeholder="100 ml"
          />

        </div>

        <div className="product-group">

          <label>Shelf Life</label>

          <input
            type="text"
            name="shelfLife"
            value={info.shelfLife}
            onChange={handleChange}
            placeholder="24 Months"
          />

        </div>

        <div className="product-group">

          <label>Manufacturer</label>

          <input
            type="text"
            name="manufacturer"
            value={info.manufacturer}
            onChange={handleChange}
            placeholder="Lakme Cosmetics Pvt. Ltd."
          />

        </div>

        <div className="product-group">

          <label>Country of Origin</label>

          <input
            type="text"
            name="country"
            value={info.country}
            onChange={handleChange}
            placeholder="India"
          />

        </div>

        <div className="product-group full">

          <label>Ingredients</label>

          <textarea
            rows="3"
            name="ingredients"
            value={info.ingredients}
            onChange={handleChange}
            placeholder="Aloe Vera, Vitamin E, Hyaluronic Acid"
          />

        </div>

        <div className="product-group full">

          <label>How To Use</label>

          <textarea
            rows="4"
            name="howToUse"
            value={info.howToUse}
            onChange={handleChange}
            placeholder="Apply evenly on clean face and massage gently."
          />

        </div>

      </div>

    </div>

  );

};

export default ProductAdditionalInfo;