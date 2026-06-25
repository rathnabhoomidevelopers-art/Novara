export default function Head() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Skyup Digital Solutions LLP",
    "url": "https://www.novaranatureestates.com/about-us",
    "logo": "https://www.novaranatureestates.com/images/logo.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8660200662",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": "en"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "120",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.facebook.com/people/Novara-Nature-Estates/61585877764871/",
      "https://www.instagram.com/novaranatureestates/",
      "https://www.youtube.com/@NovaraNatureEstates",
      "https://www.linkedin.com/company/novara-nature-estates/"
    ]
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": "1",
        "name": "Skyup Digital Solutions",
        "item": "https://www.novaranatureestates.com/"
      },
      {
        "@type": "ListItem",
        "position": "2",
        "name": "Building Sustainable Farmland Investments Near Bangalore",
        "item": "https://www.novaranatureestates.com/why-novara"
      }
    ]
  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.novaranatureestates.com/why-novara/#webpage",
    "url": "https://www.novaranatureestates.com/why-novara",
    "name": "Building Sustainable Farmland Investments Near Bangalore",
    "description":
      "Learn about Novara Nature Estates, a trusted developer of managed farmlands near Bangalore delivering secure, sustainable agricultural investment opportunities",
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://www.novaranatureestates.com/#website",
      "url": "https://www.novaranatureestates.com/",
      "name": "SkyUp Digital Solutions LLP"
    },
    "about": {
      "@type": "Organization",
      "@id": "https://www.novaranatureestates.com/#organization"
    },
    "inLanguage": "en-IN"
  };

  return (
    <>
      <link
        rel="canonical"
        href="https://www.novaranatureestates.com/why-novara"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webpage),
        }}
      />
    </>
  );
}
