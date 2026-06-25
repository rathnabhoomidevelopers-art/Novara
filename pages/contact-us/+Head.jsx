export default function Head() {
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
        "name": "Get in Touch with Novara",
        "item": "https://www.novaranatureestates.com/contact-us/"
      }
    ]
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.novaranatureestates.com/#organization",
    "name": "Novara Nature Estates",
    "url": "https://www.novaranatureestates.com/",
    "logo": "https://www.novaranatureestates.com/images/logo.svg",
    "description":
      "Invest in premium managed farmlands near Bangalore at Novara Nature Estates. Clear titles, gated layout & professional farm management. Enquire now.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8660200662",
      "contactType": "customer support",
      "areaServed": "IN",
      "availableLanguage": ["English", "Kannada", "Hindi"]
    },
    "sameAs": [
      "https://www.facebook.com/people/Novara-Nature-Estates/61585877764871/",
      "https://www.instagram.com/novaranatureestates/",
      "https://www.youtube.com/@NovaraNatureEstates",
      "https://www.linkedin.com/company/novara-nature-estates/"
    ]
  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.novaranatureestates.com/contact-us/#webpage",
    "url": "https://www.novaranatureestates.com/contact-us/",
    "name": "Get in Touch with Novara",
    "description":
      "Get in touch with Novara Nature Estates to book a farmland site visit or speak with our experts about managed farmland investments.",
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

  return (
    <>
      <link
        rel="canonical"
        href="https://www.novaranatureestates.com/contact-us/"
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
          __html: JSON.stringify(organization),
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
