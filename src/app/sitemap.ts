import { MetadataRoute } from "next";
import { getAllKeywords } from "@/lib/keywords";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://simonwerdetail.info";
  const lastModified = new Date();

  // Core static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/keywords`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Tool specific routes
  const toolSlugs = [
    "sim-format-validator",
    "ip-lookup",
    "password-generator",
    "qr-generator",
    "ping",
    "json-formatter",
    "base64",
    "url-encoder",
    "text-case-converter",
    "word-counter",
    "uuid-generator",
    "lorem-ipsum-generator",
    "bcrypt-generator",
    "color-converter",
    "css-formatter",
    "jwt-decoder",
    "markdown-previewer",
  ];

  const toolRoutes: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // All 200 keyword routes
  const allKeywords = getAllKeywords();
  const keywordRoutes: MetadataRoute.Sitemap = allKeywords.map((item) => ({
    url: `${baseUrl}/keywords/${item.slug}`,
    lastModified: new Date(item.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...toolRoutes, ...keywordRoutes];
}
