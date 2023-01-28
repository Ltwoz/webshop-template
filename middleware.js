import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized({ req, token }) {
            if (req.nextUrl.pathname.startsWith("/dashboard")) {
                return token?.user?.role === "admin";
            }
        },
    },
});

export const config = { matcher: ["/dashboard/:path*"] };
