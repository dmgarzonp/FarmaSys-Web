import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from "vite";

const mode = process.env.NODE_ENV === "production" ? "production" : "development";
const fileEnv = loadEnv(mode, process.cwd(), "");
const siteUrl = process.env.PUBLIC_SITE_URL ?? fileEnv.PUBLIC_SITE_URL;

if (!siteUrl) {
  throw new Error("Missing PUBLIC_SITE_URL. Copy .env.example to .env and set it.");
}

export default defineConfig({
  site: siteUrl,
  integrations: [sitemap()],
});
