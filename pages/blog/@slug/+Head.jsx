// pages/blogs/@id/+Head.jsx
import { usePageContext } from "vike-react/usePageContext";
import { BLOGS } from "../../../src/data/blogs";

export default function Head() {
  const pageContext = usePageContext();
  const slug = pageContext.routeParams?.id;
  const blog = BLOGS.find((b) => b.slug === slug);

  const title = blog?.title
    ? `${blog.title} | Novara Nature Estates`
    : "Blog | Novara Nature Estates";

  // Auto-generate description from first paragraph if no description field
  const firstPara = blog?.sections?.find(
    (s) => s.type === "p" && typeof s.text === "string"
  );
  const description = blog?.description
    || (firstPara ? firstPara.text.slice(0, 160).trim() + "…" : "");

  const keywords = blog?.tags?.join(", ") || "";
  const canonicalUrl = slug
    ? `https://www.novaranatureestates.com/blogs/${slug}`
    : "https://www.novaranatureestates.com/blogs";
  const ogImage = blog?.heroImage || blog?.image || "/images/og-default.webp";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {slug && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Novara Nature Estates" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  );
}