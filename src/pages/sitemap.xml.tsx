import { type GetServerSideProps } from "next";

const BASE_URL = "https://www.cardgenius.me";

const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/app", priority: "0.8", changefreq: "weekly" },
  { path: "/app/new", priority: "0.7", changefreq: "monthly" },
  { path: "/app/blog", priority: "0.6", changefreq: "weekly" },
  { path: "/app/policy", priority: "0.5", changefreq: "monthly" },
  { path: "/auth/signin", priority: "0.5", changefreq: "monthly" },
];

function generateSitemap(urls: typeof staticRoutes) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ path, priority, changefreq }) => `  <url>
    <loc>${BASE_URL}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;
}

// This component is never rendered — we use getServerSideProps to serve XML
export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSitemap(staticRoutes);

  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate");
  res.write(sitemap);
  res.end();

  return { props: {} };
};
