import axios from "axios";
import { useEffect, useState } from "react";
import DashboardNavbar from "../../../components/layouts/dashboard-navbar";
import Layout from "../../../components/layouts/main-layout";
import LoadingSpiner from "../../../components/ui/loader/spiner";
import TablePagination from "../../../components/ui/paginations/table-pagination";
import { useToast } from "../../../contexts/toast/toast-context";

const AdminOrders = () => {
    // CRUD State.
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Orders State.
    const [orders, setOrders] = useState({});

    // Search State.
    const [search, setSearch] = useState("");
    const [debounceValue, setDebounceValue] = useState("");

    // Pagination State.
    const [page, setPage] = useState(1);

    const toast = useToast();

    // Debounce
    useEffect(() => {
        const debounce = setTimeout(() => {
            setSearch(debounceValue);
        }, 500);

        return () => clearTimeout(debounce);
    }, [debounceValue]);

    useEffect(() => {
        const getAdminOrders = async () => {
            let link = `/api/admin/history/orders?id=${
                search ? search : ""
            }&page=${page}`;

            const { data } = await axios.get(link);
            setOrders(data);
            setLoading(false);
        };

        getAdminOrders().catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    }, [page, search]);

    useEffect(() => {
        if (error) {
            toast.add({
                title: "ผิดพลาด!",
                text: error,
                icon: "error",
            });
            setError(null);
        }
    }, [error, toast]);

    return (
        <Layout>
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
                    <LoadingSpiner />
                ) : (
                    <section className="bg-white border rounded-md shadow mb-6">
                        <div className="p-6 flex items-center justify-between max-h-[88px]">
                            <h2 className="hidden md:block text-lg font-semibold">
                                ประวัติการสั่งซื้อ
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
                        {orders.orders.length < 1 ? (
                            <div className="flex items-center justify-center py-6 border-t">
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
                                                <th className="py-3 px-6 text-left w-36">
                                                    #
                                                </th>
                                                <th className="py-3 px-6 text-left w-36">
                                                    ผู้ใช้
                                                </th>
                                                <th className="py-3 px-6 text-left w-44 md:w-56">
                                                    ชื่อสินค้า
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
                                            {orders.orders?.map((order, i) => (
                                                <tr
                                                    key={i}
                                                    className="border-b border-gray-200 hover:bg-gray-100"
                                                >
                                                    <td className="py-3 px-6 text-left">
                                                        {order._id}
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        {order.user?.username}
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        {order.product_name}
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
                    </section>
                )}
            </main>
        </Layout>
    );
};

export default AdminOrders;

export { getServerSideProps } from "../../../utils/get-init-data";
