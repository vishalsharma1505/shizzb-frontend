import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import AdminLayout from "../../../../components/admin/AdminLayout";
import BrandForm from "../../../../components/admin/brands/BrandForm";

const EditBrand = () => {

  const router = useRouter();

  const { id } = router.query;

  const [brand, setBrand] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (id) {

      loadBrand();

    }

  }, [id]);

  const loadBrand = async () => {

    try {

      const res = await axios.get(

        `${process.env.NEXT_PUBLIC_API_URL}/api/brand/get/${id}`

      );

      setBrand(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const updateBrand = async (formData) => {

    try {

      setLoading(true);

      const res = await axios.patch(

        `${process.env.NEXT_PUBLIC_API_URL}/api/brand/edit/${id}`,

        formData

      );

      if (res.data.status) {

        alert("Brand Updated Successfully");

        router.push("/admin/brands");

      }

    } catch (err) {

      console.log(err);

      alert("Unable to update brand");

    }

    setLoading(false);

  };

  if (!brand) {

    return (

      <AdminLayout>

        <h3>Loading Brand...</h3>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <div className="brand-page">

        <div className="brand-header">

          <h2>Edit Brand</h2>

        </div>

        <BrandForm

          initialData={brand}

          onSubmit={updateBrand}

          loading={loading}

        />

      </div>

    </AdminLayout>

  );

};

export default EditBrand;