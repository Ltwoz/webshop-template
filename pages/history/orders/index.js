import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Layout from "../../../components/layouts/main-layout";
import ProfileNavbar from "../../../components/layouts/profile-navbar";
import HistoryOrdersTab from "../../../components/tabs/history-orders";
import HistoryQueuesTab from "../../../components/tabs/history-queues";

const HistoryOrders = () => {
    const [activeTab, setActiveTab] = useState("orders");

    const handleTab = (e, tab) => {
        e.preventDefault();
        setActiveTab(tab);
    };

    const tabHeader = [
        { label: "ประเภทสต็อก", value: "orders" },
        { label: "ประเภทคิว", value: "queues" },
    ];

    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-24 md:pt-28 mx-auto items-center">
                <ProfileNavbar />
                <div className="flex justify-end items-center mb-2 gap-2">
                    {tabHeader.map((tab, i) => (
                        <div
                            key={i}
                            onClick={(e) => handleTab(e, tab.value)}
                            className={`flex items-center py-1 px-2 rounded-md hover:bg-primary hover:text-ally hover:cursor-pointer ${
                                activeTab === tab.value &&
                                `bg-primary text-ally`
                            }`}
                        >
                            {tab.label}
                        </div>
                    ))}
                </div>
                <AnimatePresence mode="wait" initial="false">
                    {activeTab === "orders" && (
                        <HistoryOrdersTab key="orders" />
                    )}
                    {activeTab === "queues" && (
                        <HistoryQueuesTab key="queues" />
                    )}
                </AnimatePresence>
            </main>
        </Layout>
    );
};

export default HistoryOrders;

HistoryOrders.auth = true;

export { getServerSideProps } from "../../../utils/get-init-data";
