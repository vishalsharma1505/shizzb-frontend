import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import AdminLayout from "../../../components/admin/AdminLayout";

const AddCategory = () => {

  const router = useRouter();

  const [parent, setParent] = useState("");

  const [description, setDescription] = useState("");

  const [img, setImg] = useState("");

  const [showOnHome, setShowOnHome] = useState(false);

  const [displayOrder, setDisplayOrder] = useState(0);

  const [saving, setSaving] = useState(false);

  const submitHandler = async (e) => {

    e.preventDefault();

    if (!parent.trim()) {

      alert("Category Name Required");

      return;

    }

    setSaving(true);

    try {

      const payload = {

        parent,

        description,

        img,

        showOnHome,

        displayOrder,

        productType: "all"

      };

      const { data } = await axios.post(

        `${process.env.NEXT_PUBLIC_API_URL}/api/category/add`,

        payload

      );

      if (data.status === "success") {

        alert("Category Added Successfully");

        router.push("/admin/categories");

      }

    } catch (err) {

      console.log(err);

      alert("Unable to add category");

    }

    setSaving(false);

  };

  return (

    <AdminLayout>

      <div className="page-title">

        <div>

          <h2>Add Category</h2>

          <small>

            Create new category

          </small>

        </div>

        <Link href="/admin/categories">

          <button className="save-btn">

            ← Back

          </button>

        </Link>

      </div>

      <form
        className="category-form"
        onSubmit={submitHandler}
      >

        <div className="category-form-grid">

          {/* Left */}

          <div className="category-form-card">

            <h4>Category Information</h4>

            <hr />

            <label>

              Category Name

            </label>

            <input
              type="text"
              value={parent}
              onChange={(e)=>
                setParent(e.target.value)
              }
              placeholder="Skin Care"
            />

            <label>

              Description

            </label>

            <textarea
              rows="5"
              value={description}
              onChange={(e)=>
                setDescription(e.target.value)
              }
            />

            <label>

              Image URL

            </label>

            <input
              type="text"
              value={img}
              onChange={(e)=>
                setImg(e.target.value)
              }
              placeholder="https://..."
            />

          </div>

          {/* Right */}

          <div className="category-form-card">

            <h4>Settings</h4>

            <hr />

            <label>

              Display Order

            </label>

            <input
              type="number"
              value={displayOrder}
              onChange={(e)=>
                setDisplayOrder(e.target.value)
              }
            />

            <div className="category-checkbox">

              <input

                type="checkbox"

                checked={showOnHome}

                onChange={(e)=>

                  setShowOnHome(

                    e.target.checked

                  )

                }

              />

              <span>

                Show on Home Page

              </span>

            </div>

            <div className="category-preview">

              <h5>

                Image Preview

              </h5>

              <img

                src={
                  img ||
                  "/assets/img/no-image.png"
                }

                onError={(e)=>{

                  e.target.src="/assets/img/no-image.png";

                }}

                alt="preview"

              />

            </div>

          </div>

        </div>

        <div className="category-submit">

          <button
            className="save-btn"
            disabled={saving}
          >

            {

              saving

              ? "Saving..."

              : "Save Category"

            }

          </button>

        </div>

      </form>

    </AdminLayout>

  );

};

export default AddCategory;