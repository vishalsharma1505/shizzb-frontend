import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import parse from "html-react-parser";
import AdminLayout from "../../../../components/admin/AdminLayout";

const ViewBlog = () => {

  const router = useRouter();
  const { id } = router.query;

  const [blog, setBlog] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (id) {
      loadBlog();
    }

  }, [id]);

  const loadBlog = async () => {

    try {

      const { data } = await axios.get(

        `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`

      );

      if (data.success) {

        setBlog(data.data);

      }

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  };

  if (loading) {

    return (

      <AdminLayout>

        <h3>Loading...</h3>

      </AdminLayout>

    );

  }

  if (!blog) {

    return (

      <AdminLayout>

        <h3>Blog Not Found</h3>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <div className="page-title">

        <div>

          <h2>View Blog</h2>

          <small>{blog.title}</small>

        </div>

        <Link href={`/admin/blogs/edit/${blog._id}`}>

          <button className="save-btn">

            Edit Blog

          </button>

        </Link>

      </div>
            <div className="admin-card">

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: "30px",
            alignItems: "start",
          }}
        >

          <div>

            <img
              src={blog.image}
              alt={blog.altTag || blog.title}
              style={{
                width: "100%",
                borderRadius: "12px",
                border: "1px solid #ddd",
              }}
            />

          </div>

          <div>

            <h2
              style={{
                marginBottom: "15px",
              }}
            >
              {blog.title}
            </h2>

            <table className="blog-view-table">

              <tbody>

                <tr>

                  <td>
                    <strong>Category</strong>
                  </td>

                  <td>{blog.category}</td>

                </tr>

                <tr>

                  <td>
                    <strong>Author</strong>
                  </td>

                  <td>{blog.author}</td>

                </tr>

                <tr>

                  <td>
                    <strong>Publish Date</strong>
                  </td>

                  <td>
                    {new Date(
                      blog.publishDate
                    ).toLocaleDateString()}
                  </td>

                </tr>

                <tr>

                  <td>
                    <strong>Reading Time</strong>
                  </td>

                  <td>
                    {blog.readingTime} min
                  </td>

                </tr>

                <tr>

                  <td>
                    <strong>Slug</strong>
                  </td>

                  <td>{blog.slug}</td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>
            {/* Content */}

      <div className="admin-card">

        <h3>Blog Content</h3>

        <div
          className="blog-content"
          style={{
            marginTop: "20px",
            lineHeight: "1.9",
          }}
        >
          {parse(blog.content || "")}
        </div>

      </div>

      {/* SEO */}

      <div className="admin-card">

        <h3>SEO Information</h3>

        <table className="blog-view-table">

          <tbody>

            <tr>

              <td width="220">
                <strong>SEO Title</strong>
              </td>

              <td>{blog.seoTitle}</td>

            </tr>

            <tr>

              <td>
                <strong>Meta Description</strong>
              </td>

              <td>{blog.metaDescription}</td>

            </tr>

            <tr>

              <td>
                <strong>Meta Keywords</strong>
              </td>

              <td>{blog.metaKeywords || "-"}</td>

            </tr>

            <tr>

              <td>
                <strong>Alt Tag</strong>
              </td>

              <td>{blog.altTag}</td>

            </tr>

          </tbody>

        </table>

      </div>

    </AdminLayout>

  );

};

export default ViewBlog;