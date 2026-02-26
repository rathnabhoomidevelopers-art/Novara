import { usePageContext } from 'vike-react/usePageContext'
import { useEffect } from 'react'

export default function Layout({ children }) {
  const pageContext = usePageContext()
  const { config, urlPathname } = pageContext

  useEffect(() => {
    let title = config?.title
    let description = config?.metaDescription
    let keywords = config?.keywords

    // ── Blog slug pages ───────────────────────────────────────
    const blogMatch = urlPathname.match(/^\/blogs\/(.+)$/)
    if (blogMatch) {
      const slug = blogMatch[1]
      // If you have a BLOGS data file, import and use it here:
      // import { BLOGS } from '../src/data/blogs'
      // const blog = BLOGS.find((b) => b.slug === slug)
      // title = blog?.title
      // description = blog?.description
      // keywords = blog?.keywords
    }

    // ── Apply title ───────────────────────────────────────────
    if (title) document.title = title

    // ── Apply description ─────────────────────────────────────
    let descTag = document.querySelector('meta[name="description"]')
    if (!descTag) {
      descTag = document.createElement('meta')
      descTag.setAttribute('name', 'description')
      document.head.appendChild(descTag)
    }
    descTag.setAttribute('content', description ?? '')

    // ── Apply keywords ────────────────────────────────────────
    let kwTag = document.querySelector('meta[name="keywords"]')
    if (!kwTag) {
      kwTag = document.createElement('meta')
      kwTag.setAttribute('name', 'keywords')
      document.head.appendChild(kwTag)
    }
    kwTag.setAttribute('content', keywords ?? '')

    // ── Canonical ─────────────────────────────────────────────
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

  }, [urlPathname])

  return <>{children}</>
}