import React, { useEffect, useState } from "react";

const CouponForm = ({
  initialData = {},
  onSubmit,
  loading,
}) => {

  const [formData, setFormData] = useState({
    logo: "",
    title: "",
    couponCode: "",
    startTime: "",
    endTime: "",
    discountPercentage: "",
    minimumAmount: "",
    productType: "",
    status: "active",
  });

  useEffect(() => {

    if (initialData && Object.keys(initialData).length > 0) {

      setFormData({
        logo: initialData.logo || "",
        title: initialData.title || "",
        couponCode: initialData.couponCode || "",
        startTime: initialData.startTime
          ? initialData.startTime.substring(0, 16)
          : "",
        endTime: initialData.endTime
          ? initialData.endTime.substring(0, 16)
          : "",
        discountPercentage:
          initialData.discountPercentage || "",
        minimumAmount:
          initialData.minimumAmount || "",
        productType:
          initialData.productType || "",
        status: initialData.status || "active",
      });

    }

  }, [initialData]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!formData.logo) {
      return alert("Logo is required");
    }

    if (!formData.title) {
      return alert("Title is required");
    }

    if (!formData.couponCode) {
      return alert("Coupon Code is required");
    }

    if (!formData.endTime) {
      return alert("End Time is required");
    }

    if (!formData.discountPercentage) {
      return alert("Discount Percentage is required");
    }

    if (!formData.minimumAmount) {
      return alert("Minimum Amount is required");
    }

    if (!formData.productType) {
      return alert("Product Type is required");
    }

    onSubmit(formData);

  };

  return (

    <form
      className="coupon-form"
      onSubmit={handleSubmit}
    >

      <div className="coupon-grid">

        <div className="coupon-field">

          <label>Logo URL</label>

          <input
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            placeholder="https://example.com/logo.png"
          />

        </div>

        <div className="coupon-field">

          <label>Coupon Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Festival Offer"
          />

        </div>

        <div className="coupon-field">

          <label>Coupon Code</label>

          <input
            type="text"
            name="couponCode"
            value={formData.couponCode}
            onChange={handleChange}
            placeholder="SAVE20"
          />

        </div>

        <div className="coupon-field">

          <label>Start Time</label>

          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
          />

        </div>

        <div className="coupon-field">

          <label>End Time</label>

          <input
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
          />

        </div>
                <div className="coupon-field">

          <label>Discount Percentage</label>

          <input
            type="number"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleChange}
            placeholder="10"
            min="1"
            max="100"
          />

        </div>

        <div className="coupon-field">

          <label>Minimum Amount</label>

          <input
            type="number"
            name="minimumAmount"
            value={formData.minimumAmount}
            onChange={handleChange}
            placeholder="500"
            min="0"
          />

        </div>

        <div className="coupon-field">

          <label>Product Type</label>

          <input
            type="text"
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            placeholder="All Products"
          />

        </div>

        <div className="coupon-field">

          <label>Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>

          </select>

        </div>

      </div>

      <div className="coupon-preview">

        <label>Logo Preview</label>

        <div className="coupon-preview-box">

          {formData.logo ? (

            <img
              src={formData.logo}
              alt="Coupon Logo"
            />

          ) : (

            <div className="coupon-no-logo">

              No Logo

            </div>

          )}

        </div>

      </div>
            <div className="coupon-btn-area">

        <button
          type="submit"
          className="coupon-save-btn"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : "Save Coupon"}
        </button>

      </div>

    </form>

  );

};

export default CouponForm;