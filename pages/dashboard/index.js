import DashboardNavbar from "../../components/layouts/dashboard-navbar";
import Layout from "../../components/layouts/main-layout";
import { FiUsers } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import Link from "next/link";

const Dashboard = () => {
    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-20 md:pt-28 mx-auto items-center">
                <section
                    id="header"
                    className="md:hidden border-b-2 mx-8 py-4 mb-6"
                >
                    <h1 className="text-4xl font-semibold text-center">
                        ภาพรวม
                    </h1>
                </section>
                <DashboardNavbar />
                <section
                    id="topup-sum"
                    className="bg-white border rounded-md shadow mb-4 md:mb-6"
                >
                    <div className="flex flex-col md:flex-row px-8 divide-y md:divide-y-0">
                        <div className="md:w-1/2 text-center py-8">
                            <div className="md:border-r">
                                <div className="text-grey-darker mb-2">
                                    <span className="text-3xl align-bottom">
                                        ฿
                                    </span>
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
                                    <span className="text-3xl align-bottom">
                                        ฿
                                    </span>
                                    <span className="text-5xl">2,998</span>
                                    <span className="text-3xl align-bottom">
                                        {"2998.00".slice(
                                            "2,998.00".length -
                                                3 -
                                                "2,998.00".length
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

                <section
                    id="stats-group-first"
                    className="flex flex-col md:flex-row gap-y-4 md:gap-x-6 mb-4 md:mb-6"
                >
                    <Link
                        href="/dashboard/categories"
                        className="w-full md:w-1/3 flex flex-row justify-around p-6 bg-white rounded-md border shadow hover:shadow-xl"
                    >
                        <div className="my-auto">
                            <h4 className="text-lg md:text-base lg:text-lg text-grey tracking-wide mb-2">
                                หมวดหมู่ทั้งหมด
                            </h4>
                            <h1 className="text-3xl md:text-2xl lg:text-4xl font-medium">
                                3
                            </h1>
                        </div>
                        <div className="text-purple-600 my-auto bg-purple-500/20 rounded-full p-4">
                            <BiCategory className="text-[50px] lg:text-[48px]" />
                        </div>
                    </Link>
                    <Link
                        href="/dashboard/products"
                        className="w-full md:w-1/3 flex flex-row justify-around p-6 bg-white rounded-md border shadow hover:shadow-xl"
                    >
                        <div className="my-auto">
                            <h4 className="text-lg md:text-base lg:text-lg text-grey tracking-wide mb-2">
                                สินค้าทั้งหมด
                            </h4>
                            <h1 className="text-3xl md:text-2xl lg:text-4xl font-medium">
                                203
                            </h1>
                        </div>
                        <div className="text-blue-600 my-auto bg-blue-500/20 rounded-full p-4">
                            <svg
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="w-[50px] lg:w-[48px] h-[50px] lg:h-[48px]"
                            >
                                <path
                                    d="m19 1.73205081 7.8564065 4.53589838c1.8564064 1.07179677 3 3.05255889 3 5.19615241v9.0717968c0 2.1435935-1.1435936 4.1243556-3 5.1961524l-7.8564065 4.5358984c-1.8564065 1.0717968-4.1435935 1.0717968-6 0l-7.85640646-4.5358984c-1.85640646-1.0717968-3-3.0525589-3-5.1961524v-9.0717968c0-2.14359352 1.14359354-4.12435564 3-5.19615241l7.85640646-4.53589838c1.8564065-1.07179677 4.1435935-1.07179677 6 0zm-4.791172 1.6195783-.208828.11247251-7.85640646 4.53589838c-1.17246724.67692428-1.91843145 1.89771701-1.99370617 3.2394348l-.00629383.2246668v9.0717968c0 1.3538485.68425541 2.6102689 1.80857977 3.3463176l.19142023.117784 7.85640646 4.5358984c1.1688485.674835 2.5938608.7123258 3.791172.1124725l.208828-.1124725 7.8564065-4.5358984c1.1724672-.6769243 1.9184314-1.897717 1.9937061-3.2394348l.0062939-.2246668v-9.0717968c0-1.3538485-.6842555-2.61026887-1.8085798-3.34631759l-.1914202-.11778401-7.8564065-4.53589838c-1.1688485-.67483501-2.5938608-.71232584-3.791172-.11247251zm8.8114886 8.20574889c.259282.4876385.0741624 1.0931371-.4134761 1.3524191l-5.6183556 2.9868539.0000413 6.7689186c0 .5522848-.4477152 1-1 1-.5522847 0-1-.4477152-1-1l-.0000413-6.7689186-5.61827304-2.9868539c-.48763849-.259282-.67275801-.8647806-.41347603-1.3524191.25928199-.4876385.86478067-.672758 1.35241917-.4134761l5.6793299 3.0187491 5.6794125-3.0187491c.4876385-.2592819 1.0931372-.0741624 1.3524192.4134761z"
                                    fill="currentColor"
                                    fillRule="nonzero"
                                ></path>
                            </svg>
                        </div>
                    </Link>
                    <Link
                        href="/dashboard/users"
                        className="w-full md:w-1/3 flex flex-row justify-around p-6 bg-white rounded-md border shadow hover:shadow-xl"
                    >
                        <div className="my-auto">
                            <h4 className="text-lg md:text-base lg:text-lg text-grey tracking-wide mb-2">
                                ผู้ใช้งานทั้งหมด
                            </h4>
                            <h1 className="text-3xl md:text-2xl lg:text-4xl font-medium">
                                3
                            </h1>
                        </div>
                        <div className="text-emerald-600 text- my-auto bg-emerald-500/20 rounded-full p-4">
                            <FiUsers className="text-[50px] lg:text-[48px]" />
                        </div>
                    </Link>
                </section>
            </main>
        </Layout>
    );
};

export default Dashboard;

export { getServerSideProps } from "../../utils/get-init-data";
