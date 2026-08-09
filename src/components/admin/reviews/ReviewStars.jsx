import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const ReviewStars = ({ rating = 0 }) => {

  return (

    <div className="review-stars">

      {[1, 2, 3, 4, 5].map((item) => (

        item <= rating ? (

          <FaStar
            key={item}
            className="filled"
          />

        ) : (

          <FaRegStar
            key={item}
            className="empty"
          />

        )

      ))}

    </div>

  );

};

export default ReviewStars;