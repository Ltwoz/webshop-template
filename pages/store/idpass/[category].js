import Layout from "../../../components/layouts/main-layout";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductContext from "../../../contexts/product/product-context";
import Swal from "sweetalert2";
import { PRODUCT_QUEUE_PURCHASE_RESET } from "../../../types/product-constants";

const CategoryIDPASS = () => {
    const router = useRouter();
    const cid = router.query?.category;

    const {
        getAllProducts,
        queuePurchaseProduct,
        products,
        clearErrors,
        loading,
        error,
        dispatch,
        purchase: { success },
    } = useContext(ProductContext);

    const [selectedProduct, setSelectedProduct] = useState({});
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        getAllProducts(cid);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success, cid]);

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
            Swal.fire(
                "ซื้อสินค้าสำเร็จ!",
                "เช็คข้อมูลได้ที่หน้าประวัติ",
                "success"
            );
            dispatch({ type: PRODUCT_QUEUE_PURCHASE_RESET });
        }
    }, [clearErrors, dispatch, error, success]);

    useEffect(() => {
        console.log("Selected :", selectedProduct);
    }, [selectedProduct]);

    const handlerProductSelect = (product) => {
        if (selectedProduct._id === product._id) {
            setSelectedProduct({});
        } else {
            setSelectedProduct(product);
        }
    };

    const purchaseHandler = (e) => {
        e.preventDefault();

        if (Object.keys(selectedProduct).length === 0) {
            Swal.fire({
                title: "เกิดข้อผิดพลาด",
                text: "ยังไม่ได้เลือกสินค้าที่จะซื้อ!",
                icon: "error",
            });
            return;
        }

        if (!username.trim() || !password.trim()) {
            Swal.fire({
                title: "เกิดข้อผิดพลาด",
                text: "โปรดใส่ข้อมูลรหัสของท่าน!",
                icon: "error",
            });
            return;
        }

        Swal.fire({
            title: `ซื้อสินค้า ${selectedProduct.name} ?`,
            text: `ชำระเงิน ราคา ${selectedProduct.price} บาท`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ตกลง, ซื้อเลย!",
            cancelButtonText: "ยกเลิก",
        }).then((result) => {
            if (result.isConfirmed) {
                queuePurchaseProduct(selectedProduct?._id, {
                    username: username,
                    password: password,
                });
            }
        });
    };

    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-24 md:pt-28 mx-auto items-center">
                <div className="flex flex-row justify-center gap-x-6">
                    <div className="w-2/6">
                        <div className="flex flex-col border rounded-lg p-4 gap-y-4 bg-white">
                            <div className="">
                                <input
                                    type="text"
                                    placeholder="username"
                                    id="username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    autoComplete="off"
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                                />
                            </div>
                            <div className="">
                                <input
                                    type="text"
                                    placeholder="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    autoComplete="off"
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                                />
                            </div>
                            <button
                                type="submit"
                                onClick={purchaseHandler}
                                className="inline-flex items-center font-medium text-white bg-primary hover:bg-violet-700 py-2 px-4 rounded-md transition-all"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>ชำระเงิน</span>
                            </button>
                        </div>
                    </div>
                    <div className="w-4/6 grid grid-cols-2 gap-4">
                        {products?.map((product, i) => (
                            <div
                                key={i}
                                onClick={() => handlerProductSelect(product)}
                                className={
                                    "select-none rounded-xl border cursor-pointer aspect-video bg-white transition-all hover:bg-red-50 active:scale-[.98]" +
                                    (selectedProduct._id === product._id
                                        ? " border-red-500"
                                        : "")
                                }
                            >
                                <h1>{product?.name}</h1>
                                <p className="text-2xl text-cyan-700 font-semibold">
                                    {product?.price}
                                    <span className="text-base ml-1">บาท</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default CategoryIDPASS;

export { getServerSideProps } from "../../../utils/get-init-data";