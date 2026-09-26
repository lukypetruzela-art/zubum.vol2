import type { MetadataRoute } from "next";
import { clinic } from "@/data/clinic";
import { getPublishedNews } from "@/lib/news";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await getPublishedNews();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: clinic.siteUrl, changeFrequency: "weekly", priority: 1 },
    {
      url: `${clinic.siteUrl}/aktuality`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${clinic.siteUrl}/ochrana-osobnich-udaju`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const newsRoutes: MetadataRoute.Sitemap = news.map((item) => ({
    url: `${clinic.siteUrl}/aktuality/${item.slug}`,
    lastModified: item.updated_at,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...newsRoutes];
}
