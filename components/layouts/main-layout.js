import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Head from "next/head";
const Navbar = dynamic(() => import("./navbar"));
const Footer = dynamic(() => import("./footer"));

import { useContext } from "react";
import ConfigContext from "../../contexts/config/config-context";
import { getAccessibleColor, getRGBColor } from "../../utils/color";

const Layout = ({ children }) => {
    const { configs } = useContext(ConfigContext);

    const bgImage = configs?.style?.background_image || "";
    const bgColor = configs?.style?.background_color || "#f0f0f0e6";

    const primaryColor = getRGBColor(configs?.style?.primary_color, "primary");
    const allyColor = getRGBColor(
        getAccessibleColor(configs?.style?.primary_color),
        "ally"
    );

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
                <style>:root {`{${primaryColor} ${allyColor}}`}</style>
            </Head>
            <div
                className="bg-no-repeat bg-center bg-cover bg-fixed text-gray-900"
                style={{
                    backgroundImage: `url(${bgImage})`,
                }}
            >
                <div
                    className={`min-h-screen flex flex-col`}
                    style={{ backgroundColor: bgColor }}
                >
                    <Navbar />
                    <motion.div
                        className="flex-grow"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Layout;
