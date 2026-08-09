import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import AdminLayout from "../../../components/admin/AdminLayout";
import BrandForm from "../../../components/admin/brands/BrandForm";

const AddBrand = () => {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const saveBrand = async (formData) => {

    try {

      setLoading(true);

      const res = await axios.post(

        `${process.env.NEXT_PUBLIC_API_URL}/api/brand/add`,

        formData

      );

      if (res.data.status === "success") {

        alert("Brand Added Successfully");

        router.push("/admin/brands");

      }

    } catch (err) {

  console.log("ERROR =>", err);

  console.log("SERVER RESPONSE =>", err.response);

  console.log("SERVER DATA =>", err.response?.data);

  alert(
    err.response?.data?.message || "Unable to add brand"
  );

}

    setLoading(false);

  };

  return (

    <AdminLayout>

      <div className="brand-page">

        <div className="brand-header">

          <h2>Add Brand</h2>

        </div>

        <BrandForm

          onSubmit={saveBrand}

          loading={loading}

        />

      </div>

    </AdminLayout>

  );

};

export default AddBrand;