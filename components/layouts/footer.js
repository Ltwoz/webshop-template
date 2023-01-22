import Link from "next/link";
import { FaDiscord, FaFacebookF } from "react-icons/fa";
import { BsQuestionLg } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className="py-3 w-full border-t backdrop-blur-sm z-50 bg-gray-100/80">
            <div className="max-w-[1150px] px-4 sm:px-6 mx-auto gap-y-4 flex flex-col md:flex-row justify-between items-center">
                <div className="text-base text-black/60">
                    © 2023 Skitzer, Develop by Ltwoz.
                </div>
                <div className="flex justify-center items-center gap-x-2">
                    <div className="flex justify-center items-center pr-4 mr-2 border-r border-gray-400/80">
                        <Link
                            href={"#"}
                            className="text-sm transition-all hover:text-black hover:scale-110"
                        >
                            เงื่อนไขการใช้งาน
                        </Link>
                    </div>
                    <Link
                        href={"https://discord.com/"}
                        target="_blank"
                        className="inline-block p-2 font-medium text-lg leading-tight rounded-full border border-gray-400/80 transition duration-150 ease-in-out hover:bg-gray-200/80 hover:scale-110"
                    >
                        <FaDiscord />
                    </Link>
                    <Link
                        href={"https://facebook.com/"}
                        target="_blank"
                        className="inline-block p-2 font-medium text-lg leading-tight rounded-full border border-gray-400/80 transition duration-150 ease-in-out hover:bg-gray-200/80 hover:scale-110"
                    >
                        <FaFacebookF />
                    </Link>
                    <Link
                        href={"#"}
                        className="inline-block p-2 font-medium text-lg leading-tight rounded-full border border-gray-400/80 transition duration-150 ease-in-out hover:bg-gray-200/80 hover:scale-110"
                    >
                        <BsQuestionLg />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
