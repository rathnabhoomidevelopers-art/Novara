export default function Head() {
  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.novaranatureestates.com/blogs/#webpage",
    "url": "https://www.novaranatureestates.com/blogs",
    "name": "Farmland Investment Insights & Guides.",
    "description":
      "Explore expert insights on managed farmland investment, sustainability & agricultural land ownership near Bangalore from Novara Nature Estates.",
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://www.novaranatureestates.com/#website",
      "url": "https://www.novaranatureestates.com/",
      "name": "Novara Nature Estates"
    },
    "about": {
      "@type": "Organization",
      "@id": "https://www.novaranatureestates.com/#organization"
    },
    "inLanguage": "en-IN"
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": "1",
        "name": "Novara Nature Estates",
        "item": "https://www.novaranatureestates.com/"
      },
      {
        "@type": "ListItem",
        "position": "2",
        "name": "Blogs",
        "item": "https://www.novaranatureestates.com/blogs"
      }
    ]
  };

  return (
    <>
      <link
        rel="canonical"
        href="https://www.novaranatureestates.com/blogs"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webpage),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb),
        }}
      />
    </>
  );
}
