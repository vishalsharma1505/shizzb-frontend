import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import axios from "axios";
import AdminLayout from "../../../../components/admin/AdminLayout";

const ReactQuill = dynamic(
  () => import("react-quill"),
  {
    ssr: false,
  }
);

import "react-quill/dist/quill.snow.css";


const EditBlog = () => {

  const router = useRouter();

  const { id } = router.query;


  const [loading, setLoading] = useState(true);


  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [content, setContent] = useState("");

  const [seoTitle, setSeoTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [altTag, setAltTag] = useState("");



  useEffect(() => {

    if(id){

      loadBlog();

    }

  },[id]);



  const loadBlog = async()=>{

    try{

      const {data} = await axios.get(

        `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`

      );


      if(data.success){

        const blog = data.data;


        setTitle(blog.title || "");

        setAuthor(blog.author || "");

        setCategory(blog.category || "");

        setImage(blog.image || "");


        setPublishDate(
          blog.publishDate
          ? blog.publishDate.substring(0,10)
          :""
        );


        setContent(blog.content || "");


        setSeoTitle(blog.seoTitle || "");

        setMetaDescription(blog.metaDescription || "");

        setMetaKeywords(blog.metaKeywords || "");

        setAltTag(blog.altTag || "");


      }


    }catch(err){

      console.log(err);

    }


    setLoading(false);

  };




  const handleUpdate = async(e)=>{

    e.preventDefault();


    try{


      const {data} = await axios.put(

        `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`,

        {

          title,
          author,
          category,
          image,
          publishDate,
          content,
          seoTitle,
          metaDescription,
          metaKeywords,
          altTag,

        }

      );



      if(data.success){

        alert("Blog Updated Successfully");

        router.push("/admin/blogs");

      }



    }catch(err){

      console.log(err);

      alert("Unable to update blog");

    }


  };




  if(loading){

    return(

      <AdminLayout>

        <h3>Loading...</h3>

      </AdminLayout>

    )

  }





return (

<AdminLayout>


<div className="page-title">

<div>

<h2>Edit Blog</h2>

<small>
Update Blog Details
</small>

</div>

</div>



<form onSubmit={handleUpdate}>


<div className="admin-card">


<div className="form-grid">


<div className="form-group">

<label>
Blog Title
</label>

<input

type="text"

value={title}

onChange={(e)=>setTitle(e.target.value)}

/>

</div>




<div className="form-group">

<label>
Author
</label>

<input

type="text"

value={author}

onChange={(e)=>setAuthor(e.target.value)}

/>

</div>




<div className="form-group">

<label>
Category
</label>

<input

type="text"

value={category}

onChange={(e)=>setCategory(e.target.value)}

/>

</div>




<div className="form-group">

<label>
Publish Date
</label>

<input

type="date"

value={publishDate}

onChange={(e)=>setPublishDate(e.target.value)}

/>

</div>




<div className="form-group full">

<label>
Image URL
</label>

<input

type="text"

value={image}

onChange={(e)=>setImage(e.target.value)}

/>

</div>


</div>


</div>





<div className="admin-card">

<label>
Content
</label>


<ReactQuill

theme="snow"

value={content}

onChange={setContent}

/>


</div>






<div className="admin-card">


<h3>
SEO Information
</h3>


<div className="form-grid">


<div className="form-group full">

<label>
SEO Title
</label>

<input

type="text"

value={seoTitle}

onChange={(e)=>setSeoTitle(e.target.value)}

/>

</div>




<div className="form-group full">

<label>
Meta Description
</label>


<textarea

rows="4"

value={metaDescription}

onChange={(e)=>setMetaDescription(e.target.value)}

></textarea>


</div>





<div className="form-group">

<label>
Meta Keywords
</label>


<input

type="text"

value={metaKeywords}

onChange={(e)=>setMetaKeywords(e.target.value)}

/>


</div>





<div className="form-group">

<label>
Alt Tag
</label>


<input

type="text"

value={altTag}

onChange={(e)=>setAltTag(e.target.value)}

/>


</div>



</div>


</div>





<div
style={{
marginTop:"30px",
display:"flex",
justifyContent:"flex-end"
}}
>


<button

type="submit"

className="save-btn"

>

Update Blog

</button>


</div>



</form>



</AdminLayout>

);


};


export default EditBlog;