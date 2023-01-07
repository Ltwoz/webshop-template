import DashboardNavbar from "../../../components/layouts/dashboard-navbar";
import Layout from "../../../components/layouts/main-layout";

const AdminCategories = () => {
    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-24 md:pt-28 mx-auto min-h-screen items-center">
                <DashboardNavbar />
                <section className="bg-white border rounded-md shadow mb-6 divide-y">
                    <div className="p-6 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">
                            จัดการหมวดหมู่
                        </h2>
                        <button
                            type="button"
                            className="inline-flex items-center font-medium text-white bg-primary hover:bg-primary py-2 px-4 rounded-md"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="w-5 h-5 mr-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            สร้างหมวดหมู่ใหม่
                        </button>
                    </div>
                    <div className="p-6 flex items-center justify-between">
                        <div>
                            <h3>Blox fruit</h3>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
};

export default AdminCategories;

export { getServerSideProps } from "../../../utils/get-init-data";
