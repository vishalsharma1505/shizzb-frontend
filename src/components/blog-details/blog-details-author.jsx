import React from "react";

const BlogDetailsAuthor = () => {
  return (
    <div className="tp-postbox-details-author d-sm-flex align-items-start">

      <div className="tp-postbox-details-author-thumb">

        <img
          src="/assets/img/logo/logo.png"
          alt="ShizzB Cosmetics"
          style={{
            width: "110px",
            height: "110px",
            objectFit: "contain",
            borderRadius: "50%",
            background: "#fff",
            border: "1px solid #eee",
            padding: "10px",
          }}
        />

      </div>

      <div className="tp-postbox-details-author-content">

        <span>Written By</span>

        <h4 className="tp-postbox-details-author-title">
          ShizzB Cosmetics
        </h4>

        <p>
          At <strong>ShizzB Cosmetics</strong>, we are passionate about
          sharing expert knowledge on skincare, beauty, makeup, and
          self-care. Our blogs are carefully written to help readers
          discover effective beauty routines, understand cosmetic
          ingredients, explore the latest trends, and make informed
          decisions when choosing beauty and skincare products. Whether
          you're a beginner or a beauty enthusiast, our goal is to
          provide practical, reliable, and easy-to-follow content that
          supports your beauty journey.
        </p>

      </div>

    </div>
  );
};

export default BlogDetailsAuthor;