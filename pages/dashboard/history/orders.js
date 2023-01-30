import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import DashboardNavbar from "../../../components/layouts/dashboard-navbar";
import Layout from "../../../components/layouts/main-layout";
import dynamic from "next/dynamic";
import ThreeDotsLoader from "../../../components/ui/loader/threedots";

const UpdateQueueModal = dynamic(() =>
    import("../../../components/ui/modals/update-queue-modal")
);

const AdminOrders = () => {
    // Modals State.
    const [isUpdateModal, setIsUpdateModal] = useState(false);

    // CRUD State.
    const [loading, setLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [error, setError] = useState(null);

    // Orders State.
    const [orders, setOrders] = useState([]);
    const [selectedQueue, setSelectedQueue] = useState({});

    useEffect(() => {
        const getAdminOrders = async () => {
            setLoading(true);
            const { data } = await axios.get(`/api/admin/history/orders`);
            setOrders(data?.orders);
        };

        getAdminOrders().catch(console.error);
        setLoading(false);
        setIsUpdated(false);
    }, [isUpdated]);

    useEffect(() => {
        setError(null);
        // TODO #3 add error toast.
    }, [error]);

    return (
        <Layout>
            <AnimatePresence>
                {isUpdateModal && (
                    <UpdateQueueModal
                        queue={selectedQueue}
                        setIsOpen={setIsUpdateModal}
                        setIsUpdated={setIsUpdated}
                        setError={setError}
                    />
                )}
            </AnimatePresence>

            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-20 md:pt-28 mx-auto items-center">
                <section
                    id="header"
                    className="md:hidden border-b-2 mx-8 py-4 mb-6"
                >
                    <h1 className="text-4xl font-semibold text-center">
                        ประวัติการสั่งซื้อ
                    </h1>
                </section>
                <DashboardNavbar />
                {loading ? (
                    <ThreeDotsLoader />
                ) : (
                    <section className="bg-white border rounded-md shadow mb-6 divide-y">
                        <div className="p-6 flex items-center justify-between max-h-[88px]">
                            <h2 className="text-lg font-semibold">
                                ประวัติการสั่งซื้อ
                            </h2>
                            <input
                                type="text"
                                name="website-title"
                                id="website-title"
                                placeholder="ค้นหา"
                                autoComplete="off"
                                className="p-2 rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                            />
                        </div>
                        <div className="flex flex-col overflow-x-auto">
                            <table className="w-full table-fixed">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                        <th className="py-3 px-6 text-left w-36">
                                            #
                                        </th>
                                        <th className="py-3 px-6 text-left w-44 md:w-56">
                                            ชื่อสินค้า
                                        </th>
                                        <th className="py-3 px-6 text-left w-36">
                                            ผู้ใช้
                                        </th>
                                        <th className="py-3 px-6 text-left w-44">
                                            ข้อมูล
                                        </th>
                                        <th className="py-3 px-6 text-left w-40">
                                            วันที่
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm md:text-base">
                                    {orders?.map((order, i) => (
                                        <tr
                                            key={i}
                                            className="border-b border-gray-200 hover:bg-gray-100"
                                        >
                                            <td className="py-3 px-6 text-left">
                                                {order._id}
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {order.product_name}
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {order.user?.username}
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {order.stock_data}
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleString("en", {
                                                    dateStyle: "short",
                                                    timeStyle: "short",
                                                    hour12: false,
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}
            </main>
        </Layout>
    );
};

export default AdminOrders;

export { getServerSideProps } from "../../../utils/get-init-data";