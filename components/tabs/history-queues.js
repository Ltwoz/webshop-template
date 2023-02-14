import LoadingSpiner from "../ui/loader/spiner";
import TablePagination from "../ui/paginations/table-pagination";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Select from "../ui/select/select";
import { motion } from "framer-motion";

const HistoryQueuesTab = () => {
    const list = [
        { label: "ทั้งหมด", value: "" },
        { label: "กำลังดำเนินการ", value: "pending" },
        { label: "สำเร็จ", value: "success" },
        { label: "ไม่สำเร็จ", value: "failed" },
        { label: "ยกเลิก", value: "cancel" },
    ];

    const { data: session } = useSession();
    const user = session?.user;

    // CRUD State.
    const [loading, setLoading] = useState(true);

    // Queues State.
    const [queues, setQueues] = useState({});

    // Search State.
    const [status, setStatus] = useState(list[0]);
    const [search, setSearch] = useState("");
    const [debounceValue, setDebounceValue] = useState("");

    // Pagination State.
    const [page, setPage] = useState(1);

    // Debounce
    useEffect(() => {
        const debounce = setTimeout(() => {
            setSearch(debounceValue);
        }, 500);

        return () => clearTimeout(debounce);
    }, [debounceValue]);

    useEffect(() => {
        const getQueues = async () => {
            let link = `/api/history/queues?user=${user?.id}&id=${
                search ? search : ""
            }&page=${page}`;

            if (status.value) {
                link = `/api/history/queues?user=${user?.id}&id=${
                    search ? search : ""
                }&page=${page}&status=${status.value}`;
            }

            const { data } = await axios.get(link);
            setQueues(data);
            setLoading(false);
        };

        getQueues().catch(() => {
            console.error;
            setLoading(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, search, status]);

    return (
        <>
            {loading ? (
                <LoadingSpiner />
            ) : (
                <>
                    <motion.section
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white border rounded-md shadow mb-6 divide-y"
                    >
                        <div className="p-6 flex items-center justify-between max-h-[88px]">
                            <h2 className="hidden md:block text-lg font-semibold">
                                ประเภทคิว
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <Select
                                    placeholder="เลือกสถานะ"
                                    options={list}
                                    selected={status}
                                    setSelected={setStatus}
                                />
                                <div className="relative w-full md:w-fit">
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg
                                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="ค้นหาไอดีคิว"
                                        autoComplete="off"
                                        value={debounceValue}
                                        onChange={(e) =>
                                            setDebounceValue(e.target.value)
                                        }
                                        className="pl-10 p-2 w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                                    />
                                </div>
                            </div>
                        </div>
                        {queues.queues?.length < 1 ? (
                            <div className="flex items-center justify-center py-6">
                                <p className="font-medium text-gray-600">
                                    ไม่มีข้อมูลคิว
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col overflow-x-auto">
                                    <table className="w-full table-fixed">
                                        <thead>
                                            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                                <th className="py-3 px-6 text-left w-40">
                                                    #
                                                </th>
                                                <th className="py-3 px-6 text-left w-44 md:w-48">
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
                                            {queues.queues?.map((queue, i) => (
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
                                                                "pending"
                                                                    ? " bg-orange-700 text-orange-200"
                                                                    : queue.status ===
                                                                      "success"
                                                                    ? " bg-green-700 text-green-200"
                                                                    : queue.status ===
                                                                      "failed"
                                                                    ? " bg-red-700 text-red-200"
                                                                    : queue.status ===
                                                                      "cancel"
                                                                    ? " bg-red-700 text-red-200"
                                                                    : "")
                                                            }
                                                        >
                                                            {queue.status ===
                                                            "pending"
                                                                ? "กำลังดำเนินการ"
                                                                : queue.status ===
                                                                  "success"
                                                                ? "สำเร็จ"
                                                                : queue.status ===
                                                                  "failed"
                                                                ? "ไม่สำเร็จ"
                                                                : queue.status ===
                                                                  "cancel"
                                                                ? "ยกเลิก"
                                                                : ""}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        {queue.note
                                                            ? queue.note
                                                            : "-"}
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
                                {!(page === 0 || queues.totalPageCount < 2) && (
                                    <div
                                        id="pagination"
                                        className="flex px-6 py-3 items-center justify-center md:justify-end"
                                    >
                                        <TablePagination
                                            currentPage={page}
                                            totalPage={queues.totalPageCount}
                                            onPageChange={(page) =>
                                                setPage(page)
                                            }
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </motion.section>
                </>
            )}
        </>
    );
};

export default HistoryQueuesTab;
