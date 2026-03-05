import { usePageContext } from 'vike-react/usePageContext'
import { useEffect } from 'react'
import { BLOGS } from '../src/data/blogs'

// Schema definitions per page

const getSchema = (urlPathname, blog = null) => {
  const base = 'https://novaranatureestates.com'
  const www  = 'https://www.novaranatureestates.com'

  // Blog detail page
  if (blog) {
    return [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${base}/blogs/${blog.slug}/#blogposting`,
        headline: blog.title,
        description: blog.description,
        image: `${www}${blog.heroImage || blog.image}`,
        url: `${base}/blogs/${blog.slug}`,
        datePublished: "2026-01-01",
        author: { "@type": "Organization", name: "Novara Nature Estates" },
        publisher: { "@id": `${base}/#organization` },
        keywords: blog.keywords || '',
        mainEntityOfPage: { "@type": "WebPage", "@id": `${base}/blogs/${blog.slug}` },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home",  item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Blog",  item: `${base}/blogs` },
          { "@type": "ListItem", position: 3, name: blog.title, item: `${base}/blogs/${blog.slug}` },
        ],
      },
    ]
  }

  // Blogs listing
  if (urlPathname === '/blogs') {
    return [
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": `${base}/blogs/#blog`,
        url: `${base}/blogs`,
        name: "Novara Nature Estates Blog",
        description: "Insights and guides on managed farmland investment, farmland near Bangalore, Lepakshi farmland opportunities and agricultural land investment strategies.",
        publisher: { "@type": "Organization", "@id": `${base}/#organization` },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blogs` },
        ],
      },
    ]
  }

  // Projects
  if (urlPathname === '/projects') {
    return [
      {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "@id": `${www}/projects/#listing`,
        name: "Ecovara Managed Farmland Near Lepakshi",
        description: "Explore Ecovara, premium managed farmland for sale near Lepakshi.",
        url: `${www}/projects`,
        image: `${www}/images/ecovara.webp`,
        datePosted: "2026-02-01",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home",     item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${base}/projects/` },
        ],
      },
    ]
  }

  // Contact Us
  if (urlPathname === '/contactus') {
    return [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": `${base}/contactus/#contactpage`,
        url: `${base}/contactus`,
        name: "Contact Novara Nature Estates",
        description: "Get in touch with Novara Nature Estates for managed farmland investment opportunities near Lepakshi and Bangalore.",
      },
      {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "@id": `${base}/#localbusiness`,
        name: "Novara Nature Estates",
        url: `${base}/`,
        telephone: "+91-8660200662",
        email: "info@novaranatureestates.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "13th Cross Rd, F Block, CQAL Layout, Sahakar Nagar, Bengaluru, Karnataka 560092",
          addressLocality: "Bangalore",
          addressRegion: "Karnataka",
          postalCode: "560092",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "Place", name: "Bangalore" },
          { "@type": "Place", name: "Lepakshi" },
        ],
      },
    ]
  }

  // Why Novara
  if (urlPathname === '/whynovara') {
    return [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": `${base}/whynovara/#aboutpage`,
        url: `${base}/whynovara`,
        name: "About Novara Nature Estates",
        description: "Learn about Novara Nature Estates, a premium managed farmland developer offering secure agricultural investment opportunities near Lepakshi, close to Bangalore.",
        isPartOf: { "@id": `${base}/` },
        mainEntity: { "@id": `${base}/#organization` },
      },
    ]
  }

  // Home (default)
  return [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${base}/#organization`,
          name: "Novara Nature Estates",
          url: www,
          logo: `${base}/logo.png`,
          description: "Invest in premium managed farmlands near Bangalore at Novara Nature Estates. Clear titles, gated layout & professional farm management. Enquire now.",
          sameAs: [
            "https://www.facebook.com/novaranatureestates",
            "https://www.instagram.com/novaranatureestates",
            "https://www.youtube.com/@novaranatureestates",
            "https://www.linkedin.com/company/novara-nature-estates/",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-8660200662",
            contactType: "sales",
            areaServed: "IN",
            availableLanguage: ["English", "Kannada", "Hindi"],
          },
        },
        {
          "@type": "RealEstateAgent",
          "@id": `${base}/#localbusiness`,
          name: "Novara Nature Estates",
          url: `${base}/`,
          telephone: "+91-8660200662",
          address: {
            "@type": "PostalAddress",
            streetAddress: "13th Cross Rd, F Block, CQAL Layout, Sahakar Nagar, Bengaluru, Karnataka 560092",
            addressLocality: "Bangalore",
            addressRegion: "Karnataka",
            postalCode: "560092",
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 13.0583,
            longitude: 77.5942,
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
              opens: "09:00",
              closes: "18:00",
            },
          ],
          areaServed: [
            { "@type": "Place", name: "Bangalore" },
            { "@type": "Place", name: "Lepakshi" },
          ],
        },
      ],
    },
  ]
}

// Helper: inject schemas into <head> 

function injectSchemas(schemas) {
  // Remove ALL schema tags (both static from +Head.jsx and previously injected)
  document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove())

  schemas.forEach(schema => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-dynamic-schema', 'true')
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)
  })
}

// Layout 

export default function Layout({ children }) {
  const pageContext = usePageContext()
  const { config, urlPathname } = pageContext

  useEffect(() => {
    let title       = config?.title
    let description = config?.metaDescription
    let keywords    = config?.keywords
    let blog        = null

    // Blog slug pages
    const blogMatch = urlPathname.match(/^\/blogs\/(.+)$/)
    if (blogMatch) {
      const slug = blogMatch[1]
      blog = BLOGS.find((b) => b.slug === slug)
      if (blog) {
        title       = blog.title ? `${blog.title} | Novara Nature Estates` : title
        description = blog.description
          || blog.sections?.find(s => s.type === 'p' && typeof s.text === 'string')?.text?.slice(0, 160)
          || description
        keywords    = blog.keywords || keywords
      }
    }

    //Title 
    if (title) document.title = title

    //Description
    let descTag = document.querySelector('meta[name="description"]')
    if (!descTag) {
      descTag = document.createElement('meta')
      descTag.setAttribute('name', 'description')
      document.head.appendChild(descTag)
    }
    descTag.setAttribute('content', description ?? '')

    // Keywords
    let kwTag = document.querySelector('meta[name="keywords"]')
    if (!kwTag) {
      kwTag = document.createElement('meta')
      kwTag.setAttribute('name', 'keywords')
      document.head.appendChild(kwTag)
    }
    kwTag.setAttribute('content', keywords ?? '')

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute(
      'href',
      `https://www.novaranatureestates.com${urlPathname === '/' ? '' : urlPathname}`
    )

    // Schema
    injectSchemas(getSchema(urlPathname, blog))

  }, [urlPathname])

  return <>{children}</>
}