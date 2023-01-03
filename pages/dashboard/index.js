import DashboardNavbar from "../../components/layouts/dashboard-navbar";
import Layout from "../../components/layouts/main-layout";

const Dashboard = () => {
    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-24 md:pt-28 mx-auto min-h-screen items-center">
                <DashboardNavbar />
                <section class="bg-white border-t border-b sm:border-l sm:border-r sm:rounded shadow mb-6">
                    <div class="flex items-center px-6 md:hidden">
                        <div class="flex-grow flex-no-shrink py-6">
                            <div class="text-grey-darker mb-2">
                                <span class="text-3xl align-bottom">฿</span>
                                <span class="text-5xl">1,404</span>
                                <span class="text-3xl align-bottom">
                                    {"1404.00".slice(
                                        "1,404.00".length -
                                            3 -
                                            "1,404.00".length
                                    )}
                                </span>
                            </div>
                            <div class="text-lg uppercase text-grey tracking-wide">
                                ยอดเติมเงินวันนี้
                            </div>
                        </div>
                    </div>
                    <div class="hidden md:flex">
                        <div class="w-1/2 text-center py-8">
                            <div class="border-r">
                                <div class="text-grey-darker mb-2">
                                    <span class="text-3xl align-bottom">฿</span>
                                    <span class="text-5xl">12,998</span>
                                    <span class="text-3xl align-bottom">
                                        {"1404.00".slice(
                                            "12,998.00".length -
                                                3 -
                                                "12,998.00".length
                                        )}
                                    </span>
                                </div>
                                <div class="text-lg uppercase text-grey tracking-wide">
                                    ยอดเติมเงินทั้งหมด
                                </div>
                            </div>
                        </div>
                        <div class="w-1/2 text-center py-8">
                            <div class="">
                                <div class="text-grey-darker mb-2">
                                    <span class="text-3xl align-bottom">฿</span>
                                    <span class="text-5xl">1,404</span>
                                    <span class="text-3xl align-bottom">
                                        {"1404.00".slice(
                                            "1,404.00".length -
                                                3 -
                                                "1,404.00".length
                                        )}
                                    </span>
                                </div>
                                <div class="text-lg uppercase text-grey tracking-wide">
                                    ยอดเติมเงินวันนี้
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
};

export default Dashboard;

export { getServerSideProps } from "../../utils/get-init-data";
