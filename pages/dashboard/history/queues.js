import { useContext, useEffect } from "react";
import Select from "react-select";
import DashboardNavbar from "../../../components/layouts/dashboard-navbar";
import Layout from "../../../components/layouts/main-layout";
import HistoryContext from "../../../contexts/history/history-context";
import UserContext from "../../../contexts/user/user-context";
import { colourStyles } from "../../../styles/select-style";

const statusOptions = [
    { value: "กำลังดำเนินการ", label: "กำลังดำเนินการ" },
    { value: "สำเร็จ", label: "สำเร็จ" },
    { value: "ไม่สำเร็จ", label: "ไม่สำเร็จ" },
    { value: "ยกเลิก", label: "ยกเลิก" },
];

const AdminQueues = () => {
    const { user } = useContext(UserContext);
    const {
        getAdminQueues,
        queue: { queues },
    } = useContext(HistoryContext);

    useEffect(() => {
        getAdminQueues();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout>
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
                <section className="bg-white border rounded-md shadow mb-6 divide-y">
                    <div className="p-6 flex items-center justify-between max-h-[88px]">
                        <h2 className="text-lg font-semibold">ประเภท Queue</h2>
                        <Select
                            options={statusOptions}
                            styles={colourStyles}
                            placeholder="สถานะ"
                            className="w-44"
                        />
                        <input
                            type="text"
                            name="website-title"
                            id="website-title"
                            placeholder="ค้นหา"
                            autoComplete="off"
                            className="p-2 rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                        />
                    </div>
                    <div className="flex flex-col overflow-x-scroll">
                        <table className="w-full table-fixed">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                    <th className="py-3 px-6 text-left w-40">
                                        #
                                    </th>
                                    <th className="py-3 px-6 text-left w-44 md:w-64">
                                        ชื่อสินค้า
                                    </th>
                                    <th className="py-3 px-6 text-left w-32">
                                        ราคา
                                    </th>
                                    <th className="py-3 px-6 text-left w-44">
                                        สถานะ
                                    </th>
                                    <th className="py-3 px-6 text-left w-40">
                                        หมายเหตุ
                                    </th>
                                    <th className="py-3 px-6 text-left w-52">
                                        วันที่
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
                                            {queue.price} บาท
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <span
                                                className={
                                                    "text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full" +
                                                    (queue.status ===
                                                    "กำลังดำเนินการ"
                                                        ? " bg-orange-900 text-orange-300"
                                                        : queue.status ===
                                                          "สำเร็จ"
                                                        ? " bg-green-900 text-green-300"
                                                        : queue.status ===
                                                          "ไม่สำเร็จ"
                                                        ? " bg-red-900 text-red-300"
                                                        : queue.status ===
                                                          "ยกเลิก"
                                                        ? " bg-red-900 text-red-300"
                                                        : "")
                                                }
                                            >
                                                {queue.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {queue.note ? queue.note : "-"}
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </Layout>
    );
};

export default AdminQueues;

export { getServerSideProps } from "../../../utils/get-init-data";
