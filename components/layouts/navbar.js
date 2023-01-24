import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import ConfigsContext from "../../contexts/config/config-context";
import UserContext from "../../contexts/user/user-context";
import { DashboardNavList } from "./dashboard-navbar";

const Navbar = () => {
    const { configs } = useContext(ConfigsContext);
    const { user, loading, error, success, logout } = useContext(UserContext);
    const router = useRouter();

    const [showMenu, setShowMenu] = useState(false);
    const [openNav, setOpenNav] = useState(false);
    const [openDashboardNav, setOpenDashboardNav] = useState(false);

    useEffect(() => {
        const menuHandler = () => setShowMenu(false);
        const navHandler = () => setOpenNav(false);

        window.addEventListener("click", menuHandler);
        window.addEventListener("click", navHandler);

        return () => {
            window.removeEventListener("click", menuHandler);
            window.removeEventListener("click", navHandler);
        };
    }, []);

    const handleMenuClick = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    const handleNavClick = (e) => {
        e.stopPropagation();
        setOpenNav(!openNav);
    };

    const handleDashboardNavClick = (e) => {
        e.stopPropagation();
        setOpenDashboardNav(!openDashboardNav);
    };

    const logoutHandler = (e) => {
        e.preventDefault();
        logout();
        router.replace("/");
    };

    const navList = (
        <div className="mt-2 md:mt-0 md:space-x-8 flex flex-col md:flex-row font-medium text-sm md:text-[17px] [&>*]:transition-all [&>*]:duration-200">
            <Link href={`/`} className="py-2 hover:text-primary">
                หน้าแรก
            </Link>
            <Link href={`/store`} className="py-2 hover:text-primary">
                สินค้า
            </Link>
            <Link href={`/topup`} className="py-2 hover:text-primary">
                เติมเงิน
            </Link>
            <Link href={`#`} target="_blank" className="py-2 hover:text-primary">
                ช่วยเหลือ
            </Link>
            {user.role === "admin" && (
                <div
                    className="flex items-center justify-between text-blue-700 md:hidden py-2 cursor-pointer"
                    onClick={handleDashboardNavClick}
                >
                    จัดการหลังบ้าน
                    <button className="inline-flex items-center">
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
                    </button>
                </div>
            )}
        </div>
    );

    const userAuthButton =
        Object.keys(user).length > 0 ? (
            <div className="relative md:flex text-left items-center">
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
                    className="absolute right-0 top-10 z-10 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
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
            <div className="block md:flex justify-between items-center max-w-[1150px] w-full border md:border-0 divide-y-2 divide-gray-300/80 md:divide-y-0 border-gray-300/50 rounded-lg md:rounded-none shadow-md md:shadow-none px-4 sm:px-6 py-3 md:py-0 mx-auto bg-gray-200/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none">
                <div
                    className={
                        "flex items-center w-full md:w-auto" +
                        (openNav ? " pb-4" : "")
                    }
                >
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
                            <div type="button" onClick={handleNavClick}>
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

                {openNav && (
                    <div id="mobile-nav" className="block md:hidden w-full">
                        {navList}
                        {user.role === "admin" && openDashboardNav && (
                            <div className="pl-6">
                                <DashboardNavList />
                            </div>
                        )}
                        {userAuthButton}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
