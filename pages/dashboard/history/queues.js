import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import DashboardNavbar from "../../../components/layouts/dashboard-navbar";
import Layout from "../../../components/layouts/main-layout";
import dynamic from "next/dynamic";
import LoadingSpiner from "../../../components/ui/loader/spiner";
import { useToast } from "../../../contexts/toast/toast-context";

const UpdateQueueModal = dynamic(() =>
    import("../../../components/ui/modals/update-queue-modal")
);

const AdminQueues = () => {
    // Modals State.
    const [isUpdateModal, setIsUpdateModal] = useState(false);

    // CRUD State.
    const [loading, setLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [error, setError] = useState(null);

    // Queues State.
    const [queues, setQueues] = useState([]);
    const [selectedQueue, setSelectedQueue] = useState({});

    const toast = useToast();

    useEffect(() => {
        const getAdminQueues = async () => {
            const { data } = await axios.get(`/api/admin/history/queues`);
            setQueues(data?.queues);
            setLoading(false);
        };

        getAdminQueues().catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    }, [isUpdated]);

    useEffect(() => {
        if (error) {
            toast.add({
                title: "ผิดพลาด!",
                text: error,
                icon: "error",
            });
            setError(null);
        }

        if (isUpdated) {
            toast.add({
                title: "สำเร็จ!",
                text: "แก้ไขคิวแล้ว",
                icon: "success",
            });
            setIsUpdated(false);
        }
    }, [error, isUpdated, toast]);

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
                        จัดการคิว
                    </h1>
                </section>
                <DashboardNavbar />
                {loading ? (
                    <LoadingSpiner />
                ) : (
                    <section className="bg-white border rounded-md shadow mb-6 divide-y">
                        <div className="p-6 flex items-center justify-between max-h-[88px]">
                            <h2 className="text-lg font-semibold">จัดการคิว</h2>
                            <input
                                type="text"
                                name="website-title"
                                id="website-title"
                                placeholder="ค้นหา"
                                autoComplete="off"
                                className="p-2 rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                            />
                        </div>
                        {queues.length < 1 ? (
                            <div className="flex items-center justify-center py-6">
                                <p className="font-medium text-gray-600">
                                    ไม่มีประวัติคิว
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col overflow-x-auto">
                                <table className="w-full table-fixed">
                                    <thead>
                                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                            <th className="py-3 px-6 text-left w-36">
                                                #
                                            </th>
                                            <th className="py-3 px-6 text-left w-44 md:w-48">
                                                ชื่อสินค้า
                                            </th>
                                            <th className="py-3 px-6 text-left w-44">
                                                ผู้ใช้
                                            </th>
                                            <th className="py-3 px-6 text-left w-44">
                                                สถานะ
                                            </th>
                                            <th className="py-3 px-6 text-left w-40">
                                                วันที่
                                            </th>
                                            <th className="py-3 px-6 text-center w-28">
                                                <span className="hidden">
                                                    Action
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-sm md:text-base">
                                        {queues?.map((queue, i) => (
                                            <tr
                                                key={i}
                                                className="border-b border-gray-200 hover:bg-gray-100"
                                            >
                                                <td className="py-3 px-6 text-left">
                                                    {queue._id}
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    {queue.product_name}
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    {queue.user?.username}
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    <span
                                                        className={
                                                            "text-sm font-medium px-2.5 py-0.5 rounded-full" +
                                                            (queue.status ===
                                                            "กำลังดำเนินการ"
                                                                ? " bg-orange-700 text-orange-200"
                                                                : queue.status ===
                                                                  "สำเร็จ"
                                                                ? " bg-green-700 text-green-200"
                                                                : queue.status ===
                                                                  "ไม่สำเร็จ"
                                                                ? " bg-red-700 text-red-200"
                                                                : queue.status ===
                                                                  "ยกเลิก"
                                                                ? " bg-red-700 text-red-200"
                                                                : "")
                                                        }
                                                    >
                                                        {queue.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    {new Date(
                                                        queue.createdAt
                                                    ).toLocaleString("en", {
                                                        dateStyle: "short",
                                                        timeStyle: "short",
                                                        hour12: false,
                                                    })}
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex item-center justify-end gap-x-2">
                                                        <div
                                                            onClick={() => {
                                                                setSelectedQueue(
                                                                    queue
                                                                );
                                                                setIsUpdateModal(
                                                                    (
                                                                        prevState
                                                                    ) =>
                                                                        !prevState
                                                                );
                                                            }}
                                                            className="transform hover:text-primary hover:border-primary hover:scale-110 transition-all border rounded-full p-2 md:cursor-pointer"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                className="w-5 h-5"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                )}
            </main>
        </Layout>
    );
};

export default AdminQueues;

export { getServerSideProps } from "../../../utils/get-init-data";
