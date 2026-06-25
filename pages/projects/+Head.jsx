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
        "name": "Ecovara - Premium Managed Farmland for Sale Near Lepakshi",
        "item": "https://www.novaranatureestates.com/projects"
      }
    ]
  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.novaranatureestates.com/projects/#webpage",
    "url": "https://www.novaranatureestates.com/projects",
    "name": "Ecovara - Premium Managed Farmland for Sale Near Lepakshi.",
    "description":
      "Explore Ecovara, premium managed farmland for sale near Lepakshi. Gated layout, clear titles, and professional farm management by Novara Nature Estates.",
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

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Ecovara by Novara Nature Estates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Ecovara is a premium gated farmland project offering legally clear agricultural land near Bangalore, designed for secure ownership, weekend retreats, and long-term farmland investment."
        }
      },
      {
        "@type": "Question",
        "name": "Where is the Ecovara project located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Ecovara offers farm plots near Lepakshi, strategically positioned within the North Bangalore growth corridor. The location provides peaceful natural surroundings while remaining well connected to Bangalore and the airport region."
        }
      },
      {
        "@type": "Question",
        "name": "Is Ecovara a gated farmland community?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes, Ecovara is a planned gated farmland project near Bangalore with secure entry, compound fencing, internal roads, and structured layout development."
        }
      },
      {
        "@type": "Question",
        "name": "Is Ecovara suitable for farmland investment near Bangalore?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes. Due to its location advantage and increasing demand for farm plots near Bangalore, Ecovara presents strong long-term appreciation potential."
        }
      },
      {
        "@type": "Question",
        "name": "Can I build a farmhouse on my plot?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes, buyers can develop private farmhouses on their agricultural land near Lepakshi, subject to applicable local regulations."
        }
      },
      {
        "@type": "Question",
        "name": "Is the land legally verified and ready for registration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "All plots come with legally verified documentation and are ready for registration, ensuring safe agricultural land investment."
        }
      },
      {
        "@type": "Question",
        "name": "How can I book a site visit for Ecovara farm plots?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "You can schedule a guided site visit by contacting our team through the enquiry form or by calling our sales representatives directly."
        }
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

  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Ecovara",
    "image":
      "https://www.novaranatureestates.com/images/Farm_11zon.webp",
    "description":
      "Explore Ecovara, premium managed farmland for sale near Lepakshi. Gated layout, clear titles, and professional farm management by Novara Nature Estates.",
    "brand": {
      "@type": "Brand",
      "name": "Novara Nature Estates"
    },
    "offers": {
      "@type": "AggregateOffer",
      "url": "https://www.novaranatureestates.com/projects",
      "priceCurrency": "INR",
      "lowPrice": "On Request",
      "highPrice": "On Request"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "7654"
    }
  };

  return (
    <>
      <link
        rel="canonical"
        href="https://www.novaranatureestates.com/projects"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
      />
    </>
  );
}
