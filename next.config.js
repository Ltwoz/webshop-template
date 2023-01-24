/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["media.discordapp.net", "cdn.discordapp.com"],
    },
    env: {
        MONGODB_URI: "mongodb+srv://vercel-admin-user-63cf571b8d375c46538895bc:h81nm6s1ygA5MPIA@skitzer-shop.r68opm8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        JWT_SECRET: "SRVTRENTWEBSECRETJWT",
        JWT_EXPIRE: "5d"
    },
};

module.exports = nextConfig;
