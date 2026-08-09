import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import BlogDetailsArea from "@/components/blog-details/blog-details-area";

const BlogDetailsPage = ({ blog }) => {
    console.log("BLOG DATA =>", blog);

  return (
    <Wrapper>
      <SEO pageTitle={blog?.title || "Blog Details"} />
      <HeaderTwo style_2={true} />
      <BlogDetailsArea blog={blog} />
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default BlogDetailsPage;

export const getServerSideProps = async ({ params }) => {
  try {
    const res = await fetch(
      `https://shizzb-backend.onrender.com/api/blog/${params.id}`
    );

    const result = await res.json();

    return {
      props: {
        blog: result.data || null,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        blog: null,
      },
    };
  }
};