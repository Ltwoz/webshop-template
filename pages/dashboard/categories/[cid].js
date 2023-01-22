import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CSSTransition } from "react-transition-group";
import Swal from "sweetalert2";

import DashboardNavbar from "../../../components/layouts/dashboard-navbar";
import Layout from "../../../components/layouts/main-layout";
import NewProductModal from "../../../components/ui/modals/new-product-modal";
import UpdateStockModal from "../../../components/ui/modals/update-stock-modal";
import UpdateProductModal from "../../../components/ui/modals/update-product-modal";

import ProductContext from "../../../contexts/product/product-context";
import { DELETE_PRODUCT_RESET } from "../../../types/product-constants";
import CategoryContext from "../../../contexts/category/category-context";
import Link from "next/link";

import { TbArrowBack } from "react-icons/tb";
import ThreeDotsLoader from "../../../components/ui/loader/threedots";

const AdminProducts = () => {
    const router = useRouter();
    const cid = router.query.cid;

    const {
        getAdminProducts,
        deleteProduct,
        products,
        error,
        success,
        isUpdated,
        isDeleted,
        dispatch,
    } = useContext(ProductContext);
    const { getAdminDetailsCategories, category } = useContext(CategoryContext);

    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isStockModalOpen, setIsStockModalOpen] = useState(false);
    const [product, setProduct] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAdminProducts(cid);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success, isUpdated, isDeleted, cid]);

    useEffect(() => {
        setTimeout(function () {
            setLoading(false);
        }, 600);
    }, [products]);

    useEffect(() => {
        getAdminDetailsCategories(cid);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteHandler = (e, product) => {
        e.preventDefault();

        Swal.fire({
            title: `ลบสินค้า ${product.name} ?`,
            text: "สต็อกของสินค้านี้จะถูกลบด้วย!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ตกลง, ลบเลย!",
            cancelButtonText: "ยกเลิก",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(product._id);
                Swal.fire("ลบสินค้าแล้ว!", "ไม่มีสินค้านี้อีกแล้ว", "success");
            }
            dispatch({ type: DELETE_PRODUCT_RESET });
        });
    };

    return (
        <Layout>
            <CSSTransition
                in={isNewModalOpen}
                timeout={250}
                classNames="modal"
                unmountOnExit
            >
                <NewProductModal setIsNewModalOpen={setIsNewModalOpen} />
            </CSSTransition>
            <CSSTransition
                in={isUpdateModalOpen}
                timeout={250}
                classNames="modal"
                unmountOnExit
            >
                <UpdateProductModal
                    product={product}
                    setIsUpdateModalOpen={setIsUpdateModalOpen}
                />
            </CSSTransition>
            <CSSTransition
                in={isStockModalOpen}
                timeout={250}
                classNames="modal"
                unmountOnExit
            >
                <UpdateStockModal
                    product={product}
                    setIsStockModalOpen={setIsStockModalOpen}
                />
            </CSSTransition>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-20 md:pt-28 mx-auto items-center">
                <DashboardNavbar />
                {loading ? (
                    <ThreeDotsLoader />
                ) : (
                    <section className="bg-white border rounded-md shadow mb-6 divide-y">
                        <div className="p-6 flex items-center justify-between max-h-[88px]">
                            <h2 className="text-lg font-semibold">
                                จัดการสินค้าในหมวดหมู่ {category?.name}
                            </h2>
                            <div className="flex flex-row gap-x-4">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="inline-flex items-center font-medium border hover:bg-gray-100/80 py-2 px-2 md:px-4 rounded-md transition-all hover:scale-105"
                                >
                                    <TbArrowBack className="w-5 h-5 md:mr-2" />
                                    <span className="hidden md:block">
                                        ย้อนกลับ
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsNewModalOpen(
                                            (prevState) => !prevState
                                        )
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
                                        เพิ่มสินค้าใหม่
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col overflow-x-scroll">
                            <table className="w-full table-fixed">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                        <th className="py-3 px-6 text-left w-52 md:w-80">
                                            ชื่อสินค้า
                                        </th>
                                        <th className="py-3 px-6 text-left w-24">
                                            ราคา
                                        </th>
                                        {category?.type === "STOCK" && (
                                            <th className="py-3 px-6 text-center w-24">
                                                สต็อก
                                            </th>
                                        )}
                                        <th className="py-3 px-6 text-center w-60">
                                            <span className="hidden">
                                                Action
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm md:text-base">
                                    {products?.map((product) => (
                                        <tr
                                            key={product._id}
                                            className="border-b border-gray-200 hover:bg-gray-100/80"
                                        >
                                            <td className="py-3 px-6 text-left">
                                                {product.name}
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {product?.price?.toFixed(2)}
                                            </td>
                                            {category?.type === "STOCK" && (
                                                <td className="py-3 px-6 text-center">
                                                    {product?.stock?.length}
                                                </td>
                                            )}
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex item-center justify-end gap-x-2">
                                                    <Link
                                                        href={
                                                            category?.type ===
                                                            "STOCK"
                                                                ? `/store/${cid}/${product?._id}`
                                                                : `/store/idpass/${cid}`
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
                                                    {category?.type ===
                                                        "STOCK" && (
                                                        <button
                                                            onClick={() => {
                                                                setProduct(
                                                                    product
                                                                );
                                                                setIsStockModalOpen(
                                                                    (
                                                                        prevState
                                                                    ) =>
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
                                                                    d="M20.5 7.27783L12 12.0001M12 12.0001L3.49997 7.27783M12 12.0001L12 21.5001M14 20.889L12.777 21.5684C12.4934 21.726 12.3516 21.8047 12.2015 21.8356C12.0685 21.863 11.9315 21.863 11.7986 21.8356C11.6484 21.8047 11.5066 21.726 11.223 21.5684L3.82297 17.4573C3.52346 17.2909 3.37368 17.2077 3.26463 17.0893C3.16816 16.9847 3.09515 16.8606 3.05048 16.7254C3 16.5726 3 16.4013 3 16.0586V7.94153C3 7.59889 3 7.42757 3.05048 7.27477C3.09515 7.13959 3.16816 7.01551 3.26463 6.91082C3.37368 6.79248 3.52345 6.70928 3.82297 6.54288L11.223 2.43177C11.5066 2.27421 11.6484 2.19543 11.7986 2.16454C11.9315 2.13721 12.0685 2.13721 12.2015 2.16454C12.3516 2.19543 12.4934 2.27421 12.777 2.43177L20.177 6.54288C20.4766 6.70928 20.6263 6.79248 20.7354 6.91082C20.8318 7.01551 20.9049 7.13959 20.9495 7.27477C21 7.42757 21 7.59889 21 7.94153L21 12.5001M7.5 4.50008L16.5 9.50008M19 21.0001V15.0001M16 18.0001H22"
                                                                />
                                                            </svg>
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => {
                                                            setProduct(product);
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
                                                                product
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
                )}
            </main>
        </Layout>
    );
};

export default AdminProducts;

export { getServerSideProps } from "../../../utils/get-init-data";