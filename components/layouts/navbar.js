import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import ConfigsContext from "../../contexts/config/config-context";
import UserContext from "../../contexts/user/user-context";

const Navbar = () => {
    const { configs } = useContext(ConfigsContext);
    const { user, loading, error, success, logout } = useContext(UserContext);
    const router = useRouter();

    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const handler = () => setShowMenu(false);

        window.addEventListener("click", handler);

        return () => {
            window.removeEventListener("click", handler);
        };
    }, []);

    const handleClick = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    const logoutHandler = (e) => {
        e.preventDefault();
        logout();
        router.replace("/")
    };

    return (
        <nav
            className="fixed top-0 py-5 w-full bg-gray-100/80
        backdrop-blur-md z-30"
        >
            <div
                className="max-w-[1150px] px-4 sm:px-6 mx-auto flex justify-between
            items-center"
            >
                <div className="flex items-center w-full md:w-auto">
                    <div className="flex items-center justify-between w-full md:w-auto">
                        <Link
                            href={`/`}
                            className="flex md:w-auto justify-center items-center"
                        >
                            <div className="relative h-8 sm:h-10 w-24">
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
                        <div className="flex items-center md:hidden">
                            <button type="button">
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="w-10 h-10"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="hidden space-x-8 md:flex md:ml-10 font-medium text-[17px]">
                        <Link href={`/`} className="py-2">
                            หน้าแรก
                        </Link>
                        <Link href={`/store`} className="py-2">
                            สินค้า
                        </Link>
                        <Link href={`/topup`} className="py-2">
                            เติมเงิน
                        </Link>
                        <Link href={`#`} target="_blank" className="py-2">
                            ช่วยเหลือ
                        </Link>
                    </div>
                </div>

                {Object.keys(user).length > 0 ? (
                    <div className="hidden relative md:flex text-left items-center">
                        <div className="flex items-center">
                            <button
                                type="button"
                                className="w-full hover:cursor-pointer justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                                onClick={handleClick}
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
                                    {user?.point.toFixed(2)} บาท
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
                    <div className="hidden space-x-4 md:flex md:ml-10 font-medium text-[17px]">
                        <Link
                            href={`/auth/login`}
                            className="items-center px-4 py-2 rounded-md"
                        >
                            เข้าสู่ระบบ
                        </Link>
                        <Link
                            href={`/`}
                            className="items-center px-4 py-2
                                rounded-md text-white bg-red-500 hover:bg-red-600"
                        >
                            สร้างบัญชี
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
