/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["media.discordapp.net", "cdn.discordapp.com"],
    },
    env: {
        MONGODB_URI: "mongodb://127.0.0.1//svrt-test",
        JWT_SECRET: "SRVTRENTWEBSECRETJWT",
        JWT_EXPIRE: "5d"
    },
};

module.exports = nextConfig;
