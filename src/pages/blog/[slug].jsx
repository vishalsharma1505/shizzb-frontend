import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import BlogDetailsArea from "@/components/blog-details/blog-details-area";

const BlogDetailsPage = ({
  blog,
  previous,
  next,
}) => {
  return (
    <Wrapper>

      <SEO
        pageTitle={
          blog?.seoTitle ||
          blog?.title ||
          "Blog"
        }
        description={
          blog?.metaDescription ||
          "ShizzB Cosmetics Blog"
        }
        keywords={
          blog?.metaKeywords || ""
        }
        canonical={
          blog?.canonicalUrl ||
          (blog?.slug
            ? `https://shizzb.in/blog/${blog.slug}`
            : "https://shizzb.in/blog")
        }
        ogTitle={
          blog?.ogTitle ||
          blog?.seoTitle ||
          blog?.title
        }
        ogDescription={
          blog?.ogDescription ||
          blog?.metaDescription ||
          "ShizzB Cosmetics Blog"
        }
        ogImage={
          blog?.ogImage ||
          blog?.image
        }
      />

      <HeaderTwo style_2={true} />

      <BlogDetailsArea
  blog={blog}
  previous={previous}
  next={next}
/>

      <Footer primary_style={true} />

    </Wrapper>
  );
};

export default BlogDetailsPage;

export const getServerSideProps = async ({ params }) => {
  try {
    const res = await fetch(
      `http://localhost:7000/api/blog/navigation/${params.slug}`
    );

    const result = await res.json();

    if (!result.success) {
      return {
        props: {
          blog: null,
          previous: null,
          next: null,
        },
      };
    }

    return {
      props: {
        blog: result.current,
        previous: result.previous,
        next: result.next,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        blog: null,
        previous: null,
        next: null,
      },
    };
  }
};