import axios from "axios";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Layout from "../../../../components/layouts/main-layout";
import LoadingSpiner from "../../../../components/ui/loader/spiner";
import ProductContext from "../../../../contexts/product/product-context";
import { PRODUCT_PURCHASE_RESET } from "../../../../types/product-constants";
import { withInitProps } from "../../../../utils/get-init-data";
import dynamic from "next/dynamic";

const CheckoutModal = dynamic(() =>
    import("../../../../components/ui/modals/alert-modal/checkout-modal")
);
const SuccessModal = dynamic(() =>
    import("../../../../components/ui/modals/alert-modal/success-modal")
);
const ErrorModal = dynamic(() =>
    import("../../../../components/ui/modals/alert-modal/error-modal")
);

const HistoryStock = (props) => {
    const router = useRouter();
    const pid = router.query.product;

    const {
        purchaseProduct,
        clearErrors,
        error,
        dispatch,
        purchase: { success },
    } = useContext(ProductContext);

    const [product, setProduct] = useState(props.product);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(product?.price);
    const [loading, setLoading] = useState(true);
    const [checkoutModal, setCheckoutModal] = useState(false);
    const [successModal, setSuccesModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);

    useEffect(() => {
        const getProductDetails = async () => {
            const { data } = await axios.get(`/api/products/${pid}`);
            setProduct(data.product);
            setLoading(false);
        };

        getProductDetails().catch(() => {
            console.error;
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success]);

    useEffect(() => {
        setPrice(product?.price * quantity);
    }, [product?.price, quantity]);

    const increment = () => {
        setQuantity((prevState) => {
            return prevState >= 0 && prevState < product?.stock_count
                ? prevState + 1
                : prevState;
        });
    };

    const decrement = () => {
        setQuantity((prevState) => {
            return prevState > 1 && prevState <= product?.stock_count
                ? prevState - 1
                : prevState;
        });
    };

    useEffect(() => {
        if (error) {
            setErrorModal(true);
            clearErrors();
        }

        if (success) {
            setSuccesModal(true);
            dispatch({ type: PRODUCT_PURCHASE_RESET });
        }
    }, [clearErrors, dispatch, error, success]);

    const prePurchaseHandler = (e) => {
        e.preventDefault();
        setCheckoutModal(true);
    };

    const purchaseHandler = (e) => {
        e.preventDefault();
        purchaseProduct(product?._id, quantity);
        setCheckoutModal(false);
    };

    const text = product?.description;
    const str = text?.replace(/(?:\r\n|\r|\n)/g, "<br>");

    return (
        <Layout>
            <AnimatePresence>
                {checkoutModal && (
                    <CheckoutModal
                        handler={purchaseHandler}
                        setIsOpen={setCheckoutModal}
                    />
                )}
                {successModal && (
                    <SuccessModal
                        setIsOpen={setSuccesModal}
                        title={"ชำระเงินสำเร็จ"}
                        message={
                            "ตรวจสอบรายละเอียดได้ที่หน้าประวัติการสั่งซื้อ"
                        }
                        href={"/history/order"}
                        confirmText={"ไปที่หน้าประวัติการสั่งซื้อ"}
                    />
                )}
                {errorModal && (
                    <ErrorModal
                        setIsOpen={setErrorModal}
                        title={"เกิดข้อผิดพลาด"}
                        message={error}
                    />
                )}
            </AnimatePresence>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-24 md:pt-28 mx-auto items-center">
                {loading ? (
                    <LoadingSpiner />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center md:mt-10">
                        <div className="w-full aspect-square relative flex items-center rounded-lg overflow-hidden">
                            <Image
                                alt="product_img"
                                src={product?.image}
                                unoptimized
                                draggable="false"
                                fill
                                className="select-none object-cover"
                            />
                        </div>
                        <div className="w1/2 flex flex-col mt-6 md:mt-0 md:ml-10 self-start">
                            <h1 className="text-2xl font-bold mb-4">
                                {product.name}
                            </h1>
                            <p
                                className="text-md font-normal overflow-hidden mb-6"
                                dangerouslySetInnerHTML={{ __html: str }}
                            />
                            <div className="flex flex-col justify-center items-center border-b-2 pb-5 mb-5">
                                <div className="w-full flex flex-row justify-between items-center mb-2">
                                    <label className="block text-base font-medium tracking-wide">
                                        เลือกจำนวน
                                    </label>
                                    <label
                                        className={
                                            "block text-base font-medium tracking-wide" +
                                            (product?.stock_count === 0
                                                ? " text-red-600"
                                                : "")
                                        }
                                    >
                                        {product?.stock_count === 0
                                            ? "สินค้าหมด"
                                            : `เหลือ ${product?.stock_count} ชิ้น`}
                                    </label>
                                </div>
                                <div className="flex w-full">
                                    <button
                                        className="select-none outline-none p-3 w-12 text-base bg-white border text-center"
                                        onClick={decrement}
                                    >
                                        &mdash;
                                    </button>
                                    <input
                                        className="select-none outline-none w-full p-3 bg-white text-base text-center border-t border-b"
                                        type="number"
                                        value={quantity}
                                        readOnly
                                    />
                                    <button
                                        className="select-none outline-none p-3 w-12 text-base bg-white border text-center"
                                        onClick={increment}
                                    >
                                        &#xff0b;
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <p className="text-3xl font-semibold">
                                    {price}
                                    <span className="text-xl ml-1">บาท</span>
                                </p>
                                <div className="flex">
                                    <button
                                        type="button"
                                        disabled={product?.stock_count === 0}
                                        onClick={prePurchaseHandler}
                                        className="inline-flex items-center font-medium text-white bg-primary hover:bg-violet-700 py-2 px-4 rounded-md transition-all hover:scale-105 disabled:bg-gray-500/80 disabled:hover:scale-100 disabled:cursor-not-allowed"
                                    >
                                        <span>ชำระเงิน</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </Layout>
    );
};

export default HistoryStock;

// export { getServerSideProps } from "../../../../utils/get-init-data";

export const getServerSideProps = withInitProps(async (ctx) => {
    try {
        const pid = ctx.params.product;

        const nextRequestMeta =
            ctx.req[
                Reflect.ownKeys(ctx.req).find(
                    (s) => String(s) === "Symbol(NextRequestMeta)"
                )
            ];
        const protocal = nextRequestMeta._protocol;

        const { data } = await axios.get(
            `${protocal}://${ctx.req.headers.host}/api/products/${pid}`
        );

        if (data.product?.category?.type === "ID_PASS") {
            return {
                redirect: {
                    destination: `/store/idpass/${data.product?.category?._id}`,
                    permanent: true,
                },
            };
        }

        return {
            props: {
                product: data.product,
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
});
