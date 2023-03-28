/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  swcMinify: false,

  images: {
    domains: ["cms.okhub.vn", "cms.timvest.ch"],

  },
  env: {
    HOSTNAME_CMS: "https://cms.okhub.vn/graphql",
    HOSTNAME: "https://cms.okhub.vn/graphql",
    HOSTNAME_DEMO: "https://cms.okhub.vn",
    NEXT_PUBLIC_HOME_DOMAIN: "tim.vn",
  },
};

module.exports = nextConfig;
