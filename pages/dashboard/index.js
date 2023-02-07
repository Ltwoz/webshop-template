import { useEffect, useState } from "react";
import axios from "axios";

import DashboardNavbar from "../../components/layouts/dashboard-navbar";
import Layout from "../../components/layouts/main-layout";

import { FiUsers } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import { TbClipboardText, TbClipboardX } from "react-icons/tb";
import MiniStatCard from "../../components/ui/cards/mini-stat-card";
import Line from "../../components/charts/Line";
import BestSelling from "../../components/section/best-selling";

const Dashboard = () => {
    const [stats, setStats] = useState({});
    const [topupSum, setTopupSum] = useState({});

    // Charts Data.
    const [weekyData, setWeeklyData] = useState([]);

    useEffect(() => {
        const getAdminStats = async () => {
            const { data } = await axios.get(`/api/admin/stats`);
            setStats(data.stats);
        };

        const getAdminTopupStats = async () => {
            const { data } = await axios.get(`/api/admin/stats/topup-stats`);
            setTopupSum(data.stats);
            setWeeklyData(data.stats.weekSum)
        };

        getAdminStats().catch((err) => {
            console.log(err);
        });

        getAdminTopupStats().catch((err) => {
            console.log(err);
        });
    }, []);

    const weekData = {
        labels: ["1", "2", "3", "4", "5", "6", "7"],
        datasets: [
            {
                data: weekyData,
                lineTension: 0.4,
                radius: 3,
            },
        ],
    };

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const end = new Date(year, month + 1 ,0).getDate();

    let dayLabel = [];
    for (let i = 0; i < end; i++) {
        dayLabel.push(i + 1)
    }

    const monthData = {
        labels: dayLabel,
        datasets: [
            {
                data: [
                    150, 0, 230, 280, 520, 650, 890, 1230, 460, 150, 350, 640, 850, 345,
                    430, 720, 640, 950, 670, 840, 350, 160, 260, 640, 500, 345, 330, 250,
                ],
                lineTension: 0.4,
                radius: 3,
            },
        ],
    };

    const yearData = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                data: [0, 10, 0, 20],
                lineTension: 0.4,
                radius: 3,
            },
        ],
    };

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
                    className="bg-white border rounded-md shadow mb-4"
                >
                    <div className="flex flex-col md:flex-row px-8 divide-y md:divide-y-0">
                        <div className="md:w-1/2 text-center py-8">
                            <div className="md:border-r">
                                <div className="text-grey-darker mb-2">
                                    <span className="text-3xl align-bottom">
                                        ฿
                                    </span>
                                    <span className="text-5xl">
                                        {topupSum.todaySum?.toLocaleString()}
                                    </span>
                                    <span className="text-3xl align-bottom">
                                        {topupSum.todaySum
                                            ?.toFixed(2)
                                            .slice(-3)}
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
                                    <span className="text-5xl">
                                        {topupSum.alltimeSum?.toLocaleString()}
                                    </span>
                                    <span className="text-3xl align-bottom">
                                        {topupSum.alltimeSum
                                            ?.toFixed(2)
                                            .slice(-3)}
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
                    className="grid grid-cols-3 gap-4 mb-4"
                >
                    <MiniStatCard
                        title="หมวดหมู่ทั้งหมด"
                        value={stats?.categoryCount?.toLocaleString()}
                        icon={
                            <BiCategory className="text-[50px] lg:text-[48px]" />
                        }
                        color="purple"
                    />
                    <MiniStatCard
                        title="สินค้าทั้งหมด"
                        value={stats?.productCount?.toLocaleString()}
                        icon={
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
                                />
                            </svg>
                        }
                        color="blue"
                    />
                    <MiniStatCard
                        title="ผู้ใช้งานทั้งหมด"
                        value={stats?.userCount?.toLocaleString()}
                        icon={
                            <FiUsers className="text-[50px] lg:text-[48px]" />
                        }
                        color="emerald"
                    />
                </section>

                <section
                    id="stats-group-second"
                    className="grid grid-cols-3 gap-4 mb-4"
                >
                    <MiniStatCard
                        title="ออเดอร์ทั้งหมด"
                        value={stats?.orderCount?.toLocaleString()}
                        icon={<BsCart className="text-[50px] lg:text-[48px]" />}
                        color="purple"
                    />
                    <MiniStatCard
                        title="คิวทั้งหมด"
                        value={stats?.queueCount?.toLocaleString()}
                        icon={
                            <TbClipboardText className="text-[50px] lg:text-[48px]" />
                        }
                        color="blue"
                    />
                    <MiniStatCard
                        title="คิวที่ยังไม่เสร็จ"
                        value={stats?.pendingQueueCount?.toLocaleString()}
                        icon={
                            <TbClipboardX className="text-[50px] lg:text-[48px]" />
                        }
                        color="emerald"
                    />
                </section>

                {/* <section
                    id="stats-group-third"
                    className="grid grid-cols-2 gap-4 mb-4"
                >
                    <div className="col-span-2 md:col-span-1 flex flex-col justify-center p-6 bg-white rounded-md border shadow">
                        <h2 className="mb-1 text-lg">รายได้สัปดาห์นี้</h2>
                        <Line data={weekData} />
                    </div>
                    <div className="col-span-2 md:col-span-1 flex flex-col justify-around p-6 bg-white rounded-md border shadow">
                        <h2 className="mb-1 text-lg">รายได้เดือนนี้</h2>
                        <Line data={monthData} />
                    </div>
                </section> */}

                {/* <section
                    id="best-selling"
                    className="grid grid-cols-7 gap-4 mb-4"
                >
                    <div className="col-span-7 md:col-span-4 flex flex-col justify-center p-6 bg-white rounded-md border shadow">
                        <h2 className="mb-4 text-lg">สินค้าขายดี</h2>
                        <BestSelling products={stats} />
                    </div>
                    <div className="col-span-7 md:col-span-3 flex flex-col justify-around p-6 bg-white rounded-md border shadow">
                        <h2 className="mb-1">อันดับเติมเงิน</h2>
                        
                    </div>
                </section> */}
            </main>
        </Layout>
    );
};

export default Dashboard;

export { getServerSideProps } from "../../utils/get-init-data";
