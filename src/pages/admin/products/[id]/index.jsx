import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";


import AdminLayout from "../../../../components/admin/AdminLayout";

const ProductView = () => {

  const router = useRouter();

  const { id } = router.query;

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (id) {

      loadProduct();

    }

  }, [id]);

  const loadProduct = async () => {

    try {

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/single-product/${id}`
      );

      if (data.success) {

        setProduct(data.data);

      }

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  };

  const deleteProduct = async () => {

    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
  `${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`
      );

      alert("Product Deleted");

      router.push("/admin/products");

    } catch (err) {

      console.log(err);

    }

  };

  if (loading) {

    return (
      <AdminLayout>
        <h3>Loading...</h3>
      </AdminLayout>
    );

  }

  if (!product) {

    return (
      <AdminLayout>
        <h3>Product Not Found</h3>
      </AdminLayout>
    );

  }
  return (
  <AdminLayout>

    <div className="page-title">

      <div>

        <h2>Product Details</h2>

        <small>
          View complete product information
        </small>

      </div>

      <Link href="/admin/products">
        <button className="save-btn">
          ← Back
        </button>
      </Link>

    </div>

    <div className="product-view-grid">

  {/* LEFT IMAGE */}

  <div className="product-image-card">

    <img
      src={product.img}
      alt={product.title}
      className="product-main-image"
    />

  </div>


  {/* RIGHT DETAILS */}

  <div className="product-info-card">

    <h2 className="product-view-title">
      {product.title}
    </h2>

    <div className="product-info-grid">

      <div>
        <span>SKU</span>
        <strong>{product.sku}</strong>
      </div>

      <div>
        <span>Brand</span>
        <strong>{product.brand?.name}</strong>
      </div>

      <div>
        <span>Category</span>
        <strong>{product.category?.name}</strong>
      </div>

      <div>
        <span>Product Type</span>
        <strong>{product.productType}</strong>
      </div>

      <div>
        <span>Regular Price</span>
        <strong>
          ₹{Number(product.price).toFixed(2)}
        </strong>
      </div>

      <div>
        <span>Sale Price</span>
        <strong style={{ color: "#16a34a" }}>
          ₹{Number(product.discount).toFixed(2)}
        </strong>
      </div>

      <div>
        <span>Stock</span>
        <strong>{product.stock}</strong>
      </div>

      <div>
        <span>Sold</span>
        <strong>{product.sellCount}</strong>
      </div>

      <div>
        <span>Featured</span>
        <strong>
          {product.featured ? "Yes" : "No"}
        </strong>
      </div>

      <div>

        <span>Status</span>

        {product.stockStatus === "in_stock" && (
          <span className="stock-status in">
            🟢 In Stock
          </span>
        )}

        {product.stockStatus === "low_stock" && (
          <span className="stock-status low">
            🟡 Low Stock
          </span>
        )}

        {product.stockStatus === "out_of_stock" && (
          <span className="stock-status out">
            🔴 Out Of Stock
          </span>
        )}

      </div>

    </div>

  </div>

</div>
        {/* Description */}

    <div className="product-section-card">

      <h4>Description</h4>

      <hr />

      <p className="product-description">
  {product.description}
</p>

    </div>

    {/* Tags */}

    <div className="product-section-card">

      <h4>Tags</h4>

      <hr />

      <div
  className="product-tags"
>
        {product.tags?.map((tag, i) => (
          <span
  key={i}
  className="tag-chip"
>
  {tag}
</span>
        ))}
      </div>

    </div>

    {/* Additional Information */}

    {product.additionalInformation &&
      product.additionalInformation.length > 0 && (

        <div
          className="summary-card"
          style={{ marginTop: "25px" }}
        >

          <h4>Additional Information</h4>

          <hr />

          <table className="product-info-table">

            <tbody>

              {product.additionalInformation.map(
                (item, i) => (

                  <tr key={i}>

                    <td
                      style={{
                        width: "250px",
                        fontWeight: 600,
                      }}
                    >
                      {item.key}
                    </td>

                    <td>{item.value}</td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      )}

    {/* Buttons */}

    <div className="product-action-buttons">

      <Link
        href={`/admin/products/edit/${product._id}`}
      >
        <button className="save-btn">
          ✏ Edit Product
        </button>
      </Link>

      <button
    onClick={deleteProduct}
    className="delete-product-btn"
>
    🗑 Delete Product
</button>

    </div>

  </AdminLayout>
);

};

export default ProductView;