/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["media.discordapp.net", "cdn.discordapp.com"],
    },
    env: {
        MONGODB_URI: "mongodb://localhost:27017/svrt-test",
        JWT_SECRET: "SRVTRENTWEBSECRETJWT",
        JWT_EXPIRE: "5d"
    },
};

module.exports = nextConfig;
