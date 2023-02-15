import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const ProfileNavbar = () => {
    const router = useRouter();

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const { data } = await axios.get(`/api/auth/@me`);
            setUser(data.user);
            setLoading(false);
        };

        getUser().catch(() => {
            console.error;
            setLoading(false);
        });
    }, []);

    const Menus = [
        { name: "โปรไฟล์", href: `/profile` },
        { name: "ประวัติการเติมเงิน", href: `/history/topups` },
        { name: "ประวัติการสั่งซื้อ", href: `/history/orders` },
    ];

    return (
        <section className="bg-white border rounded-md shadow mb-4 md:mb-6 divide-y">
            <div className="p-6 flex items-center justify-between">
                <div className="w-full flex items-center justify-between rounded-md text-gray-700 transition-all">
                    <div className="flex flex-row items-center gap-6">
                        <div className="aspect-square w-20 h-20 relative overflow-hidden rounded-full">
                            <Image
                                alt="avatar"
                                src={
                                    user?.avatar ||
                                    "https://cdn.discordapp.com/attachments/717327142978977834/1074905721411469413/avatar.png"
                                }
                                draggable="false"
                                fill
                                className="select-none object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center">
                                <div className="text-xl md:text-3xl font-medium">
                                    {user?.username}
                                </div>
                                <span
                                    className={`text-xs font-medium ml-3 px-2.5 py-0.5 rounded-full
                                                        ${
                                                            user?.role ===
                                                            "admin"
                                                                ? "bg-amber-700 text-amber-200"
                                                                : user?.role ===
                                                                  "member"
                                                                ? "bg-blue-800 text-blue-200"
                                                                : ""
                                                        }`}
                                >
                                    {user.role}
                                </span>
                            </div>
                            <div className="text-base md:text-lg font-medium text-black/60">
                                {user?.email}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-col justify-center gap-2 h-[80px] px-6 border-l">
                        <div className="text-base font-medium">
                            แก้ไขเมื่อ{" "}
                            {new Date(user?.updatedAt).toLocaleString("th", {
                                dateStyle: "long",
                                hour12: false,
                            })}
                        </div>
                        <div className="text-base font-medium">
                            สร้างเมื่อ{" "}
                            {new Date(user?.createdAt).toLocaleString("th", {
                                dateStyle: "long",
                                hour12: false,
                            })}
                        </div>
                    </div>
                    <div className="hidden md:flex">
                        <Link
                            href={"/profile"}
                            className="inline-flex items-center bg-primary rounded-md transition-all overflow-hidden"
                        >
                            <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 md:mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                </svg>
                                <span className="hidden md:block">
                                    แก้ไขโปรไฟล์
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="py-4 px-4 md:py-0 md:px-6 flex flex-col md:flex-row w-full gap-1.5 md:gap-6 md:text-base font-medium bg-gray-100">
                {Menus?.map((menu, i) => {
                    const isActive = router.asPath === menu.href;
                    return (
                        <Link
                            href={menu.href}
                            scroll={false}
                            key={i}
                            className={`${
                                isActive
                                    && "md:delay-150 bg-primary/10 md:bg-transparent text-primary md:hover:text-primary md:border-b-2 md:border-primary rounded-lg md:rounded-none"
                            } transition-all hover:text-primary appearance-none p-2 md:py-4`}
                        >
                            {menu.name}
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default ProfileNavbar;
