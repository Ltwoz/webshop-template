import Link from "next/link";

export const DashboardNavList = () => {
    return (
        <div className="flex flex-col md:flex-row md:gap-x-8 text-sm md:text-base font-medium">
            <Link
                href={`/dashboard`}
                className="appearance-none py-2 md:py-4 text-blue-dark"
            >
                ภาพรวม
            </Link>
            <Link
                href={`/dashboard/configs`}
                className="appearance-none py-2 md:py-4 text-grey-dark"
            >
                จัดการเว็บไซต์
            </Link>
            <Link
                href={`/dashboard/categories`}
                className="appearance-none py-2 md:py-4 text-grey-dark"
            >
                จัดการหมวดหมู่
            </Link>
            <Link
                href={`/dashboard/products`}
                className="appearance-none py-2 md:py-4 text-grey-dark"
            >
                จัดการสินค้า
            </Link>
            <Link
                href={`/dashboard`}
                className="appearance-none py-2 md:py-4 text-grey-dark"
            >
                จัดการคิว
            </Link>
            <Link
                href={`/dashboard/users`}
                className="appearance-none py-2 md:py-4 text-grey-dark"
            >
                จัดการผู้ใช้
            </Link>
            <Link
                href={`/dashboard`}
                className="appearance-none py-2 md:py-4 text-grey-dark"
            >
                ประวัติการเติมเงิน
            </Link>
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
