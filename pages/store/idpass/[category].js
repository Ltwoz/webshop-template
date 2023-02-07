import { useContext, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

import CheckoutModal from "../../../components/ui/modals/alert-modal/checkout-modal";
import IdPassProductCard from "../../../components/ui/cards/idpass-product-card";
import ProductContext from "../../../contexts/product/product-context";
import LoadingSpiner from "../../../components/ui/loader/spiner";
import Layout from "../../../components/layouts/main-layout";

import { PRODUCT_QUEUE_PURCHASE_RESET } from "../../../types/product-constants";
import { useToast } from "../../../contexts/toast/toast-context";
import { withInitProps } from "../../../utils/get-init-data";

const CategoryIDPASS = (props) => {
    const router = useRouter();
    const cid = router.query?.category;

    const {
        queuePurchaseProduct,
        clearErrors,
        error,
        dispatch,
        purchase: { success },
    } = useContext(ProductContext);

    const [selectedProduct, setSelectedProduct] = useState({});

    // Form State.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [uid, setUid] = useState("");

    // CRUD State.
    const [loading, setLoading] = useState(true);
    const [checkoutModal, setCheckoutModal] = useState(false);

    const [products, setProducts] = useState([]);

    const toast = useToast();

    useEffect(() => {
        const getAllProducts = async () => {
            const { data } = await axios.get(`/api/products?cid=${cid}`);
            setProducts(data.products);
            setLoading(false);
        };

        getAllProducts().catch(() => {
            console.error;
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success]);

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
                title: "ซื้อสินค้าสำเร็จ!",
                text: "เช็คข้อมูลได้ที่หน้าประวัติ",
                icon: "success",
            });
            dispatch({ type: PRODUCT_QUEUE_PURCHASE_RESET });
        }
    }, [clearErrors, dispatch, error, success, toast]);

    const handlerProductSelect = (product) => {
        if (selectedProduct._id === product._id) {
            setSelectedProduct({});
        } else {
            setSelectedProduct(product);
        }
    };

    const prePurchaseHandler = (e) => {
        e.preventDefault();
        setCheckoutModal(true);
    };

    const purchaseHandler = (e) => {
        e.preventDefault();

        if (Object.keys(selectedProduct).length === 0) {
            toast.add({
                title: "ผิดพลาด!",
                text: "ยังไม่ได้เลือกสินค้าที่จะซื้อ",
                icon: "error",
            });
            setCheckoutModal(false);
            return;
        }

        if (props?.category?.form_uid) {
            if (!uid.trim()) {
                toast.add({
                    title: "ผิดพลาด!",
                    text: "โปรดใส่ข้อมูลรหัสของท่าน",
                    icon: "error",
                });
                setCheckoutModal(false);
                return;
            }
        } else {
            if (!username.trim() || !password.trim()) {
                toast.add({
                    title: "ผิดพลาด!",
                    text: "โปรดใส่ข้อมูลรหัสของท่าน!",
                    icon: "error",
                });
                setCheckoutModal(false);
                return;
            }
        }

        if (props?.category?.form_uid) {
            queuePurchaseProduct(selectedProduct?._id, {
                uid: uid,
            });
        } else {
            queuePurchaseProduct(selectedProduct?._id, {
                username: username,
                password: password,
            });
        }

        setCheckoutModal(false);
    };

    return (
        <Layout>
            <AnimatePresence>
                {checkoutModal && (
                    <CheckoutModal
                        handler={purchaseHandler}
                        setIsOpen={setCheckoutModal}
                    />
                )}
            </AnimatePresence>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-24 md:pt-28 mx-auto items-center">
                <section
                    id="banner"
                    className="flex justify-center items-center aspect-[16/3.5] relative overflow-hidden md:rounded-lg md:mx-2 mb-4 md:mb-6 lg:mb-8"
                >
                    <Image
                        alt="homepage_banner"
                        src={"https://dummyimage.com/1100x240"}
                        draggable="false"
                        fill
                        className="select-none object-cover"
                    />
                </section>
                {loading ? (
                    <LoadingSpiner />
                ) : (
                    <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
                        <div className="w-full md:w-1/3">
                            <div className="flex flex-col border rounded-lg p-4 gap-y-4 bg-white">
                                {props?.category?.form_uid === true ? (
                                    <div className="">
                                        <input
                                            type="text"
                                            placeholder="uid"
                                            id="uid"
                                            value={uid}
                                            onChange={(e) =>
                                                setUid(e.target.value)
                                            }
                                            autoComplete="off"
                                            className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                                        />
                                    </div>
                                ) : (
                                    <>
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
                                    </>
                                )}
                                <button
                                    type="submit"
                                    onClick={prePurchaseHandler}
                                    className="inline-flex items-center bg-primary rounded-md transition-all overflow-hidden"
                                >
                                    <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
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
                                        <span className="block">ชำระเงิน</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-4">
                            {products?.map((product, i) => (
                                <IdPassProductCard
                                    key={i}
                                    {...{
                                        handlerProductSelect,
                                        selectedProduct,
                                        product,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </Layout>
    );
};

export default CategoryIDPASS;

// export { getServerSideProps } from "../../../utils/get-init-data";

export const getServerSideProps = withInitProps(async (ctx) => {
    try {
        const cid = ctx.params.category;

        const nextRequestMeta =
            ctx.req[
                Reflect.ownKeys(ctx.req).find(
                    (s) => String(s) === "Symbol(NextRequestMeta)"
                )
            ];
        const protocal = nextRequestMeta._protocol;

        const { data } = await axios.get(
            `${protocal}://${ctx.req.headers.host}/api/categories/${cid}`
        );

        return {
            props: {
                category: data.category,
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
});
