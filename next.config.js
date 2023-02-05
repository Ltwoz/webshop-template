/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "media.discordapp.net",
            "cdn.discordapp.com",
            "cdnb.artstation.com",
            "dummyimage.com",
        ],
    },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
