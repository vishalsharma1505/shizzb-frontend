import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import AdminLayout from "../../../components/admin/AdminLayout";
import BrandTable from "../../../components/admin/brands/BrandTable";


const BrandPage = () => {

  const router = useRouter();

  const [brands, setBrands] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const limit = 10;

  useEffect(() => {

    loadBrands();

  }, []);

  const loadBrands = async () => {

    try {

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/brand/active`
      );

      if (res.data.success) {

        setBrands(res.data.result);

      }

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  };

  const filteredBrands = useMemo(() => {

    return brands.filter((brand) => {

      return (

        brand.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        brand.email
          .toLowerCase()
          .includes(search.toLowerCase())

      );

    });

  }, [brands, search]);

  const totalPages = Math.ceil(
    filteredBrands.length / limit
  );

  const displayBrands = filteredBrands.slice(

    (page - 1) * limit,

    page * limit

  );

  const handleDelete = async (id) => {

    const ok = window.confirm(
      "Delete this Brand ?"
    );

    if (!ok) return;

    try {

      await axios.delete(

        `${process.env.NEXT_PUBLIC_API_URL}/api/brand/delete/${id}`

      );

      loadBrands();

    } catch (err) {

      console.log(err);

    }

  };

  const handleEdit = (brand) => {

    router.push(`/admin/brands/edit/${brand._id}`);

  };

  if (loading) {

    return (

      <AdminLayout>

        <h3>Loading Brands...</h3>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <div className="brand-page">

        <div className="brand-header">

          <h2>Brands</h2>

          <button

            className="brand-add-btn"

            onClick={() =>
              router.push("/admin/brands/add")
            }

          >

            + Add Brand

          </button>

        </div>

        <input

          className="brand-search"

          placeholder="Search Brand..."

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

        />

        <BrandTable

          brands={displayBrands}

          onDelete={handleDelete}

          onEdit={handleEdit}

        />

        <div className="brand-pagination">

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

      </div>

    </AdminLayout>

  );

};

export default BrandPage;