// pages/blogs/@id/+onBeforePrerenderStart.js
import { BLOGS } from '../../../src/data/blogs';

export default function onBeforePrerenderStart() {
  return BLOGS.map((blog) => ({
    url: `/blogs/${blog.slug}`,
    pageContext: {
      title: blog.title,
      // Auto-generate description from first paragraph if not explicitly set
      description: blog.description
        || blog.sections?.find((s) => s.type === "p" && typeof s.text === "string")
          ?.text?.slice(0, 160)?.trim() + "…"
        || "",
      keywords: blog.tags?.join(", ") || "",
    },
  }));
}