import Link from "next/link";

const DashboardNavbar = () => {
    return (
        <nav
            id="dashboard-nav"
            className="bg-white border sm:rounded shadow mb-6 px-6"
        >
            <div class="flex gap-x-8 divide-x">
                <Link
                    href={`/dashboard`}
                    class="appearance-none py-4 text-blue-dark border-b border-blue-dark"
                >
                    ภาพรวม
                </Link>
                <Link
                    href={`/dashboard/configs`}
                    class="appearance-none py-4 text-grey-dark border-b border-transparent hover:border-grey-dark"
                >
                    จัดการเว็บไซต์
                </Link>
                <Link
                    href={`/dashboard`}
                    class="appearance-none py-4 text-grey-dark border-b border-transparent hover:border-grey-dark"
                >
                    หมวดหมู่
                </Link>
                <Link
                    href={`/dashboard`}
                    class="appearance-none py-4 text-grey-dark border-b border-transparent hover:border-grey-dark"
                >
                    สินค้า
                </Link>
                <Link
                    href={`/dashboard`}
                    class="appearance-none py-4 text-grey-dark border-b border-transparent hover:border-grey-dark"
                >
                    ผู้ใช้งาน
                </Link>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
