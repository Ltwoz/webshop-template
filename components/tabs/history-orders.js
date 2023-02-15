import LoadingSpiner from "../ui/loader/spiner";
import TablePagination from "../ui/paginations/table-pagination";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HistoryOrdersTab = () => {
    const { data: session } = useSession();
    const user = session?.user;

    // CRUD State.
    const [loading, setLoading] = useState(true);

    // Orders State.
    const [orders, setOrders] = useState({});

    // Search State.
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
        const getOrders = async () => {
            let link = `/api/history/orders?user=${user?.id}&id=${
                search ? search : ""
            }&page=${page}`;

            const { data } = await axios.get(link);
            setOrders(data);
            setLoading(false);
        };

        getOrders().catch(() => {
            console.error;
            setLoading(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, search]);

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
                                ประเภทสต็อก
                            </h2>
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
                                    placeholder="ค้นหาไอดีการสั่งซื้อ"
                                    autoComplete="off"
                                    value={debounceValue}
                                    onChange={(e) =>
                                        setDebounceValue(e.target.value)
                                    }
                                    className="pl-10 p-2 w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                                />
                            </div>
                        </div>
                        {orders.orders?.length < 1 ? (
                            <div className="flex items-center justify-center py-6">
                                <p className="font-medium text-gray-600">
                                    ไม่มีข้อมูลการสั่งซื้อ
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
                                                <th className="py-3 px-6 text-left w-44 md:w-72">
                                                    ชื่อสินค้า
                                                </th>
                                                <th className="py-3 px-6 text-left w-36">
                                                    ราคา
                                                </th>
                                                <th className="py-3 px-6 text-left w-52">
                                                    ข้อมูล
                                                </th>
                                                <th className="py-3 px-6 text-left w-52">
                                                    วันที่
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-sm md:text-base">
                                            {orders.orders?.map((order, i) => (
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
                                                        {order.price} บาท
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
                                {!(page === 0 || orders.totalPageCount < 2) && (
                                    <div
                                        id="pagination"
                                        className="flex px-6 py-3 items-center justify-center md:justify-end"
                                    >
                                        <TablePagination
                                            currentPage={page}
                                            totalPage={orders.totalPageCount}
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

export default HistoryOrdersTab;
