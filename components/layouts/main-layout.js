import Head from "next/head";
import Footer from "./footer";
import Navbar from "./navbar";

import { useContext } from "react";
import ConfigContext from "../../contexts/config/config-context";

const Layout = ({ children }) => {
    const { configs, loading, error } = useContext(ConfigContext);

    const bgImage =
        "https://cdnb.artstation.com/p/assets/images/images/028/704/049/large/roroto-sic-panda-chapeaute-miror.jpg?1595265084";

    return (
        <>
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
            <div
                className="bg-no-repeat bg-center bg-cover bg-fixed text-gray-800"
                style={{
                    backgroundImage: `url(${bgImage})`,
                }}
            >
                <div className="min-h-screen flex flex-col bg-[rgba(240,240,240,0.9)]">
                    <Navbar />
                    <div className="flex-grow">{children}</div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Layout;
