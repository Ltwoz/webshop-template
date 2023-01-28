import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import dynamic from "next/dynamic";

import Layout from "../../../components/layouts/main-layout";
import DashboardNavbar from "../../../components/layouts/dashboard-navbar";

const NewCategoryModal = dynamic(() =>
    import("../../../components/ui/modals/new-category-modal")
);
const UpdateCategoryModal = dynamic(() =>
    import("../../../components/ui/modals/update-category-modal")
);

import CategoryContext from "../../../contexts/category/category-context";
import {
    DELETE_CATEGORY_RESET,
    NEW_CATEGORY_RESET,
    UPDATE_CATEGORY_RESET,
} from "../../../types/category-constants";
import { AnimatePresence } from "framer-motion";

const AdminCategories = () => {
    const {
        getAdminCategories,
        deleteCategory,
        categories,
        loading,
        error,
        success,
        isUpdated,
        isDeleted,
        dispatch,
        clearErrors,
    } = useContext(CategoryContext);

    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [category, setCategory] = useState("");

    useEffect(() => {
        getAdminCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success, isUpdated, isDeleted]);

    useEffect(() => {
        if (error) {
            Swal.fire({
                title: "เกิดข้อผิดพลาด",
                text: error,
                icon: "error",
            });
            clearErrors();
        }

        if (success) {
            Swal.fire({
                title: "เพิ่มหมวดหมู่แล้ว",
                text: "",
                icon: "success",
            });
            dispatch({ type: NEW_CATEGORY_RESET });
        }

        if (isUpdated) {
            Swal.fire({
                title: "แก้ไขหมวดหมู่แล้ว",
                text: "",
                icon: "success",
            });
            dispatch({ type: UPDATE_CATEGORY_RESET });
        }

        if (isDeleted) {
            Swal.fire({
                title: "ลบหมวดหมู่แล้ว!",
                text: "ไม่มีหมวดหมู่นี้อีกแล้ว",
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
    ]);

    const deleteHandler = (e, category) => {
        e.preventDefault();

        Swal.fire({
            title: `ลบหมวดหมู่ ${category.name} ?`,
            text: "สินค้าในหมวดหมู่จะถูกลบด้วย!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ตกลง, ลบเลย!",
            cancelButtonText: "ยกเลิก",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCategory(category._id);
            }
        });
    };

    return (
        <Layout>
            <AnimatePresence>
                {isNewModalOpen && (
                    <NewCategoryModal setIsNewModalOpen={setIsNewModalOpen} />
                )}
                {isUpdateModalOpen && (
                    <UpdateCategoryModal
                        category={category}
                        setIsUpdateModalOpen={setIsUpdateModalOpen}
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
                            className="inline-flex items-center font-medium text-white bg-primary hover:bg-violet-700 py-2 px-2 md:px-4 rounded-md transition-all hover:scale-105"
                        >
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
                        </button>
                    </div>
                    <div className="flex flex-col overflow-x-scroll">
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
                                        <span className="hidden">Action</span>
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
                                                    className="transform hover:text-purple-500 hover:scale-110 transition-all border hover:border-purple-500 rounded-full p-2"
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
                                                    className="transform hover:text-purple-500 hover:scale-110 transition-all border hover:border-purple-500 rounded-full p-2"
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
                                                <button
                                                    onClick={() => {
                                                        setCategory(category);
                                                        setIsUpdateModalOpen(
                                                            (prevState) =>
                                                                !prevState
                                                        );
                                                    }}
                                                    className="transform hover:text-purple-500 hover:scale-110 transition-all border hover:border-purple-500 rounded-full p-2"
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
                                                </button>
                                                <button
                                                    onClick={(e) =>
                                                        deleteHandler(
                                                            e,
                                                            category
                                                        )
                                                    }
                                                    className="transform text-red-600 hover:scale-110 transition-all border hover:border-red-600 rounded-full p-2"
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
                                                </button>
                                            </div>
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

export default AdminCategories;

export { getServerSideProps } from "../../../utils/get-init-data";
