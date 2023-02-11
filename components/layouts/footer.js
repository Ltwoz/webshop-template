import Link from "next/link";
import { FaDiscord, FaFacebookF } from "react-icons/fa";
import { BsQuestionLg } from "react-icons/bs";
import { useContext } from "react";
import ConfigContext from "../../contexts/config/config-context";

const Footer = () => {
    const { configs } = useContext(ConfigContext);

    return (
        <footer className="py-3 w-full border-t backdrop-blur-sm z-50 bg-gray-100/80">
            <div className="max-w-[1150px] px-4 sm:px-6 mx-auto gap-y-2 flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm md:text-base text-black/60">
                    © 2023 Skitzer, Develop by{" "}
                    <a
                        href="https://www.facebook.com/skitzer.xyz"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-primary"
                    >
                        Ltwoz
                    </a>
                    .
                </div>
                <div className="flex justify-center items-center gap-x-2">
                    <div className="flex justify-center items-center gap-x-4 pr-4 mr-2 border-r border-gray-400/80">
                        <Link
                            href={"/terms"}
                            className="text-sm md:text-base text-black/60 transition-all hover:text-primary"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href={"/policy"}
                            className="text-sm md:text-base text-black/60 transition-all hover:text-primary"
                        >
                            Policy
                        </Link>
                    </div>
                    {configs.social?.discord_url && (
                        <Link
                            href={configs.social?.discord_url}
                            target="_blank"
                            name="discord"
                            className="inline-block p-2 font-medium text-sm md:text-base leading-tight rounded-full border border-gray-400/80 
                        transition duration-150 ease-in-out 
                        hover:bg-primary hover:bg-opacity-10 hover:border-primary"
                        >
                            <FaDiscord />
                        </Link>
                    )}
                    {configs.social?.facebook_url && (
                        <Link
                            href={configs.social?.facebook_url}
                            target="_blank"
                            name="facebook"
                            className="inline-block p-2 font-medium text-sm md:text-base leading-tight rounded-full border border-gray-400/80 
                        transition duration-150 ease-in-out 
                        hover:bg-primary hover:bg-opacity-10 hover:border-primary"
                        >
                            <FaFacebookF />
                        </Link>
                    )}
                    <Link
                        href={"/"}
                        name="support"
                        className="inline-block p-2 font-medium text-sm md:text-base leading-tight rounded-full border border-gray-400/80 
                        transition duration-150 ease-in-out 
                        hover:bg-primary hover:bg-opacity-10 hover:border-primary"
                    >
                        <BsQuestionLg />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
