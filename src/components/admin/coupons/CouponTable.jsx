import React from "react";

const CouponTable = ({
  coupons,
  onDelete,
}) => {

  const handleDelete = (id, title) => {

    const ok = window.confirm(

      `Are you sure you want to delete "${title}" ?`

    );

    if (ok) {

      onDelete(id);

    }

  };

  const formatDate = (date) => {

    if (!date) return "-";

    return new Date(date).toLocaleString();

  };

  return (

    <table className="coupon-table">

      <thead>

        <tr>

          <th>Logo</th>

          <th>Title</th>

          <th>Coupon Code</th>

          <th>Discount</th>

          <th>Minimum Amount</th>

          <th>Product Type</th>

          <th>Start Time</th>

          <th>End Time</th>

          <th>Status</th>

          <th>Action</th>

        </tr>

      </thead>

      <tbody>

        {coupons.map((coupon) => (

          <tr key={coupon._id}>

            <td>

              <img
                src={coupon.logo}
                alt={coupon.title}
                style={{
                  width: "45px",
                  height: "45px",
                  objectFit: "contain",
                }}
              />

            </td>

            <td>{coupon.title}</td>

            <td>

              <strong>

                {coupon.couponCode}

              </strong>

            </td>

            <td>

              {coupon.discountPercentage}%

            </td>

            <td>

              ₹ {coupon.minimumAmount}

            </td>
                        <td>

              {coupon.productType}

            </td>

            <td>

              {formatDate(coupon.startTime)}

            </td>

            <td>

              {formatDate(coupon.endTime)}

            </td>

            <td>

              <span
                className={`coupon-status ${coupon.status}`}
              >

                {coupon.status}

              </span>

            </td>

            <td>

              <button
                className="coupon-delete-btn"
                onClick={() =>
                  handleDelete(
                    coupon._id,
                    coupon.title
                  )
                }
              >

                Delete

              </button>

            </td>

          </tr>

        ))}

        {coupons.length === 0 && (

          <tr>

            <td
              colSpan="10"
              style={{
                textAlign: "center",
                padding: "30px",
              }}
            >

              No Coupons Found

            </td>

          </tr>

        )}

      </tbody>

    </table>
      );

};

export default CouponTable;