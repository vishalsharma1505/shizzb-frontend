import React from "react";
import Link from "next/link";
import Image from "next/image";

const BlogItem = ({ item = {} }) => {
  return (
    <>
      <article className="tp-postbox-item format-image mb-50 transition-3">
        
        {/* Blog Image */}
        {item.image && (
          <div className="tp-postbox-thumb w-img">
            <Link href={`/blog/${item.slug}`}>
              <Image
                src={item.image}
                alt={item.title || "blog image"}
                width={800}
                height={500}
              />
            </Link>
          </div>
        )}

        {/* Blog Content */}
        <div className="tp-postbox-content">
          <div className="tp-postbox-meta">
            <span>
              <i className="far fa-calendar-check"></i>{" "}
              {item.createdAt
                ? new Date(item.createdAt).toLocaleDateString()
                : ""}
            </span>

            <span>
              <i className="far fa-user"></i>{" "}
              {item.author || "Admin"}
            </span>

            
          </div>

          <h3 className="tp-postbox-title">
            <Link href={`/blog/${item.slug}`}>
              {item.title}
            </Link>
          </h3>

          <div className="tp-postbox-text">
            <p>
              {item.desc?.length > 200
                ? item.desc.substring(0, 200) + "..."
                : item.desc}
            </p>
          </div>

          <div className="tp-postbox-read-more">
            <Link
                  href={`/blog/${item.slug}`}
              className="tp-btn"
            >
              Read More
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogItem;