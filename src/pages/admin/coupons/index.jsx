import { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "@/components/admin/AdminLayout";
import CouponForm from "@/components/admin/coupons/CouponForm";
import CouponTable from "@/components/admin/coupons/CouponTable";

const Coupons = () => {

  const [coupons, setCoupons] = useState([]);

  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {

    loadCoupons();

  }, []);

  const loadCoupons = async () => {

    try {

      setLoading(true);

      const res = await axios.get(

        `${process.env.NEXT_PUBLIC_API_URL}/api/coupon/all`

      );

      setCoupons(res.data);

    } catch (err) {

      console.log(err);

      alert("Unable to load coupons");

    }

    setLoading(false);

  };

  const addCoupon = async (formData) => {

    try {

      setLoading(true);

      await axios.post(

        `${process.env.NEXT_PUBLIC_API_URL}/api/coupon/add`,

        formData

      );

      alert("Coupon Added Successfully");

      setShowForm(false);

      loadCoupons();

    } catch (err) {

      console.log(err);

      alert("Unable to add coupon");

    }

    setLoading(false);

  };
    const deleteCoupon = async (id) => {

    try {

      await axios.delete(

        `${process.env.NEXT_PUBLIC_API_URL}/api/coupon/delete/${id}`

      );

      alert("Coupon Deleted Successfully");

      loadCoupons();

    }

    catch (err) {

      console.log(err);

      alert("Unable to delete coupon");

    }

  };

  return (

    <AdminLayout>

      <div className="coupon-page">

        <div className="coupon-header">

          <h2>

            Coupon Management

          </h2>

          <button

            className="coupon-add-btn"

            onClick={() =>
              setShowForm(!showForm)
            }

          >

            {showForm
              ? "Close Form"
              : "Add Coupon"}

          </button>

        </div>

        {showForm && (

          <CouponForm

            onSubmit={addCoupon}

            loading={loading}

          />

        )}
                {

          loading ? (

            <h3>

              Loading Coupons...

            </h3>

          ) : (

            <CouponTable

              coupons={coupons}

              onDelete={deleteCoupon}

            />

          )

        }

      </div>

    </AdminLayout>
      );

};

export default Coupons;