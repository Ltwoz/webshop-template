/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["media.discordapp.net", "cdn.discordapp.com", "cdnb.artstation.com"],
    },
    env: {
        MONGODB_URI: "mongodb+srv://vercel-admin-user-63cf571b8d375c46538895bc:h81nm6s1ygA5MPIA@skitzer-shop.r68opm8.mongodb.net/myFirstDatabase?retryWrites=true",
        JWT_SECRET: "3cd80b76abe0fba695e15ea32a7981d6",
        JWT_EXPIRE: "5d",
        NEXTAUTH_SECRET: "3cd80b76abe0fba695e15ea32a7981d6"
    },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
