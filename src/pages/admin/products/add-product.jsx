import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import AdminLayout from "../../../components/admin/AdminLayout";

const AddProduct = () => {

  const router = useRouter();

  const [saving, setSaving] = useState(false);

  const [brands, setBrands] = useState([]);

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({

    title: "",

    sku: "",

    unit: "pcs",

    img: "",

    slug: "",

    description: "",

    price: "",

    stock: "",

    discount: 0,

    featured: false,

    productType: "cosmetics",

    brand: {

      id: "",

      name: "",

    },

    category: {

      id: "",

      name: "",

    },

    parent: "",

    children: "",

    imageURLs: [],

    additionalInformation: [],

    offerDate: {

      startDate: "",

      endDate: "",

    },

    tags: []

  });

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      const brandRes = await axios.get(

        `${process.env.NEXT_PUBLIC_API_URL}/api/brand/all`

      );

      const categoryRes = await axios.get(

        `${process.env.NEXT_PUBLIC_API_URL}/api/category/all`

      );

      setBrands(brandRes.data.data || []);

      setCategories(categoryRes.data.data || []);

    }

    catch(err){

      console.log(err);

    }

  };

  const handleChange = (e)=>{

    const {name,value,type,checked}=e.target;

    setForm({

      ...form,

      [name]:

      type==="checkbox"

      ?

      checked

      :

      value

    });

  };

  const saveProduct = async()=>{

    try{

      setSaving(true);

      await axios.post(

        `${process.env.NEXT_PUBLIC_API_URL}/api/product/add`,

        form

      );

      alert("Product Added Successfully");

      router.push("/admin/products");

    }

    catch(err){

      console.log(err);

      alert("Unable to add product");

    }

    setSaving(false);

  };

  return(

    <AdminLayout>

      <div className="page-title">

        <h2>Add Product</h2>

      </div>

      <div className="dashboard-table">

        <div className="order-form-grid">

          <div>

            <label>Product Name</label>

            <input

              name="title"

              value={form.title}

              onChange={handleChange}

            />

          </div>

          <div>

            <label>SKU</label>

            <input

              name="sku"

              value={form.sku}

              onChange={handleChange}

            />

          </div>

          <div>

            <label>Price</label>

            <input

              type="number"

              name="price"

              value={form.price}

              onChange={handleChange}

            />

          </div>

          <div>

            <label>Stock</label>

            <input

              type="number"

              name="stock"

              value={form.stock}

              onChange={handleChange}

            />

          </div>

          <div>

            <label>Main Image URL</label>

            <input

              name="img"

              value={form.img}

              onChange={handleChange}

            />

          </div>

          <div>

            <label>Slug</label>

            <input

              name="slug"

              value={form.slug}

              onChange={handleChange}

            />

          </div>

          <div>

            <label>Brand</label>

            <select

              onChange={(e)=>{

                const b=brands.find(

                  x=>x._id===e.target.value

                );

                setForm({

                  ...form,

                  brand:{

                    id:b._id,

                    name:b.name

                  }

                });

              }}

            >

              <option>Select Brand</option>

              {

                brands.map(item=>(

                  <option

                    key={item._id}

                    value={item._id}

                  >

                    {item.name}

                  </option>

                ))

              }

            </select>

          </div>

          <div>

            <label>Category</label>

            <select

              onChange={(e)=>{

                const c=categories.find(

                  x=>x._id===e.target.value

                );

                setForm({

                  ...form,

                  category:{

                    id:c._id,

                    name:c.name

                  }

                });

              }}

            >

              <option>Select Category</option>

              {

                categories.map(item=>(

                  <option

                    key={item._id}

                    value={item._id}

                  >

                    {item.name}

                  </option>

                ))

              }

            </select>

          </div>

          <div>

            <label>

              Featured

            </label>

            <input

              type="checkbox"

              name="featured"

              checked={form.featured}

              onChange={handleChange}

            />

          </div>

          <div style={{gridColumn:"1 / span 2"}}>

            <label>Description</label>

            <textarea

              rows={6}

              name="description"

              value={form.description}

              onChange={handleChange}

            />

          </div>

        </div>

        <button

          className="save-btn"

          onClick={saveProduct}

        >

          {

            saving

            ?

            "Saving..."

            :

            "Save Product"

          }

        </button>

      </div>

    </AdminLayout>

  );

};

export default AddProduct;