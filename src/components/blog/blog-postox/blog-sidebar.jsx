import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

// internal
import user from "@assets/img/users/user-11.jpg";
import signature from "@assets/img/blog/signature/signature.png";
import { Search } from "@/svg";

const BlogSidebar = ({
  search = "",
  setSearch = () => {},
  hideSearch = false,
}) => {

  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    loadLatestBlogs();
  }, []);

  const loadLatestBlogs = async () => {
    try {

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blog`
      );

      if (data.success) {
        setLatestPosts((data.data || []).slice(0, 3));
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="tp-sidebar-wrapper tp-sidebar-ml--24">

        {/* Search */}

        {!hideSearch && (

          <div className="tp-sidebar-widget mb-35">

            <div className="tp-sidebar-search">

              <form onSubmit={(e) => e.preventDefault()}>

                <div className="tp-sidebar-search-input">

                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />

                  <button type="submit">
                    <Search />
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

        {/* About */}

        <div className="tp-sidebar-widget mb-35">

          <h3 className="tp-sidebar-widget-title">
            About Me
          </h3>

          <div className="tp-sidebar-widget-content">

            <div className="tp-sidebar-about">

              <div className="tp-sidebar-about-thumb mb-25">

                <Image
                  src={user}
                  alt="User"
                />

              </div>

              <div className="tp-sidebar-about-content">

                <h3 className="tp-sidebar-about-title">
                  ShizzB Cosmetics
                </h3>

                <span className="tp-sidebar-about-designation">
                  Beauty & Skincare
                </span>

                <p>
                  Discover skincare tips, beauty guides,
                  makeup trends and cosmetic knowledge
                  from our latest blogs.
                </p>

                <div className="tp-sidebar-about-signature">

                  <Image
                    src={signature}
                    alt="Signature"
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Latest Posts */}

        <div className="tp-sidebar-widget mb-35">

          <h3 className="tp-sidebar-widget-title">
            Latest Posts
          </h3>

          <div className="tp-sidebar-widget-content">

            <div className="tp-sidebar-blog-item-wrapper">

              {latestPosts.map((blog) => (

                <div
                  key={blog._id}
                  className="tp-sidebar-blog-item d-flex align-items-center"
                >

                  <div className="tp-sidebar-blog-thumb">

                    <Link href={`/blog/${blog.slug}`}>

                      <img
                        src={blog.image}
                        alt={blog.title}
                        style={{
                          width: "85px",
                          height: "70px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />

                    </Link>

                  </div>

                  <div className="tp-sidebar-blog-content">

                    <div className="tp-sidebar-blog-meta">

                      <span>

                        {new Date(
                          blog.publishDate
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}

                      </span>

                    </div>

                    <h3 className="tp-sidebar-blog-title">

                      <Link href={`/blog/${blog.slug}`}>
                        {blog.title}
                      </Link>

                    </h3>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default BlogSidebar;