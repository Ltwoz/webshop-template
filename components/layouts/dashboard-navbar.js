import Link from "next/link";

const DashboardNavbar = () => {
    return (
        <nav
            id="dashboard-nav"
            className="bg-white border sm:rounded shadow mb-6 px-6"
        >
            <div class="flex gap-x-8">
                <Link
                    href={`/dashboard`}
                    class="appearance-none py-4 text-blue-dark border-b border-blue-dark"
                >
                    ภาพรวม
                </Link>
                <Link
                    href={`/dashboard/configs`}
                    class="appearance-none py-4 text-grey-dark"
                >
                    จัดการเว็บไซต์
                </Link>
                <Link
                    href={`/dashboard`}
                    class="appearance-none py-4 text-grey-dark"
                >
                    จัดการหมวดหมู่
                </Link>
                <Link
                    href={`/dashboard`}
                    class="appearance-none py-4 text-grey-dark"
                >
                    จัดการสินค้า
                </Link>
                <Link
                    href={`/dashboard`}
                    class="appearance-none py-4 text-grey-dark"
                >
                    จัดการคิว
                </Link>
                <Link
                    href={`/dashboard`}
                    class="appearance-none py-4 text-grey-dark"
                >
                    จัดการผู้ใช้
                </Link>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
