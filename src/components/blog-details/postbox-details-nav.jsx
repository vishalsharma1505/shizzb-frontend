import React from "react";
import Link from "next/link";
import {
  ArrowRightLong,
  ArrowRightLongPrev,
} from "@/svg";

const PostboxDetailsNav = ({
  previous,
  next,
}) => {
  return (
    <div className="tp-postbox-details-navigation d-none d-md-flex justify-content-between align-items-center">

      {/* Previous */}

      <div className="tp-postbox-details-navigation-item d-flex align-items-center">

        {previous ? (
          <>
            <div className="tp-postbox-details-navigation-icon mr-15">
              <Link href={`/blog/${previous.slug}`}>
                <ArrowRightLongPrev />
              </Link>
            </div>

            <div className="tp-postbox-details-navigation-content">

              <span>Previous Post</span>

              <h3 className="tp-postbox-details-navigation-title">

                <Link href={`/blog/${previous.slug}`}>
                  {previous.title}
                </Link>

              </h3>

            </div>
          </>
        ) : (
          <div></div>
        )}

      </div>

      {/* Next */}

      <div className="tp-postbox-details-navigation-item d-flex align-items-center text-end">

        {next && (
          <>
            <div className="tp-postbox-details-navigation-content">

              <span>Next Post</span>

              <h3 className="tp-postbox-details-navigation-title">

                <Link href={`/blog/${next.slug}`}>
                  {next.title}
                </Link>

              </h3>

            </div>

            <div className="tp-postbox-details-navigation-icon ml-15">

              <Link href={`/blog/${next.slug}`}>
                <ArrowRightLong />
              </Link>

            </div>
          </>
        )}

      </div>

    </div>
  );
};

export default PostboxDetailsNav;