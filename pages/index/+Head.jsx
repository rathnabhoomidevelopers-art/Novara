export default function Head() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Novara Nature Estates",
    "image":
      "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHr8MX-njmO_MEhDbNEYlIhjuobmiaQd_d2EZd-zsS6oXaBXcVgKBFB7WMNEeodwXPKK7H8FuqRyslyOvm1pSlYuAWMgEH01tZGfBbyifiHODdj3p2tCEZyONdXIa4mNWV47emNv5Vi7FHn=w408-h408-k-no",
    "@id": "https://www.novaranatureestates.com/",
    "url": "https://www.novaranatureestates.com/",
    "telephone": "+91 8660200662",
    "address": {
      "@type": "PostalAddress",
      "streetAddress":
        "13th Cross Rd, F Block, Sahakar Nagar, Byatarayanapura",
      "addressLocality": "Bangalore",
      "postalCode": "560092",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.062645870130721,
      "longitude": 77.58860056661055
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/people/Novara-Nature-Estates/61585877764871/",
      "https://www.instagram.com/novaranatureestates/",
      "https://www.youtube.com/@NovaraNatureEstates",
      "https://www.linkedin.com/company/novara-nature-estates/"
    ]
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Novara Nature Estates",
    "url": "https://www.novaranatureestates.com",
    "logo": "https://www.novaranatureestates.com/images/logo.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-866020062",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": "en"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "1761",
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

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.novaranatureestates.com/#website",
    "name": "Novara Nature Estates",
    "alternateName": "Novara Nature Estates",
    "url": "https://www.novaranatureestates.com/",
    "description":
      "Invest in premium managed farmlands near Bangalore at Novara Nature Estates. Clear titles, gated layout & professional farm management. Enquire now.",
    "inLanguage": "en",
    "publisher": {
      "@type": "Organization",
      "name": "Novara Nature Estates",
      "url": "https://www.novaranatureestates.com/"
    }
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Novara Nature Estates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Novara Nature Estates is a premium farmland developer offering gated farm plots and agricultural land near Bangalore with clear titles, managed infrastructure, and long-term investment potential."
        }
      },
      {
        "@type": "Question",
        "name": "Where are your Projects located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Our Project are strategically located near Lepakshi, in the fast-developing North Bangalore corridor, offering excellent connectivity to the airport region while preserving peaceful natural surroundings and long-term investment potential."
        }
      },
      {
        "@type": "Question",
        "name": "Is agricultural land a good investment near Bangalore?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes. Farmland near Bangalore has shown strong appreciation due to airport expansion, infrastructure growth, and increasing demand for gated farmland communities."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide gated farmland projects?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes. Novara offers gated farmland projects with internal roads, fencing, water facilities, and plantation support for a secure and structured investment experience."
        }
      },
      {
        "@type": "Question",
        "name": "Is the farmland legally clear?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "All our agricultural land parcels come with clear titles, proper documentation, and legal due diligence to ensure a safe purchase."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide plantation or farm management support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes, we offer optional managed farmland services including plantation assistance and maintenance support."
        }
      }
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
      <link rel="canonical" href="https://www.novaranatureestates.com/" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
      />

      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Managed Farmlands Near Bangalore | Novara Nature Estates"
      />
      <meta
        property="og:description"
        content="Invest in premium managed farmlands near Bangalore at Novara Nature Estates. Clear titles, gated layout & professional farm management. Enquire now."
      />
      <meta property="og:url" content="https://www.novaranatureestates.com/" />
      <meta
        property="og:image"
        content="https://www.novaranatureestates.com/images/Ecovara%20_11zon.webp"
      />
      <meta property="og:site_name" content="Novara Nature Estates" />
      <meta property="og:locale" content="en_IN" />
    </>
  );
}
