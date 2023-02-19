import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import DashboardNavbar from "../../../components/layouts/dashboard-navbar";
import Layout from "../../../components/layouts/main-layout";
import LoadingSpiner from "../../../components/ui/loader/spiner";
import ConfirmModal from "../../../components/ui/modals/alert-modal/confirm-modal";
import NewCouponModal from "../../../components/ui/modals/new-coupon-modal";
import UpdateCouponModal from "../../../components/ui/modals/update-coupon-modal";
import TablePagination from "../../../components/ui/paginations/table-pagination";
import { useToast } from "../../../contexts/toast/toast-context";

const AdminCoupons = () => {
    // Modals State.
    const [isNewModal, setIsNewModal] = useState(false);
    const [isUpdateModal, setIsUpdateModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);

    // CRUD State.
    const [loading, setLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [error, setError] = useState(null);

    // Users State.
    const [coupons, setCoupons] = useState({});
    const [selectedCoupon, setSelectedCoupon] = useState({});

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
        const getAllCoupons = async () => {
            let link = `/api/admin/coupons?couponCode=${
                search ? search : ""
            }&page=${page}`;

            const { data } = await axios.get(link);
            setCoupons(data);
            setLoading(false);
        };

        getAllCoupons().catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    }, [page, search, isSuccess, isDeleted]);

    useEffect(() => {
        if (error) {
            toast.add({
                title: "ผิดพลาด!",
                text: error,
                icon: "error",
            });
            setError(null);
        }

        if (isSuccess) {
            toast.add({
                title: "สำเร็จ!",
                text: "สร้างคูปองแล้ว",
                icon: "success",
            });
            setIsSuccess(false);
        }

        if (isDeleted) {
            toast.add({
                title: "สำเร็จ!",
                text: "ลบคูปองแล้ว",
                icon: "success",
            });
            setIsDeleted(false);
        }
    }, [error, isDeleted, isSuccess, toast]);

    const deleteHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.delete(
                `/api/admin/coupons/${selectedCoupon._id}`
            );

            setIsDeleted(data.success);
        } catch (error) {
            setError(error.message);
            console.error(error.message);
        }

        setConfirmModal(false);
    };

    return (
        <Layout>
            <AnimatePresence>
                {isNewModal && (
                    <NewCouponModal
                        setIsOpen={setIsNewModal}
                        setIsSuccess={setIsSuccess}
                        setError={setError}
                    />
                )}
                {isUpdateModal && (
                    <UpdateCouponModal
                        coupon={selectedCoupon}
                        setIsOpen={setIsUpdateModal}
                        setIsSuccess={setIsSuccess}
                        setError={setError}
                    />
                )}
                {confirmModal && (
                    <ConfirmModal
                        title={`ลบคูปอง ${selectedCoupon.code} ?`}
                        message={"หากลบแล้วจะไม่สามารถกู้คืนได้"}
                        buttonLabel={"ตกลง, ลบเลย!"}
                        setIsOpen={setConfirmModal}
                        handler={deleteHandler}
                    />
                )}
            </AnimatePresence>

            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-20 md:pt-28 mx-auto items-center">
                <section
                    id="header"
                    className="md:hidden border-b-2 mx-8 py-4 mb-6"
                >
                    <h1 className="text-4xl font-semibold text-center">
                        จัดการคูปอง
                    </h1>
                </section>
                <DashboardNavbar />
                {loading ? (
                    <LoadingSpiner />
                ) : (
                    <section className="bg-white border rounded-md shadow mb-6">
                        <div className="p-6 flex items-center justify-between max-h-[88px]">
                            <h2 className="hidden md:block text-lg font-semibold">
                                จัดการคูปอง
                            </h2>
                            <div className="flex items-center gap-4">
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
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="ค้นหาคูปอง"
                                        autoComplete="off"
                                        value={debounceValue}
                                        onChange={(e) =>
                                            setDebounceValue(e.target.value)
                                        }
                                        className="pl-10 p-2 w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsNewModal((prevState) => !prevState)
                                    }
                                    className="inline-flex items-center bg-primary rounded-md transition-all overflow-hidden"
                                >
                                    <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2.5}
                                            stroke="currentColor"
                                            className="w-5 h-5 md:mr-2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span className="hidden md:block">
                                            สร้างคูปองใหม่
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        {coupons.coupons?.length < 1 ? (
                            <div className="flex items-center justify-center py-6 border-t">
                                <p className="font-medium text-gray-600">
                                    ไม่มีข้อมูลคูปอง
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col overflow-x-auto">
                                    <table className="w-full table-fixed">
                                        <thead>
                                            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                                <th className="py-3 px-6 text-left w-44 md:w-48">
                                                    โค้ด
                                                </th>
                                                <th className="py-3 px-6 text-left w-44">
                                                    พอยต์
                                                </th>
                                                <th className="py-3 px-6 text-left w-44">
                                                    จำกัด
                                                </th>
                                                <th className="py-3 px-6 text-left w-40">
                                                    ใช้ไปแล้ว
                                                </th>
                                                <th className="py-3 px-6 text-center w-28">
                                                    <span className="hidden">
                                                        Action
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-sm md:text-base">
                                            {coupons.coupons?.map((coupon) => (
                                                <tr
                                                    key={coupon._id}
                                                    className="border-b border-gray-200 hover:bg-gray-100"
                                                >
                                                    <td className="py-3 px-6 text-left">
                                                        {coupon.code}
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        {coupon.value}
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        {coupon.limit}
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        {
                                                            coupon.redeemedBy
                                                                .length
                                                        }
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <div className="flex item-center justify-end gap-x-2">
                                                            <div
                                                                onClick={() => {
                                                                    setSelectedCoupon(
                                                                        coupon
                                                                    );
                                                                    setIsUpdateModal(
                                                                        (
                                                                            prevState
                                                                        ) =>
                                                                            !prevState
                                                                    );
                                                                }}
                                                                className="transform hover:text-primary hover:border-primary hover:scale-110 transition-all border rounded-full p-2 hover:cursor-pointer"
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
                                                            <div
                                                                onClick={() => {
                                                                    setSelectedCoupon(
                                                                        coupon
                                                                    );
                                                                    setConfirmModal(
                                                                        (
                                                                            prevState
                                                                        ) =>
                                                                            !prevState
                                                                    );
                                                                }}
                                                                className="transform text-red-600 hover:scale-110 transition-all border hover:border-red-600 rounded-full p-2 md:cursor-pointer"
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
                                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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
                                {!(
                                    page === 0 || coupons.totalPageCount < 2
                                ) && (
                                    <div
                                        id="pagination"
                                        className="flex px-6 py-3 items-center justify-center md:justify-end"
                                    >
                                        <TablePagination
                                            currentPage={page}
                                            totalPage={coupons.totalPageCount}
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

export default AdminCoupons;

export { getServerSideProps } from "../../../utils/get-init-data";
