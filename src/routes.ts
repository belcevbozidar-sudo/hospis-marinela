import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("components/site-layout.tsx", [
    index("pages/Index.tsx"),
    route("about", "pages/about/page.tsx"),
    route("services", "pages/services/page.tsx"),
    route("team", "pages/team/page.tsx"),
    route("contact", "pages/contact/page.tsx"),
    route("reviews", "pages/reviews/page.tsx"),
    route("admission", "pages/admission/page.tsx"),
    route("prices", "pages/prices/page.tsx"),
    route("gallery", "pages/gallery/page.tsx"),
  ]),
  route("*", "pages/NotFound.tsx"),
] satisfies RouteConfig;
