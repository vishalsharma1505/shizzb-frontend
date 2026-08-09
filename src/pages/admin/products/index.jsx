// ===============================
// admin/products/index.jsx
// PART 1
// ===============================

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axios from "axios";
import AdminLayout from "../../../components/admin/AdminLayout";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/all`
      );

      if (data.success) {
        setProducts(data.data || []);
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`
      );

      alert("Product Deleted");

      loadProducts();
    } catch (err) {
      console.log(err);
      alert("Unable to delete");
    }
  };

  // ==========================
  // Dashboard Cards
  // ==========================

  const totalProducts = products.length;

  const inStock = products.filter(
    (p) => p.stockStatus === "in_stock"
  ).length;

  const lowStock = products.filter(
    (p) => p.stockStatus === "low_stock"
  ).length;

  const outStock = products.filter(
    (p) => p.stockStatus === "out_of_stock"
  ).length;

  // ==========================
  // Categories
  // ==========================

  const categories = useMemo(() => {
    return [
      ...new Set(
        products
          .map((p) => p.category?.name)
          .filter(Boolean)
      ),
    ];
  }, [products]);

  // ==========================
  // Filter + Search + Sort
  // ==========================

  const filteredProducts = [...products]
    .filter((item) => {
      const searchMatch =
        item.title
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "all"
          ? true
          : item.stockStatus === statusFilter;

      const categoryMatch =
        categoryFilter === "all"
          ? true
          : item.category?.name === categoryFilter;

      return (
        searchMatch &&
        statusMatch &&
        categoryMatch
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "priceLow":
          return a.price - b.price;

        case "priceHigh":
          return b.price - a.price;

        case "soldHigh":
          return (b.sellCount || 0) - (a.sellCount || 0);

        case "soldLow":
          return (a.sellCount || 0) - (b.sellCount || 0);

        case "oldest":
          return (
            new Date(a.createdAt) -
            new Date(b.createdAt)
          );

        default:
          return (
            new Date(b.createdAt) -
            new Date(a.createdAt)
          );
      }
    });

  if (loading) {
    return (
      <AdminLayout>
        <h3>Loading...</h3>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      <div className="page-title">
        <div>
          <h2>Products</h2>
          <small>
            Manage all products from here
          </small>
        </div>

        <Link href="/admin/products/add">
          <button className="save-btn">
            + Add Product
          </button>
        </Link>
      </div>

      {/* Dashboard */}

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h6>Total Products</h6>
          <h2>{totalProducts}</h2>
        </div>

        <div className="dashboard-card">
          <h6>In Stock</h6>
          <h2>{inStock}</h2>
        </div>

        <div className="dashboard-card">
          <h6>Low Stock</h6>
          <h2>{lowStock}</h2>
        </div>

        <div className="dashboard-card">
          <h6>Out Of Stock</h6>
          <h2>{outStock}</h2>
        </div>

      </div>

      {/* Filters */}

      <div className="order-filters">

        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value)
          }
        >
          <option value="all">
            All Categories
          </option>

          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="all">
            All Status
          </option>

          <option value="in_stock">
            In Stock
          </option>

          <option value="low_stock">
            Low Stock
          </option>

          <option value="out_of_stock">
            Out Of Stock
          </option>
        </select>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >
          <option value="latest">
            Latest
          </option>

          <option value="oldest">
            Oldest
          </option>

          <option value="priceLow">
            Price Low → High
          </option>

          <option value="priceHigh">
            Price High → Low
          </option>

          <option value="soldHigh">
            Best Selling
          </option>

          <option value="soldLow">
            Least Selling
          </option>
        </select>

      </div>

      {/* Product Table */}

      <div className="dashboard-table">

        <table>

          <thead>

            <tr>

              <th>Image</th>

              <th>Product</th>

              <th>Category</th>

              <th>Regular</th>

              <th>Sale</th>

              <th>Stock</th>

              <th style={{ width: "70px", textAlign: "center" }}>
  Sold
</th>

<th style={{ width: "140px", minWidth: "140px", textAlign: "center" }}>
  Status
</th>
              <th style={{ width: "150px", textAlign: "center" }}>
  Action
</th>

            </tr>

          </thead>

          <tbody>
                        {filteredProducts.map((item) => {

              const salePrice =
                item.discount > 0
                  ? Number(item.discount).toFixed(2)
                  : Number(item.price).toFixed(2);

              return (

                <tr key={item._id}>

                  {/* Image */}

                  <td>

                    <img
                      src={item.img}
                      alt={item.title}
                      className="product-thumb"
                    />

                  </td>

                  {/* Product */}

                  <td>

                    <div>

                      <strong className="product-title">
                        {item.title}
                      </strong>

                      <small
                        style={{
                          display: "block",
                          color: "#777",
                          marginTop: "4px",
                        }}
                      >
                        SKU : {item.sku}
                      </small>

                    </div>

                  </td>

                  {/* Category */}

                  <td>

                    {item.category?.name}

                  </td>

                  {/* Regular Price */}

                  <td>

                    ₹{Number(item.price).toFixed(2)}

                  </td>

                  {/* Sale Price */}

                  <td>

                    {item.discount > 0 ? (
                      <span
                        style={{
                          color: "#16a34a",
                          fontWeight: 700,
                        }}
                      >
                        ₹{salePrice}
                      </span>
                    ) : (
                      "-"
                    )}

                  </td>

                  {/* Stock */}

                  <td style={{ minWidth: "160px" }}>

  <div className="stock-box">

    <span className="stock-count">
      {item.stock}
    </span>

    <div className="progress">

      <div
        className="progress-bar"
        style={{
          width: `${Math.min(
            (item.stock / (item.lowStockLimit || 5)) * 100,
            100
          )}%`,
          background:
            item.stockStatus === "low_stock"
              ? "#f59e0b"
              : item.stockStatus === "out_of_stock"
              ? "#ef4444"
              : "#22c55e",
        }}
      />

    </div>

  </div>

</td>

                  {/* Sold */}

                  <td>

                    {item.sellCount || 0}

                  </td>

                  {/* Status */}

                  <td>

                    {item.stockStatus ===
                    "in_stock" ? (

                      <span className="stock-status in">
    🟢 In Stock
</span>

                    ) : item.stockStatus ===
                      "low_stock" ? (

                      <span className="stock-status low">
    🟡 Low Stock
</span>

                    ) : (

                      <span className="stock-status out">
    🔴 Out Of Stock
</span>

                    )}

                  </td>

                  {/* Actions */}

                  <td>

                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                      }}
                    >

                      <Link
                        href={`/admin/products/${item._id}`}
                      >
                        <button
                          style={{
                            background: "#2563eb",
                            color: "#fff",
                            border: 0,
                            borderRadius: "6px",
                            padding: "8px 10px",
                            cursor: "pointer",
                          }}
                          title="View"
                        >
                          👁
                        </button>
                      </Link>

                      <Link
                        href={`/admin/products/edit/${item._id}`}
                      >
                        <button
                          style={{
                            background: "#f59e0b",
                            color: "#fff",
                            border: 0,
                            borderRadius: "6px",
                            padding: "8px 10px",
                            cursor: "pointer",
                          }}
                          title="Edit"
                        >
                          ✏
                        </button>
                      </Link>

                      <button
                        onClick={() =>
                          deleteProduct(item._id)
                        }
                        style={{
                          background: "#dc2626",
                          color: "#fff",
                          border: 0,
                          borderRadius: "6px",
                          padding: "8px 10px",
                          cursor: "pointer",
                        }}
                        title="Delete"
                      >
                        🗑
                      </button>

                    </div>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </AdminLayout>

  );

};

export default Products;