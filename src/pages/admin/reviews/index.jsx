import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import AdminLayout from "../../../components/admin/AdminLayout";
import ReviewTable from "../../../components/admin/reviews/ReviewTable";

const ReviewPage = () => {

  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const limit = 10;

  useEffect(() => {

    loadReviews();

  }, []);

  const loadReviews = async () => {

    try {

      const res = await axios.get(

        `${process.env.NEXT_PUBLIC_API_URL}/api/review/all`

      );

      if (res.data.success) {

        setReviews(res.data.result);

      }

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  };

  const filteredReviews = useMemo(() => {

    return reviews.filter((review) => {

      const product =

        review.productId?.title || "";

      const customer =

        review.userId?.name || "";

      const comment =

        review.comment || "";

      return (

        product.toLowerCase().includes(search.toLowerCase()) ||

        customer.toLowerCase().includes(search.toLowerCase()) ||

        comment.toLowerCase().includes(search.toLowerCase())

      );

    });

  }, [reviews, search]);

  const totalPages = Math.ceil(

    filteredReviews.length / limit

  );

  const displayReviews = filteredReviews.slice(

    (page - 1) * limit,

    page * limit

  );

  const deleteReview = async (id) => {

    try {

      await axios.delete(

        `${process.env.NEXT_PUBLIC_API_URL}/api/review/delete/${id}`

      );

      loadReviews();

    }

    catch (err) {

      console.log(err);

      alert("Unable to delete review");

    }

  };

  if (loading) {

    return (

      <AdminLayout>

        <h3>Loading Reviews...</h3>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <div className="review-page">

        <div className="review-header">

          <h2>

            Customer Reviews

          </h2>

        </div>

        <input

          className="review-search"

          placeholder="Search Reviews..."

          value={search}

          onChange={(e) => {

            setSearch(e.target.value);

            setPage(1);

          }}

        />

        <ReviewTable

          reviews={displayReviews}

          onDelete={deleteReview}

        />

        {

          totalPages > 1 &&

          <div className="review-pagination">

            {

              [...Array(totalPages)].map((_, i) => (

                <button

                  key={i}

                  className={

                    page === i + 1

                      ? "active"

                      : ""

                  }

                  onClick={() =>

                    setPage(i + 1)

                  }

                >

                  {i + 1}

                </button>

              ))

            }

          </div>

        }

      </div>

    </AdminLayout>

  );

};

export default ReviewPage;