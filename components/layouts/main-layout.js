import Head from "next/head";
import Footer from "./footer";
import Navbar from "./navbar";

import { IBM_Plex_Sans_Thai } from "@next/font/google";
import { useContext } from "react";
import ConfigContext from "../../contexts/config/config-context";

const ibm = IBM_Plex_Sans_Thai({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin", "thai"],
});

const Layout = ({ children }) => {
    const { configs, loading, error } = useContext(ConfigContext);

    return (
        <>
            {/* <style jsx global>{`
                html {
                    font-family: ${ibm.style.fontFamily};
                }
            `}</style> */}
            <Head>
                <title>{configs?.website_title || "Skitzer"}</title>
                <meta
                    name="description"
                    content={configs?.website_desc || "Skitzer"}
                />
                <meta
                    name="keywords"
                    content={configs?.website_name || "SKTZ"}
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="icon"
                    href={
                        configs?.website_icon ||
                        "https://media.discordapp.net/attachments/717327142978977834/1060896307235004467/favicon.png"
                    }
                />
            </Head>
            <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow">{children}</div>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
