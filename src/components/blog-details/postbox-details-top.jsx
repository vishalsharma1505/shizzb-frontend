import React from "react";
import {
  Date as DateIcon,
  UserTwo,
} from "@/svg";

const PostboxDetailsTop = ({ blog }) => {
  const {
    category,
    title,
    publishDate,
    author,
  } = blog || {};

  return (
    <div className="tp-postbox-details-top">

      <div className="tp-postbox-details-category">
        <span>
          <a href="#" className="text-capitalize">
            {category || "General"}
          </a>
        </span>
      </div>

      <h1 className="tp-postbox-details-title">
        {title}
      </h1>

      <div className="tp-postbox-details-meta mb-50">

        <span data-meta="author">
          <UserTwo />
          {" "}By{" "}
          <a href="#">
            {author || "ShizzB Cosmetics"}
          </a>
        </span>

        <span>
          <DateIcon />
          {" "}
          {publishDate
            ? new globalThis.Date(
                publishDate
              ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : ""}
        </span>

      </div>

    </div>
  );
};

export default PostboxDetailsTop;