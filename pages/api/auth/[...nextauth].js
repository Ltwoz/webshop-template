import NextAuth from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import dbConnect from "../../../lib/db-connect";
import User from "../../../models/user";

dbConnect();

export const authOptions = (req) => {
    return {
        providers: [
            CredentialsProviders({
                name: "Credentials",
                async authorize(credentials, req) {
                    try {
                        // find user in database and return it
                        const { username, password } = credentials;

                        if (!username || !password) {
                            throw new Error("Invalid.");
                        }

                        const user = await User.findOne({ username }).select(
                            "+password"
                        );

                        if (!user) {
                            throw new Error(
                                "No user with a matching email was found."
                            );
                        }

                        const isPasswordMatched = await user.comparePassword(
                            password
                        );

                        if (!isPasswordMatched) {
                            throw new Error("Your password is invalid");
                        }

                        return {
                            id: user._id,
                            username: user.username,
                            email: user.email,
                            role: user.role,
                            point: user.point,
                        };
                    } catch (error) {
                        throw new Error(
                            "Next Auth - Authorize: Authentication error"
                        );
                    }
                },
            }),
        ],
        session: {
            strategy: "jwt",
        },
        secret: process.env.NEXTAUTH_SECRET,
        pages: {
            signIn: "/auth/login",
        },
        callbacks: {
            async jwt({ token, user }) {
                console.log("req.url, ", req.url);
                if (
                    req.url.toString().replace(/=$|=(?=&)/g, "") ===
                    "/api/auth/session?update"
                ) {
                    const user = await User.findById(token.user.id);

                    if (!user) {
                        return;
                    }

                    token.user = {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        point: user.point,
                    };

                    console.log("token user, ", token.user);
                } else {
                    user && (token.user = user);
                    console.log("token user not update, ", token.user);
                }
                return Promise.resolve(token);
            },
            async session({ session, token }) {
                session.user = token.user;
                return Promise.resolve(session);
            },
        },
        debug: process.env.NODE_ENV === "development",
    };
};

export default async function auth(req, res) {
    return NextAuth(req, res, authOptions(req));
}
