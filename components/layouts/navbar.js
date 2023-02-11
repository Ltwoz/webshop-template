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
        <div className="md:space-x-8 flex flex-col md:flex-row font-medium text-sm md:text-base [&>*]:transition-all [&>*]:duration-200">
            <Link scroll={false} href={`/`} className="py-2 hover:text-primary">
                หน้าแรก
            </Link>
            <Link
                scroll={false}
                href={`/store`}
                className="py-2 hover:text-primary"
            >
                สินค้า
            </Link>
            <Link
                scroll={false}
                href={`/topup`}
                className="py-2 hover:text-primary"
            >
                เติมเงิน
            </Link>
            <Link scroll={false} href={`/`} className="py-2 hover:text-primary">
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
                <div className="flex items-center px-[1px]">
                    <div
                        className="w-full hover:cursor-pointer flex justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-gray-700 ring-1 ring-gray-300 shadow-sm hover:bg-gray-50"
                        onClick={handleMenuClick}
                    >
                        <p>{user?.username}</p>
                    </div>
                </div>

                <div
                    className={`absolute right-4 md:right-6 ${
                        user?.role === "admin"
                            ? `top-[18.7rem]`
                            : `top-[16.4rem]`
                    } md:top-10 z-[99] mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
                    style={{ display: showMenu ? "" : "none" }}
                >
                    <div className="py-1">
                        <div className="text-gray-700 block px-4 py-2 text-sm">
                            {new Intl.NumberFormat("en-US", {
                                minimumFractionDigits: 2,
                            }).format(user?.point)}{" "}
                            บาท
                        </div>
                    </div>
                    {user?.role === "admin" && (
                        <div className="py-1">
                            <Link
                                scroll={false}
                                href={`/dashboard`}
                                className="text-blue-700 block px-4 py-2 text-sm hover:bg-gray-100/50"
                            >
                                จัดการหลังบ้าน
                            </Link>
                        </div>
                    )}
                    <div className="py-1">
                        <Link
                            scroll={false}
                            href={`/history/topups`}
                            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100/50"
                        >
                            ประวัติการเติมเงิน
                        </Link>
                        <Link
                            scroll={false}
                            href={`/history/orders`}
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
                <div className="w-6 h-6 border-[3px] border-gray-300/80 border-t-[3px] border-t-gray-800/80 rounded-[50%] animate-spin"></div>
            </div>
        ) : (
            <div className="gap-x-4 flex justify-center font-medium text-base px-[1px]">
                <Link
                    scroll={false}
                    href={`/auth/login`}
                    className="w-full md:w-fit inline-flex items-center rounded-lg transition-all overflow-hidden ring-1 ring-primary "
                >
                    <div className="w-full h-full inline-flex items-center justify-center font-medium hover:backdrop-brightness-95 py-2 px-4 hover:bg-primary hover:bg-opacity-10">
                        <span className="block tracking-wide">เข้าสู่ระบบ</span>
                    </div>
                </Link>
                <Link
                    scroll={false}
                    href={`/auth/register`}
                    className="w-full md:w-fit inline-flex items-center bg-primary rounded-lg transition-all overflow-hidden"
                >
                    <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                        <span className="block tracking-wide">สร้างบัญชี</span>
                    </div>
                </Link>
            </div>
        );

    return (
        <nav className="fixed top-0 px-2 md:px-0 py-2 md:py-4 w-full md:bg-gray-100/80 md:backdrop-blur-sm z-30">
            <div className="block md:flex relative justify-between items-center max-w-[1150px] w-full border md:border-0 border-gray-300/50 rounded-lg md:rounded-none shadow-md md:shadow-none px-4 sm:px-6 py-3 md:py-0 mx-auto bg-gray-200/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none">
                <div className="flex items-center w-full md:w-auto">
                    <div className="flex items-center justify-between w-full md:w-auto gap-8">
                        {(configs?.website_title || configs?.website_logo) && (
                            <Link
                                scroll={false}
                                href={`/`}
                                className="flex md:w-auto justify-center items-center"
                            >
                                {configs?.website_logo ? (
                                    <div className="relative h-8 sm:h-10 w-16 sm:w-24">
                                        <Image
                                            alt="logo_img"
                                            src={configs?.website_logo}
                                            draggable="false"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div className="font-semibold text-xl hover:text-primary transition-all">
                                        {configs?.website_title}
                                    </div>
                                )}
                            </Link>
                        )}
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
                                    openDashboardNav
                                        ? `514px`
                                        : status === "unauthenticated"
                                        ? `210px`
                                        : user?.role !== "admin"
                                        ? `204px`
                                        : `240px`
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
                                        height: `274px`,
                                        opacity: 1,
                                        visibility: "visible",
                                        transition: { duration: 0.2 },
                                    },
                                }}
                            >
                                <DashboardNavList />
                            </motion.div>
                        )}
                        <div className="mt-2">{userAuthButton}</div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
