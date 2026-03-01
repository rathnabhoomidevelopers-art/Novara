export function onBeforeRoute(pageContext) {
  const { urlPathname } = pageContext;

  if (urlPathname !== '/' && urlPathname.endsWith('/')) {
    return {
      pageContext: {
        urlPathname: urlPathname.slice(0, -1)
      }
    };
  }
}