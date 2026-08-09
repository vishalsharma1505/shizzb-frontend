import { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import axios from "axios";
import AdminLayout from "../../../components/admin/AdminLayout";

const ReactQuill = dynamic(
  () => import("react-quill"),
  { ssr: false }
);

import "react-quill/dist/quill.snow.css";

const AddBlog = () => {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    title: "",
    category: "",
    author: "",
    publishDate: "",
    image: "",

    seoTitle: "",
    metaDescription: "",
    metaKeywords: "",
    altTag: "",

  });

  const [content, setContent] = useState("");

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const payload = {

        ...formData,

        content,

      };

      const { data } = await axios.post(

        `${process.env.NEXT_PUBLIC_API_URL}/api/blog/create`,

        payload

      );

      if (data.success) {

        alert("Blog Added Successfully");

        router.push("/admin/blogs");

      }

    } catch (err) {

      console.log(err);

      alert("Unable to save blog");

    }

    setLoading(false);

  };

  return (

    <AdminLayout>

      <div className="page-title">

        <div>

          <h2>Add Blog</h2>

          <small>Create a new blog</small>

        </div>

      </div>

      <form
        className="admin-form"
        onSubmit={handleSubmit}
      >
                {/* Basic Information */}

        <div className="admin-card">

          <h4>Basic Information</h4>

          <div className="form-grid">

            <div className="form-group">

              <label>Blog Title</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter Blog Title"
                required
              />

            </div>

            <div className="form-group">

              <label>Category</label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Beauty"
              />

            </div>

            <div className="form-group">

              <label>Author</label>

              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Admin"
              />

            </div>

            <div className="form-group">

              <label>Publish Date</label>

              <input
                type="date"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleChange}
              />

            </div>

          </div>

        </div>

        {/* Image */}

        <div className="admin-card">

          <h4>Blog Image</h4>

          <div className="form-group">

            <label>Image URL</label>

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/blog.jpg"
              required
            />

          </div>

          {formData.image && (

            <div style={{ marginTop: "15px" }}>

              <img
                src={formData.image}
                alt="Preview"
                style={{
                  width: "220px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              />

            </div>

          )}

        </div>
                {/* Blog Content */}

        <div className="admin-card">

          <h4>Blog Content</h4>

          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            style={{ height: "350px", marginBottom: "60px" }}
          />

        </div>

        {/* SEO */}

        <div className="admin-card">

          <h4>SEO</h4>

          <div className="form-grid">

            <div className="form-group">

              <label>SEO Title</label>

              <input
                type="text"
                name="seoTitle"
                value={formData.seoTitle}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>Alt Tag</label>

              <input
                type="text"
                name="altTag"
                value={formData.altTag}
                onChange={handleChange}
              />

            </div>

            <div className="form-group full-width">

              <label>Meta Description</label>

              <textarea
                rows="4"
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleChange}
              />

            </div>

            <div className="form-group full-width">

              <label>Meta Keywords</label>

              <input
                type="text"
                name="metaKeywords"
                value={formData.metaKeywords}
                onChange={handleChange}
                placeholder="keyword1, keyword2, keyword3"
              />

            </div>

          </div>

        </div>

        {/* Submit */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "30px",
          }}
        >

          <button
            type="submit"
            className="save-btn"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Blog"}
          </button>

        </div>

      </form>

    </AdminLayout>

  );

};

export default AddBlog;