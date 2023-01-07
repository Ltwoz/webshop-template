import DashboardNavbar from "../../components/layouts/dashboard-navbar";
import Layout from "../../components/layouts/main-layout";

const Dashboard = () => {
    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-24 md:pt-28 mx-auto min-h-screen items-center">
                <DashboardNavbar />
                <section className="bg-white border rounded-md shadow mb-6">
                    <div className="flex flex-col md:flex-row px-8 divide-y md:divide-y-0">
                        <div className="md:w-1/2 text-center py-8">
                            <div className="md:border-r">
                                <div className="text-grey-darker mb-2">
                                    <span className="text-3xl align-bottom">฿</span>
                                    <span className="text-5xl">1,404</span>
                                    <span className="text-3xl align-bottom">
                                        {"1404.00".slice(
                                            "1,404.00".length -
                                                3 -
                                                "1,404.00".length
                                        )}
                                    </span>
                                </div>
                                <div className="text-lg text-grey tracking-wide">
                                    ยอดเติมเงินวันนี้
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2 text-center py-8">
                            <div className="">
                                <div className="text-grey-darker mb-2">
                                    <span className="text-3xl align-bottom">฿</span>
                                    <span className="text-5xl">12,998</span>
                                    <span className="text-3xl align-bottom">
                                        {"1404.00".slice(
                                            "12,998.00".length -
                                                3 -
                                                "12,998.00".length
                                        )}
                                    </span>
                                </div>
                                <div className="text-lg text-grey tracking-wide">
                                    ยอดเติมเงินทั้งหมด
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-white border rounded-md shadow mb-6">
                    Add Later
                </section>
            </main>
        </Layout>
    );
};

export default Dashboard;

export { getServerSideProps } from "../../utils/get-init-data";
