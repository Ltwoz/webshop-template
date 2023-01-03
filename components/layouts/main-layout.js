import Head from "next/head";
import Footer from "./footer";
import Navbar from "./navbar";

import { IBM_Plex_Sans_Thai } from "@next/font/google";
import { useContext } from "react";
import ConfigsContext from "../../contexts/configs-context";

const ibm = IBM_Plex_Sans_Thai({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin", "thai"],
});

const Layout = ({ children }) => {
    const configsCtx = useContext(ConfigsContext);

    return (
        <>
            <style jsx global>{`
                html {
                    font-family: ${ibm.style.fontFamily};
                }
            `}</style>
            <Head>
                <title>{configsCtx?.website_title || "SRVT"}</title>
                <meta name="description" content={configsCtx?.website_desc || "SRVT"} />
                <meta name="keywords" content={configsCtx?.website_name || "SRVT"} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-gray-50 text-gray-800 min-h-screen">
                <Navbar />
                {children}
                <Footer />
            </div>
        </>
    );
};

export default Layout;
