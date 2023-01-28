import NextAuth from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import dbConnect from "../../../lib/db-connect";
import User from "../../../models/user";

dbConnect();

export const authOptions = {
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
            user && (token.user = user);
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    },
    debug: process.env.NODE_ENV === "development"
};

export default NextAuth(authOptions);
