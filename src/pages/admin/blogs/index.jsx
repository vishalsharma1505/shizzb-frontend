import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axios from "axios";
import AdminLayout from "../../../components/admin/AdminLayout";

const Blogs = () => {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {

    try {

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blog`
      );

      if (data.success) {
        setBlogs(data.data || []);
      }

    } catch (err) {
      console.log(err);
    }

    setLoading(false);

  };

  // Delete Blog

  const deleteBlog = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this blog?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`
      );

      alert("Blog Deleted Successfully");

      loadBlogs();

    } catch (err) {

      console.log(err);

      alert("Unable to delete blog");

    }

  };

  // Dashboard Cards

  const totalBlogs = blogs.length;

  const totalCategories = [
    ...new Set(
      blogs
        .map((b) => b.category)
        .filter(Boolean)
    ),
  ].length;

  const totalAuthors = [
    ...new Set(
      blogs
        .map((b) => b.author)
        .filter(Boolean)
    ),
  ].length;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const thisMonthBlogs = blogs.filter((blog) => {

    const d = new Date(blog.publishDate);

    return (
      d.getMonth() === currentMonth &&
      d.getFullYear() === currentYear
    );

  }).length;

  // Categories

  const categories = useMemo(() => {

    return [

      ...new Set(

        blogs
          .map((b) => b.category)
          .filter(Boolean)

      ),

    ];

  }, [blogs]);

  // Search + Filter + Sort

  const filteredBlogs = [...blogs]

    .filter((item) => {

      const searchMatch =
        item.title
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const categoryMatch =
        categoryFilter === "all"
          ? true
          : item.category === categoryFilter;

      return (
        searchMatch &&
        categoryMatch
      );

    })

    .sort((a, b) => {

      switch (sortBy) {

        case "oldest":

          return (
            new Date(a.publishDate) -
            new Date(b.publishDate)
          );

        case "az":

          return a.title.localeCompare(b.title);

        case "za":

          return b.title.localeCompare(a.title);

        default:

          return (
            new Date(b.publishDate) -
            new Date(a.publishDate)
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

          <h2>Blogs</h2>

          <small>
            Manage all blogs from here
          </small>

        </div>

        <Link href="/admin/blogs/add">

          <button className="save-btn">
            + Add Blog
          </button>

        </Link>

      </div>

      {/* Dashboard */}

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h6>Total Blogs</h6>
          <h2>{totalBlogs}</h2>
        </div>

        <div className="dashboard-card">
          <h6>Categories</h6>
          <h2>{totalCategories}</h2>
        </div>

        <div className="dashboard-card">
          <h6>Authors</h6>
          <h2>{totalAuthors}</h2>
        </div>

        <div className="dashboard-card">
          <h6>This Month</h6>
          <h2>{thisMonthBlogs}</h2>
        </div>

      </div>

      {/* Filters */}

      <div className="order-filters">

        <input
          type="text"
          placeholder="Search Blog..."
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
            A → Z
          </option>

          <option value="za">
            Z → A
          </option>

        </select>

      </div>
            {/* Blog Table */}

      <div className="dashboard-table">

        <table>

          <thead>

            <tr>

              <th>Image</th>

              <th>Title</th>

              <th>Category</th>

              <th>Author</th>

              <th>Publish Date</th>

              <th>Views</th>

              <th
                style={{
                  width: "160px",
                  textAlign: "center",
                }}
              >
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredBlogs.map((item) => (

              <tr key={item._id}>

                {/* Image */}

                <td>

                  <img
                    src={item.image}
                    alt={item.title}
                    className="blog-thumb"
                  />

                </td>

                {/* Title */}

                <td>

                  <strong className="product-title">
                    {item.title}
                  </strong>

                </td>

                {/* Category */}

                <td>

                  {item.category}

                </td>

                {/* Author */}

                <td>

                  {item.author}

                </td>

                {/* Publish Date */}

                <td>

                  {new Date(
                    item.publishDate
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}

                </td>

                {/* Views */}

                <td>

                  {item.views || 0}

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
                      href={`/admin/blogs/view/${item._id}`}
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
                      href={`/admin/blogs/edit/${item._id}`}
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
                        deleteBlog(item._id)
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

            ))}
                      </tbody>

        </table>

      </div>

    </AdminLayout>

  );

};

export default Blogs;