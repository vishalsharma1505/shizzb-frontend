import { useState, useEffect } from "react";
import axios from "axios";


import AdminLayout from "../../../components/admin/AdminLayout";

import ProductBasicInfo from "../../../components/admin/products/ProductBasicInfo";
import ProductPricing from "../../../components/admin/products/ProductPricing";
import ProductInventory from "../../../components/admin/products/ProductInventory";
import ProductBrandCategory from "../../../components/admin/products/ProductBrandCategory";
import ProductImages from "../../../components/admin/products/ProductImages";
import ProductDescription from "../../../components/admin/products/ProductDescription";
import ProductTags from "../../../components/admin/products/ProductTags";
import ProductAdditionalInfo from "../../../components/admin/products/ProductAdditionalInfo";
import ProductOffer from "../../../components/admin/products/ProductOffer";
import ProductSettings from "../../../components/admin/products/ProductSettings";
import ProductActions from "../../../components/admin/products/ProductActions";


const AddProduct = () => {

const [loading,setLoading]=useState(false);

const [brands,setBrands]=useState([]);

const [categories,setCategories]=useState([]);

const [imageInput,setImageInput]=useState("");

const [tagInput,setTagInput]=useState("");

const [infoKey,setInfoKey]=useState("");

const [infoValue,setInfoValue]=useState("");

const [product, setProduct] = useState({

  title: "",

  sku: "",

  unit: "pcs",

  img: "",

  imageURLs: [],

  parent:"",
children:"",
productType:"",

  price: "",

  discount: "",

  quantity: "",
  stock: "",

  lowStockLimit: 5,

  brand: {
    id: "",
    name: ""
  },

  category: {
    id: "",
    name: ""
  },

  status: "in-stock",

  featured: false,

  description: "",

  additionalInformation: [],

  tags: [],

  offerDate: {
    startDate: "",
    endDate: ""
  }

});

useEffect(()=>{

loadBrands();

loadCategories();

},[]);

const loadBrands=async()=>{

try{

const {data}=await axios.get(

`${process.env.NEXT_PUBLIC_API_URL}/api/brand/all`

);

const list=data.data||data.brands||[];

setBrands(data.result || []);

}

catch(err){

console.log(err);

setBrands([]);

}

};

const loadCategories=async()=>{

try{

const {data}=await axios.get(

`${process.env.NEXT_PUBLIC_API_URL}/api/category/all`

);

const list=data.data||data.categories||[];

setCategories(data.result || []);

}

catch(err){

console.log(err);

setCategories([]);

}

};

const handleChange=(e)=>{

const{name,value,type,checked}=e.target;

setProduct({

...product,

[name]:

type==="checkbox"

?checked

:value

});

};

const selectBrand=(id)=>{

const brand=brands.find(

item=>item._id===id

);

setProduct({

...product,

brand:{

id:brand?._id||"",

name:brand?.name||""

}

});

};

const selectCategory = (id) => {

  const category = categories.find(
    item => item._id === id
  );

  setProduct({

    ...product,

    category: {

      id: category?._id || "",

      name: category?.parent || ""

    },

    parent: category?.parent || "",

    children: category?.children?.[0] || "",

    productType: category?.productType || ""

  });

};

const addGalleryImage = () => {

  if (!imageInput.trim()) return;

  if (product.imageURLs.length >= 4) {
    alert("Maximum 4 gallery images allowed.");
    return;
  }

  setProduct({
    ...product,
    imageURLs: [
      ...product.imageURLs,
      {
        color: {
          name: "",
          clrCode: ""
        },
        img: imageInput,
        sizes: []
      }
    ]
  });

  setImageInput("");

};

const removeGalleryImage=(index)=>{

const list=[...product.imageURLs];

list.splice(index,1);

setProduct({

...product,

imageURLs:list

});

};

const addTag=()=>{

if(!tagInput.trim()) return;

if(product.tags.includes(tagInput)) return;

setProduct({

...product,

tags:[

...product.tags,

tagInput

]

});

setTagInput("");

};

const removeTag=(tag)=>{

setProduct({

...product,

tags:product.tags.filter(

item=>item!==tag

)

});

};
const addAdditionalInfo = () => {

  if (!infoKey.trim()) return;

  if (!infoValue.trim()) return;

  setProduct({

    ...product,

    additionalInformation: [

      ...product.additionalInformation,

      {

        key: infoKey,

        value: infoValue,

      },

    ],

  });

  setInfoKey("");

  setInfoValue("");

};

const removeAdditionalInfo = (index) => {

  const list = [...product.additionalInformation];

  list.splice(index, 1);

  setProduct({

    ...product,

    additionalInformation: list,

  });

};

const saveProduct = async (e) => {

  e.preventDefault();

  try {

    setLoading(true);

   const payload = {
  ...product,
  stock: Number(product.quantity),
};

await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/api/product/add`,
  payload
);

    alert("Product Added Successfully");

  } catch (err) {

    console.log(err);

    alert("Unable to save product");

  }

  setLoading(false);

};

return (

  <AdminLayout>

    <div className="page-title">

      <h2>Add Product</h2>

    </div>

    <form
      onSubmit={saveProduct}
      className="product-form"
    >

      <ProductBasicInfo
        product={product}
        handleChange={handleChange}
      />

      <ProductPricing
        product={product}
        handleChange={handleChange}
      />

      <ProductInventory
        product={product}
        handleChange={handleChange}
      />

      <ProductBrandCategory
        brands={brands}
        categories={categories}
        product={product}
        selectBrand={selectBrand}
        selectCategory={selectCategory}
      />

      <ProductImages
        product={product}
        handleChange={handleChange}
        imageInput={imageInput}
        setImageInput={setImageInput}
        addGalleryImage={addGalleryImage}
        removeGalleryImage={removeGalleryImage}
      />

      <ProductDescription
        product={product}
        handleChange={handleChange}
      />

      <ProductTags
        product={product}
        tagInput={tagInput}
        setTagInput={setTagInput}
        addTag={addTag}
        removeTag={removeTag}
      />

      <ProductAdditionalInfo
  product={product}
  setProduct={setProduct}
/>

      <ProductOffer
        product={product}
        setProduct={setProduct}
      />

      <ProductSettings
        product={product}
        handleChange={handleChange}
      />

      <ProductActions
        loading={loading}
      />

    </form>

  </AdminLayout>

);

};

export default AddProduct;