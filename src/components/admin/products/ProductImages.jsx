import React from "react";

const ProductImages = ({
  product,
  handleChange,
  imageInput,
  setImageInput,
  addGalleryImage,
  removeGalleryImage,
}) => {

  const maxImages = 4;

  return (
    <div className="product-card">

      <h4>Product Images</h4>

      <div className="product-grid">

        {/* Main Image */}

        <div className="product-group full">

          <label>Main Image URL</label>

          <input
            type="text"
            name="img"
            value={product.img}
            onChange={handleChange}
            placeholder="https://example.com/main-image.jpg"
          />

        </div>

        {product.img && (

          <div className="product-group full">

            <label>Main Image Preview</label>

            <div className="product-preview">

              <img
                src={product.img}
                alt="Main Product"
              />

            </div>

          </div>

        )}

        {/* Gallery */}

        <div className="product-group full">

          <label>Gallery Image URL</label>

          <div className="gallery-input">

            <input
              type="text"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              placeholder="https://example.com/gallery-image.jpg"
              disabled={product.imageURLs.length >= maxImages}
            />

            <button
              type="button"
              className="btn-save"
              onClick={addGalleryImage}
              disabled={product.imageURLs.length >= maxImages}
            >
              {product.imageURLs.length >= maxImages
                ? "Maximum Reached"
                : "Add Image"}
            </button>

          </div>

          <div
            style={{
              marginTop: "8px",
              fontSize: "13px",
              color:
                product.imageURLs.length >= maxImages
                  ? "#dc3545"
                  : "#666",
            }}
          >
            Gallery Images : {product.imageURLs.length} / {maxImages}
          </div>

          {product.imageURLs.length >= maxImages && (
            <div
              style={{
                marginTop: "5px",
                color: "#dc3545",
                fontSize: "13px",
              }}
            >
              Maximum 4 gallery images allowed.
            </div>
          )}

        </div>

      </div>

      {/* Gallery Preview */}

      {product.imageURLs.length > 0 && (

        <div className="gallery-grid">

          {product.imageURLs.map((item, index) => (

            <div
              key={index}
              className="gallery-card"
            >

              <img
                src={item.img}
                alt={`Gallery ${index + 1}`}
              />

              <button
                type="button"
                className="btn-remove-image"
                onClick={() => removeGalleryImage(index)}
              >
                Remove
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default ProductImages;