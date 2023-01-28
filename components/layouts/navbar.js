import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import ConfigsContext from "../../contexts/config/config-context";
import { DashboardNavList } from "./dashboard-navbar";
import { useSession, signOut } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
    const { configs } = useContext(ConfigsContext);

    const router = useRouter();

    const { data: session, status } = useSession();
    const user = session?.user;

    const mobileNavRef = useRef();

    const [showMenu, setShowMenu] = useState(false);
    const [openNav, setOpenNav] = useState(false);
    const [openDashboardNav, setOpenDashboardNav] = useState(false);

    useEffect(() => {
        const menuHandler = () => setShowMenu(false);
        const navHandler = () => setOpenNav(false);
        const dashboardHandler = () => setOpenDashboardNav(false);

        window.addEventListener("click", menuHandler);
        window.addEventListener("click", navHandler);
        window.addEventListener("click", dashboardHandler);

        return () => {
            window.removeEventListener("click", menuHandler);
            window.removeEventListener("click", navHandler);
            window.removeEventListener("click", dashboardHandler);
        };
    }, []);

    const handleMenuClick = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
        setOpenDashboardNav(false);
    };

    const handleNavClick = (e) => {
        e.stopPropagation();
        setOpenNav(!openNav);
        setShowMenu(false);
        setOpenDashboardNav(false);
    };

    const handleDashboardNavClick = (e) => {
        e.stopPropagation();
        setOpenDashboardNav(!openDashboardNav);
        setShowMenu(false);
    };

    const logoutHandler = (e) => {
        e.preventDefault();
        signOut({
            redirect: false,
        });
        router.replace("/");
    };

    const navList = (
        <div className="md:space-x-8 flex flex-col md:flex-row font-medium text-sm md:text-[17px] [&>*]:transition-all [&>*]:duration-200">
            <Link href={`/`} className="py-2 hover:text-primary">
                หน้าแรก
            </Link>
            <Link href={`/store`} className="py-2 hover:text-primary">
                สินค้า
            </Link>
            <Link href={`/topup`} className="py-2 hover:text-primary">
                เติมเงิน
            </Link>
            <Link href={`/dashboard`} className="py-2 hover:text-primary">
                ช่วยเหลือ
            </Link>
            {user?.role === "admin" && (
                <div
                    className="flex items-center justify-between text-blue-700 md:hidden py-2"
                    onClick={handleDashboardNavClick}
                >
                    จัดการหลังบ้าน
                    <div className="inline-flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className={
                                "h-5 w-5 transition duration-200" +
                                (openDashboardNav ? " -rotate-180" : "")
                            }
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );

    const userAuthButton =
        status === "authenticated" ? (
            <div className="md:flex text-left items-center">
                <div className="flex items-center">
                    <button
                        type="button"
                        className="w-full hover:cursor-pointer justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        onClick={handleMenuClick}
                    >
                        <p>{user?.username}</p>
                    </button>
                </div>

                <div
                    className="absolute right-4 md:right-6 top-[18rem] md:top-10 z-[99] mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                    style={{ display: showMenu ? "" : "none" }}
                >
                    <div className="py-1">
                        <div
                            href="#"
                            className="text-gray-700 block px-4 py-2 text-sm"
                        >
                            {new Intl.NumberFormat("en-US", {
                                minimumFractionDigits: 2,
                            }).format(user?.point)}{" "}
                            บาท
                        </div>
                    </div>
                    {user?.role === "admin" && (
                        <div className="py-1">
                            <Link
                                href={`/dashboard`}
                                className="text-blue-700 block px-4 py-2 text-sm hover:bg-gray-100/50"
                            >
                                จัดการหลังบ้าน
                            </Link>
                        </div>
                    )}
                    <div className="py-1">
                        <Link
                            href={`/history/topup`}
                            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100/50"
                        >
                            ประวัติการเติมเงิน
                        </Link>
                        <Link
                            href={`/history/order`}
                            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100/50"
                        >
                            ประวัติการสั่งซื้อ
                        </Link>
                    </div>
                    <div className="py-1">
                        <button
                            onClick={logoutHandler}
                            className="text-red-600 w-full text-left px-4 py-2 text-sm hover:bg-gray-100/50"
                        >
                            ออกจากระบบ
                        </button>
                    </div>
                </div>
            </div>
        ) : status === "loading" ? (
            <div className="relative flex items-center">
                <div aria-label="Loading..." role="status">
                    <svg className="h-6 w-6 animate-spin" viewBox="3 3 18 18">
                        <path
                            className="fill-gray-200"
                            d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                        ></path>
                        <path
                            className="fill-gray-800"
                            d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
                        ></path>
                    </svg>
                </div>
            </div>
        ) : (
            <div className="space-x-4 md:flex md:ml-10 font-medium text-[17px]">
                <Link
                    href={`/auth/login`}
                    className="items-center px-4 py-2 rounded-md"
                >
                    เข้าสู่ระบบ
                </Link>
                <Link
                    href={`/auth/register`}
                    className="items-center px-4 py-2
                    rounded-md text-white bg-primary hover:bg-red-600"
                >
                    สร้างบัญชี
                </Link>
            </div>
        );

    return (
        <nav className="fixed top-0 px-2 md:px-0 py-2 md:py-5 w-full md:bg-gray-100/80 md:backdrop-blur-sm z-30">
            <div className="block md:flex relative justify-between items-center max-w-[1150px] w-full border md:border-0 border-gray-300/50 rounded-lg md:rounded-none shadow-md md:shadow-none px-4 sm:px-6 py-3 md:py-0 mx-auto bg-gray-200/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none">
                <div className="flex items-center w-full md:w-auto">
                    <div className="flex items-center justify-between w-full md:w-auto">
                        <Link
                            href={`/`}
                            className="flex md:w-auto justify-center items-center md:mr-8"
                        >
                            <div className="relative h-8 sm:h-10 w-16 sm:w-24">
                                <Image
                                    alt="logo_img"
                                    src={
                                        configs?.website_logo ||
                                        "https://media.discordapp.net/attachments/872102608909795449/944274854121701416/logo.png"
                                    }
                                    draggable="false"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </Link>
                        <div className="hidden md:block">{navList}</div>
                        <div className="flex items-center md:hidden">
                            <div onClick={handleNavClick}>
                                {openNav ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        className="h-6 w-6"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden md:block">{userAuthButton}</div>

                <AnimatePresence>
                    <motion.div
                        id="mobile-nav"
                        ref={mobileNavRef}
                        className="block md:hidden w-full overflow-hidden"
                        animate={openNav ? "mount" : "unmount"}
                        initial="unmount"
                        exit="unmount"
                        variants={{
                            unmount: {
                                height: 0,
                                opacity: 0,
                                visibility: "hidden",
                                borderTop: "0px solid",
                                marginTop: "0px",
                                paddingTop: "0px",
                                transition: { duration: 0.2 },
                            },
                            mount: {
                                height: `${
                                    openDashboardNav ? "450px" : "232px"
                                }`,
                                opacity: 1,
                                visibility: "visible",
                                borderTop: "2px solid rgba(209,213,219,0.8)",
                                marginTop: "16px",
                                paddingTop: "8px",
                                transition: { duration: 0.2 },
                            },
                        }}
                    >
                        {navList}
                        {user?.role === "admin" && (
                            <motion.div
                                className="pl-6"
                                animate={openDashboardNav ? "mount" : "unmount"}
                                initial="unmount"
                                exit="unmount"
                                variants={{
                                    unmount: {
                                        height: 0,
                                        opacity: 0,
                                        visibility: "hidden",
                                        transition: { duration: 0.2 },
                                    },
                                    mount: {
                                        height: `220px`,
                                        opacity: 1,
                                        visibility: "visible",
                                        transition: { duration: 0.2 },
                                    },
                                }}
                            >
                                <DashboardNavList />
                            </motion.div>
                        )}
                        {userAuthButton}
                    </motion.div>
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
