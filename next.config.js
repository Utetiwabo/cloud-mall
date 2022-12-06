/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  swcMinify: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/noobyte",
  //       // permanent: false,
  //       // basePath: false,
  //     },
  //   ];
  // },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/noobyte",
  //       permanent: false,
  //       // basePath: false,
  //     },
  //   ];
  // },
};

module.exports = withBundleAnalyzer(nextConfig);
