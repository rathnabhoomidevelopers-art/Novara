// pages/blogs/@id/+Page.jsx
import { usePageContext } from "vike-react/usePageContext";
import BlogDetail from "../../../src/pages/BlogDetails";

export default function Page() {
  const pageContext = usePageContext();
  const slug = pageContext.routeParams?.id;

  // Pass slug as a prop so BlogDetail doesn't need useParams()
  return <BlogDetail vikeSlug={slug} />;
}