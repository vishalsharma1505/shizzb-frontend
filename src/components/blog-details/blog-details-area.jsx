import React, { useEffect } from "react";
import axios from "axios";
import { notifySuccess } from "@/utils/toast";
import BlogSidebar from "../blog/blog-postox/blog-sidebar";
import BlogDetailsAuthor from "./blog-details-author";
import PostboxDetailsNav from "./postbox-details-nav";
import PostboxDetailsTop from "./postbox-details-top";

const BlogDetailsArea = ({
  blog,
  previous,
  next,
}) => {

  // Increase Blog Views
  useEffect(() => {

    if (!blog?._id) return;

    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blog/view/${blog._id}`
      )
      .catch((err) => console.log(err));

  }, [blog]);

  if (!blog) {
    return (
      <section className="tp-postbox-details-area pb-120 pt-95">
        <div className="container text-center">
          <h2>Blog Not Found</h2>
        </div>
      </section>
    );
  }

  const blogUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "";

  const shareTitle = blog?.title || "";

  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    blogUrl
  )}`;

  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(
    `${shareTitle} ${blogUrl}`
  )}`;

  const handleInstagram = async () => {
    try {
      await navigator.clipboard.writeText(blogUrl);
      notifySuccess("Blog link copied! Paste it on Instagram.");
      window.open("https://www.instagram.com/", "_blank");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(blogUrl);
      notifySuccess("Blog link copied!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="tp-postbox-details-area pb-120 pt-95">
      <div className="container">

        <div className="row">

          <div className="col-xl-9">
            <PostboxDetailsTop blog={blog} />
          </div>

          <div className="col-xl-12">

            <div className="tp-postbox-details-thumb">

              <img
                src={blog.image}
                alt={blog.altTag || blog.title}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />

            </div>

          </div>

        </div>

        <div className="row">

          <div className="col-xl-9 col-lg-8">

            <div className="tp-postbox-details-main-wrapper">

              <div className="tp-postbox-details-content">

                {/* Blog Content */}

                <div
                  dangerouslySetInnerHTML={{
                    __html: blog.content || "",
                  }}
                />

                {/* Category + Tags + Share */}

                <div className="tp-postbox-details-share-wrapper mt-50">

                  <div className="row">

                    <div className="col-xl-8 col-lg-6">

                      <div className="tp-postbox-details-tags tagcloud mb-20">

                        <span>Category:</span>

                        <a>{blog.category || "General"}</a>

                      </div>

                      {blog.tags &&
                        blog.tags.length > 0 && (

                          <div className="tp-postbox-details-tags tagcloud">

                            <span>Tags:</span>

                            {blog.tags.map((tag, index) => (

                              <a key={index}>
                                {tag}
                              </a>

                            ))}

                          </div>

                        )}

                      {blog.publishDate && (

                        <div className="mt-20">

                          <strong>
                            Published:
                          </strong>{" "}

                          {new Date(
                            blog.publishDate
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}

                        </div>

                      )}

                    </div>

                    <div className="col-xl-4 col-lg-6">

                      <div className="tp-postbox-details-share text-md-end">

                        <span>Share:</span>

                        {/* Facebook */}
                        <a
                          href={facebookShare}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="me-1"
                        >
                          <i className="fa-brands fa-facebook-f"></i>
                        </a>

                        {/* WhatsApp */}
                        <a
                          href={whatsappShare}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="me-1"
                        >
                          <i className="fa-brands fa-whatsapp"></i>
                        </a>

                        {/* Instagram */}
                        <button
                          type="button"
                          onClick={handleInstagram}
                          className="tp-share-btn me-1"
                        >
                          <i className="fa-brands fa-instagram"></i>
                        </button>

                        {/* Copy */}
                        <button
                          type="button"
                          onClick={handleCopy}
                          className="tp-share-btn"
                        >
                          <i className="fa-regular fa-copy"></i>
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

                {/* Previous / Next */}

                <PostboxDetailsNav
                  previous={previous}
                  next={next}
                />

                {/* Author */}

                <BlogDetailsAuthor
                  author="ShizzB Cosmetics"
                />

              </div>

            </div>

          </div>

          {/* Sidebar */}

          <div className="col-xl-3 col-lg-4">

            <BlogSidebar hideSearch={true} />

          </div>

        </div>

      </div>
    </section>
  );
};

export default BlogDetailsArea;