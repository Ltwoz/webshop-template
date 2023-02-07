import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import Layout from "../../../components/layouts/main-layout";
import DashboardNavbar from "../../../components/layouts/dashboard-navbar";

import CategoryContext from "../../../contexts/category/category-context";
import {
    DELETE_CATEGORY_RESET,
    NEW_CATEGORY_RESET,
    UPDATE_CATEGORY_RESET,
} from "../../../types/category-constants";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import LoadingSpiner from "../../../components/ui/loader/spiner";
import { useToast } from "../../../contexts/toast/toast-context";
import ConfirmModal from "../../../components/ui/modals/alert-modal/confirm-modal";

// Dynamic Import Modals.
const NewCategoryModal = dynamic(() =>
    import("../../../components/ui/modals/new-category-modal")
);
const UpdateCategoryModal = dynamic(() =>
    import("../../../components/ui/modals/update-category-modal")
);

const AdminCategories = () => {
    const {
        deleteCategory,
        error,
        success,
        isUpdated,
        isDeleted,
        dispatch,
        clearErrors,
    } = useContext(CategoryContext);

    // Modals State.
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);

    // CRUD State.
    const [loading, setLoading] = useState(true);

    // Category State.
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");

    const toast = useToast();

    useEffect(() => {
        const getAdminCategories = async () => {
            const { data } = await axios.get(`/api/admin/categories`);
            setCategories(data?.categories);
            setLoading(false);
        };

        getAdminCategories().catch(() => {
            console.error;
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success, isUpdated, isDeleted]);

    useEffect(() => {
        if (error) {
            toast.add({
                title: "ผิดพลาด!",
                text: error,
                icon: "error",
            });
            clearErrors();
        }

        if (success) {
            toast.add({
                title: "สำเร็จ!",
                text: "เพิ่มหมวดหมู่แล้ว",
                icon: "success",
            });
            dispatch({ type: NEW_CATEGORY_RESET });
        }

        if (isUpdated) {
            toast.add({
                title: "สำเร็จ!",
                text: "แก้ไขหมวดหมู่แล้ว",
                icon: "success",
            });
            dispatch({ type: UPDATE_CATEGORY_RESET });
        }

        if (isDeleted) {
            toast.add({
                title: "สำเร็จ!",
                text: "ลบหมวดหมู่แล้ว",
                icon: "success",
            });
            dispatch({ type: DELETE_CATEGORY_RESET });
        }
    }, [
        clearErrors,
        dispatch,
        categories,
        error,
        isDeleted,
        isUpdated,
        success,
        toast,
    ]);

    const deleteHandler = (e) => {
        e.preventDefault();

        deleteCategory(category?._id);
        setConfirmModal(false);
    };

    return (
        <Layout>
            <AnimatePresence>
                {isNewModalOpen && (
                    <NewCategoryModal setIsOpen={setIsNewModalOpen} />
                )}
                {isUpdateModalOpen && (
                    <UpdateCategoryModal
                        category={category}
                        setIsOpen={setIsUpdateModalOpen}
                    />
                )}
                {confirmModal && (
                    <ConfirmModal
                        title={`ลบหมวดหมู่ ${category.name} ?`}
                        message={"สินค้าในหมวดหมู่จะถูกลบด้วย"}
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
                        หมวดหมู่
                    </h1>
                </section>
                <DashboardNavbar />
                {loading ? (
                    <LoadingSpiner />
                ) : (
                    <section className="bg-white border rounded-md shadow mb-6 divide-y">
                        <div className="p-6 flex items-center justify-between max-h-[88px]">
                            <h2 className="text-lg font-semibold">
                                จัดการหมวดหมู่
                            </h2>
                            <button
                                type="button"
                                onClick={() =>
                                    setIsNewModalOpen((prevState) => !prevState)
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
                                        สร้างหมวดหมู่ใหม่
                                    </span>
                                </div>
                            </button>
                        </div>
                        <div className="flex flex-col overflow-x-auto">
                            <table className="w-full table-fixed">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                        <th className="py-3 px-6 text-left w-52">
                                            ชื่อหมวดหมู่
                                        </th>
                                        <th className="py-3 px-6 text-left w-32">
                                            ประเภท
                                        </th>
                                        <th className="py-3 px-6 text-center w-32">
                                            จำนวนสินค้า
                                        </th>
                                        <th className="py-3 px-6 text-center w-60">
                                            <span className="hidden">
                                                Action
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-base">
                                    {categories?.map((category) => (
                                        <tr
                                            key={category._id}
                                            className="border-b border-gray-200 hover:bg-gray-100/80"
                                        >
                                            <td className="py-3 px-6 text-left">
                                                {category.name}
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {category.type}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {category.products_count}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex item-center justify-end gap-x-2">
                                                    <Link
                                                        href={
                                                            category?.type ===
                                                            "STOCK"
                                                                ? `/store/${category._id}`
                                                                : `/store/idpass/${category._id}`
                                                        }
                                                        className="transform hover:text-primary hover:scale-110 transition-all border hover:border-primary rounded-full p-2"
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
                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                            />
                                                        </svg>
                                                    </Link>
                                                    <Link
                                                        href={`/dashboard/categories/${category._id}`}
                                                        className="transform hover:text-primary hover:scale-110 transition-all border hover:border-primary rounded-full p-2"
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
                                                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                                            />
                                                        </svg>
                                                    </Link>
                                                    <div
                                                        onClick={() => {
                                                            setCategory(
                                                                category
                                                            );
                                                            setIsUpdateModalOpen(
                                                                (prevState) =>
                                                                    !prevState
                                                            );
                                                        }}
                                                        className="transform hover:text-primary hover:scale-110 transition-all border hover:border-primary rounded-full p-2 md:cursor-pointer"
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
                                                            setCategory(
                                                                category
                                                            );
                                                            setConfirmModal(
                                                                (prevState) =>
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
                    </section>
                )}
            </main>
        </Layout>
    );
};

export default AdminCategories;

export { getServerSideProps } from "../../../utils/get-init-data";
