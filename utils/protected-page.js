import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Layout from "../components/layouts/main-layout";

function Protected({ children }) {
    const { data: session, status } = useSession();
    const isUser = !!session?.user;
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return; // Do nothing while loading
        if (!isUser) router.replace("/auth/login"); // If not authenticated, force log in
    }, [isUser, router, status]);

    if (isUser) {
        return children;
    }

    // Session is being fetched, or no user.
    // If no user, useEffect() will redirect.
    return (
        <Layout>
            <main className="max-w-[1150px] sm:px-[17px] pb-4 sm:pb-[25px] pt-20 md:pt-28 mx-auto items-center">
                
            </main>
        </Layout>
    );
}

export default Protected;
