import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewTable = ({
  reviews,
  onDelete,
}) => {

  const handleDelete = (id, product) => {

    const ok = window.confirm(

      `Delete review for "${product}" ?\n\nThis action cannot be undone.`

    );

    if (ok) {

      onDelete(id);

    }

  };

  const renderStars = (rating = 0) => {

    const stars = [];

    for (let i = 1; i <= 5; i++) {

      stars.push(

        <FaStar
          key={i}
          color={i <= rating ? "#f59e0b" : "#d1d5db"}
          size={15}
        />

      );

    }

    return stars;

  };

  return (

    <table className="review-table">

      <thead>

        <tr>

          <th>Product</th>

          <th>Customer</th>

          <th>Rating</th>

          <th>Comment</th>

          <th>Date</th>

          <th>Action</th>

        </tr>

      </thead>

      <tbody>

        {

          reviews.length > 0 ?

            reviews.map((review) => (

              <tr key={review._id}>

                <td>

                  <div className="review-product">

                    <img

                      src={
                        review.productId?.img ||

                        "/assets/img/product/default-product.png"
                      }

                      alt="product"

                    />

                    <span>

                      {review.productId?.title || "-"}

                    </span>

                  </div>

                </td>

                <td>

                  <div className="review-user">

                    <strong>

                      {review.userId?.name || "-"}

                    </strong>

                    <small>

                      {review.userId?.email || ""}

                    </small>

                  </div>

                </td>

                <td>

                  <div className="review-rating">

                    {renderStars(review.rating)}

                  </div>

                </td>

                <td className="review-comment">

                  {review.comment}

                </td>

                <td>

                  {

                    new Date(

                      review.createdAt

                    ).toLocaleDateString()

                  }

                </td>

                <td>

                  <button

                    className="delete-btn"

                    onClick={() =>

                      handleDelete(

                        review._id,

                        review.productId?.title

                      )

                    }

                  >

                    Delete

                  </button>

                </td>

              </tr>

            ))

            :

            (

              <tr>

                <td

                  colSpan="6"

                  style={{

                    textAlign: "center",

                    padding: "40px",

                  }}

                >

                  No Reviews Found

                </td>

              </tr>

            )

        }

      </tbody>

    </table>

  );

};

export default ReviewTable;