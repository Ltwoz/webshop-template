import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Layout from "../../../../components/layouts/main-layout";
import ThreeDotsLoader from "../../../../components/ui/loader/threedots";
import ProductContext from "../../../../contexts/product/product-context";
import { PRODUCT_PURCHASE_RESET } from "../../../../types/product-constants";
import { withInitProps } from "../../../../utils/get-init-data";

const HistoryStock = (props) => {
    const router = useRouter();
    const pid = router.query.product;

    const {
        getProductDetails,
        purchaseProduct,
        product,
        clearErrors,
        error,
        dispatch,
        purchase: { success },
    } = useContext(ProductContext);

    const [clientProduct, setClientProduct] = useState(props.product);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(product?.price);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProductDetails(pid);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success, pid]);

    useEffect(() => {
        setClientProduct(product);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product]);

    useEffect(() => {
        setPrice(clientProduct?.price * quantity);
    }, [clientProduct?.price, quantity]);

    const increment = () => {
        setQuantity((prevState) => {
            return prevState >= 0 && prevState < clientProduct?.stock_count
                ? prevState + 1
                : prevState;
        });
    };

    const decrement = () => {
        setQuantity((prevState) => {
            return prevState > 1 && prevState <= clientProduct?.stock_count
                ? prevState - 1
                : prevState;
        });
    };

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
            dispatch({ type: PRODUCT_PURCHASE_RESET });
        }
    }, [clearErrors, dispatch, error, success]);

    useEffect(() => {
        setTimeout(function () {
            setLoading(false);
        }, 250);
    }, []);

    const purchaseHandler = (e) => {
        e.preventDefault();
        Swal.fire({
            title: `ซื้อสินค้า ${clientProduct.name} ?`,
            text: `จำนวน ${quantity} ชิ้น ราคา ${price} บาท`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ตกลง, ซื้อเลย!",
            cancelButtonText: "ยกเลิก",
        }).then((result) => {
            if (result.isConfirmed) {
                purchaseProduct(clientProduct?._id, quantity);
            }
        });
    };

    const text = clientProduct?.description;
    const str = text?.replace(/(?:\r\n|\r|\n)/g, "<br>");

    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-24 md:pt-28 mx-auto items-center">
                {loading ? (
                    <ThreeDotsLoader />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center md:mt-10">
                        <div className="w-full aspect-square relative flex items-center rounded-lg overflow-hidden">
                            <Image
                                alt="product_img"
                                src={clientProduct?.image}
                                unoptimized
                                draggable="false"
                                fill
                                className="select-none object-cover"
                            />
                        </div>
                        <div className="w1/2 flex flex-col mt-6 md:mt-0 md:ml-10 self-start">
                            <h1 className="text-2xl font-bold mb-4">
                                {clientProduct.name}
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
                                            (clientProduct?.stock_count === 0
                                                ? " text-red-600"
                                                : "")
                                        }
                                    >
                                        {clientProduct?.stock_count === 0
                                            ? "สินค้าหมด"
                                            : `เหลือ ${clientProduct?.stock_count} ชิ้น`}
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
                                        disabled={
                                            clientProduct?.stock_count === 0
                                        }
                                        onClick={purchaseHandler}
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
