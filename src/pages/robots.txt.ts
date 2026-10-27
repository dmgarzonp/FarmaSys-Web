import type { APIRoute } from "astro";
import { site } from "../config/site";

export const prerender = true;

export const GET: APIRoute = () => {
  const sitemap = new URL("/sitemap-index.xml", site.domain).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
