import vikeReact from 'vike-react/config'

export default {
  extends: vikeReact,
  prerender: true,
  clientRouting: true,

  redirects:{
    "/whynovara":"/why-novara",
    "/contactus":"/contact-us",
    "/privacypolicy":"/privacy-policy",
    "/termscondition":"/terms-conditions"
  },
  meta: {
    keywords: {
      env: { server: true, client: true }
    },
    metaDescription: {
      env: { server: true, client: true }
    }
  }
}