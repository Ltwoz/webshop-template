import Link from "next/link";
import { useRouter } from "next/router";

export const DashboardNavList = () => {
    const Menus = [
        { name: "ภาพรวม", href: `/dashboard` },
        { name: "จัดการเว็บไซต์", href: `/dashboard/configs` },
        { name: "จัดการสินค้า", href: `/dashboard/categories` },
        { name: "จัดการคิว", href: `/dashboard/history/queues` },
        { name: "จัดการคูปอง", href: `/dashboard/coupon` },
        { name: "จัดการผู้ใช้", href: `/dashboard/users` },
        { name: "ประวัติการเติมเงิน", href: `/dashboard/history/topups` },
        { name: "ประวัติการสั่งซื้อ", href: `/dashboard/history/orders` },
    ];

    const router = useRouter();

    return (
        <div className="flex flex-col md:flex-row md:w-full md:justify-between md:gap-x-8 text-sm md:text-base font-medium">
            {Menus?.map((menu, i) => {
                const isActive = router.asPath === menu.href;
                return (
                    <Link
                        href={menu.href}
                        scroll={false}
                        key={i}
                        className={`${
                            isActive ? "md:delay-150 text-primary md:hover:text-primary md:border-b-2 md:border-primary" : ""
                        } transition-all hover:text-primary appearance-none pt-2 md:pt-4 pb-[6px] md:pb-[14px]`}
                    >
                        {menu.name}
                    </Link>
                );
            })}
        </div>
    );
};

const DashboardNavbar = () => {
    return (
        <nav
            id="dashboard-nav"
            className="hidden md:flex bg-white border sm:rounded-md shadow mb-6 px-6"
        >
            <DashboardNavList />
        </nav>
    );
};

export default DashboardNavbar;
