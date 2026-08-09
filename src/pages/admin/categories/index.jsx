import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import AdminLayout from "../../../components/admin/AdminLayout";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search
  const [search, setSearch] = useState("");

  // Sort
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/category/all`
      );

      if (data.success) {
        setCategories(data.result || []);
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };


  const deleteCategory = async (category) => {

  const totalProducts = category.products?.length || 0;

  let message = "";

  if (totalProducts > 0) {

    message = `Delete Category?

${totalProducts} products are using this category.

Deleting this category may affect existing products.

Continue?`;

  } else {

    message = `Delete Category?

This action cannot be undone.

Continue?`;

  }

  const confirmDelete = window.confirm(message);

  if (!confirmDelete) return;

  try {

    const { data } = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/category/delete/${category._id}`
    );

    if (data.success) {

      alert("Category Deleted Successfully");

      loadCategories();

    }

  } catch (err) {

    console.log(err);

    alert("Unable to delete category");

  }

};
  // ==========================
  // Dashboard Cards
  // ==========================

  const totalCategories = categories.length;

  const homeCategories = categories.filter(
    (item) => item.showOnHome
  ).length;

  const totalProducts = categories.reduce(
    (total, item) => total + (item.products?.length || 0),
    0
  );

  // ==========================
  // Search + Sort
  // ==========================

  const filteredCategories = [...categories]
    .filter((item) =>
      item.parent
        ?.toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "az":
          return a.parent.localeCompare(b.parent);

        case "za":
          return b.parent.localeCompare(a.parent);

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

      {/* Page Header */}

      <div className="category-page-title">

        <div>

          <h2>Categories</h2>

          <small>
            Manage all categories
          </small>

        </div>

        <Link href="/admin/categories/add">

          <button className="save-btn">
            + Add Category
          </button>

        </Link>

      </div>

      {/* Dashboard */}

      <div className="category-dashboard-cards">

        <div className="category-dashboard-card">

          <h6>Total Categories</h6>

          <h2>{totalCategories}</h2>

        </div>

        <div className="category-dashboard-card">

          <h6>Home Categories</h6>

          <h2>{homeCategories}</h2>

        </div>

        <div className="category-dashboard-card">

          <h6>Total Products</h6>

          <h2>{totalProducts}</h2>

        </div>

      </div>

      {/* Search */}

      <div className="category-filters">

        <input
          type="text"
          placeholder="Search Category..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

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

          <option value="az">
            A - Z
          </option>

          <option value="za">
            Z - A
          </option>

        </select>

      </div>

      {/* Table */}

      <div className="dashboard-table">

        <table>

          <thead>

            <tr>

              <th>Image</th>

              <th>Category</th>

              <th>Products</th>

              <th>Home Page</th>

              <th>Display Order</th>

              <th
                style={{
                  width: "150px",
                  textAlign: "center",
                }}
              >
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredCategories.map((item) => (

              <tr key={item._id}>

                <td>

                  <img
                    src={item.img}
                    alt={item.parent}
                    className="category-thumb"
                  />

                </td>

                <td>

                  <strong>

                    {item.parent}

                  </strong>

                </td>

                <td>

                  {item.products?.length || 0}

                </td>

                <td>

                  {item.showOnHome ? (
                    <span className="home-yes">
                      ✅ Yes
                    </span>
                  ) : (
                    <span className="home-no">
                      ❌ No
                    </span>
                  )}

                </td>

                <td>

                  {item.displayOrder}

                </td>

                <td>

                  <div className="category-action-buttons">

                    <Link
                      href={`/admin/categories/edit/${item._id}`}
                    >
                      <button className="category-edit-btn">
                        ✏
                      </button>
                    </Link>

                    <button
  className="category-delete-btn"
  onClick={() => deleteCategory(item)}
>
  🗑
</button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
};

export default Categories;