export const getServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // Ví dụ danh sách URL của bạn (có thể lấy từ database, API, ...)
  const urls = [
    { loc: `${baseUrl}`, lastmod: "2024-12-10" },
    { loc: `${baseUrl}who-we-are/about-us`, lastmod: "2024-12-10" },
    { loc: `${baseUrl}who-we-are/firm-history`, lastmod: "2024-12-10" },
    { loc: `${baseUrl}who-we-are/our-approach`, lastmod: "2024-12-10" },
    { loc: `${baseUrl}who-we-are/our-team`, lastmod: "2024-12-10" },
    { loc: `${baseUrl}who-we-are/careers`, lastmod: "2024-12-10" },
    { loc: `${baseUrl}why-vietnam`, lastmod: "2024-12-10" },
    { loc: `${baseUrl}products`, lastmod: "2024-12-10" },
    { loc: `${baseUrl}news`, lastmod: "2024-12-10" },
    { loc: `${baseUrl}get-in-touch`, lastmod: "2024-12-10" },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map(
          (url) => `
        <url>
          <loc>${url.loc}</loc>
          <lastmod>${url.lastmod}</lastmod>
        </url>
      `
        )
        .join("")}
    </urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null; // Không cần render giao diện
}
