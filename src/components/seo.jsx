import Head from "next/head";

const SEO = ({
  pageTitle,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
}) => (
  <Head>
    <title>
      {pageTitle
        ? `${pageTitle} - ShizzB Cosmetics`
        : "ShizzB Cosmetics"}
    </title>

    <meta httpEquiv="x-ua-compatible" content="ie=edge" />

    <meta
      name="description"
      content={
        description ||
        "ShizzB Cosmetics - Premium Beauty & Cosmetic Products"
      }
    />

    <meta
      name="keywords"
      content={keywords || ""}
    />

    <meta
      name="robots"
      content="index, follow"
    />

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />

    {/* Canonical URL */}
    {canonical && (
      <link
        rel="canonical"
        href={canonical}
      />
    )}

    {/* Open Graph */}
    <meta
      property="og:type"
      content="website"
    />

    <meta
      property="og:title"
      content={ogTitle || pageTitle}
    />

    <meta
      property="og:description"
      content={
        ogDescription || description
      }
    />

    {ogImage && (
      <meta
        property="og:image"
        content={ogImage}
      />
    )}

    {/* Twitter */}
    <meta
      name="twitter:card"
      content="summary_large_image"
    />

    <meta
      name="twitter:title"
      content={ogTitle || pageTitle}
    />

    <meta
      name="twitter:description"
      content={
        ogDescription || description
      }
    />

    {ogImage && (
      <meta
        name="twitter:image"
        content={ogImage}
      />
    )}

    <link
      rel="icon"
      href="/favicon.png"
    />
  </Head>
);

export default SEO;