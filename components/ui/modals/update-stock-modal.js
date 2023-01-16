import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Swal from "sweetalert2";
import ProductContext from "../../../contexts/product/product-context";
import { UPDATE_STOCK_RESET } from "../../../types/product-constants";

const UpdateStockModal = ({ product, setIsStockModalOpen }) => {
    const {
        updateStock,
        clearErrors,
        loading,
        error,
        success,
        isUpdated,
        dispatch,
    } = useContext(ProductContext);

    const [stocks, setStocks] = useState(product.stock);

    useEffect(() => {
        if (error) {
            Swal.fire({
                title: "เกิดข้อผิดพลาด",
                text: error,
                icon: "error",
            });
            clearErrors();
        }

        if (isUpdated === true) {
            Swal.fire({
                title: "แก้ไขสต็อกแล้ว",
                text: "",
                icon: "success",
            });
            dispatch({ type: UPDATE_STOCK_RESET });
        }
    }, [clearErrors, dispatch, error, isUpdated]);

    const handleTextareaChange = (e) => {
        const text = e.target.value;
        const newStockArray = text.split("\n").filter(text => text.trim().length > 0);
        setStocks(newStockArray);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        updateStock(product._id, {stock: stocks});
        setIsStockModalOpen(false);
    };

    return (
        <>
            {createPortal(
                <div className="z-[99] flex justify-center items-center fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-black opacity-50" />
                    <div
                        className="modalContent z-10 flex justify-center items-center flex-col max-h-[calc(100vh-100px)] overflow-y-auto bg-white shadow-md rounded-lg divide-y"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-full px-6 py-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold">
                                แก้ไขสต็อก
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsStockModalOpen(false)}
                                className="inline-flex items-center font-medium text-black py-2 rounded-md transition-all hover:scale-125"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2.5"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <form
                            autoComplete="off"
                            className="px-6 py-6 w-[30rem] flex flex-col gap-4"
                        >
                            <div className="col-span-6 md:col-span-3">
                                <label className="block text-sm font-medium tracking-wide">
                                    ข้อมูลสต็อก {product.name}
                                </label>
                                <textarea
                                    type="text"
                                    id="name"
                                    rows={8}
                                    defaultValue={stocks.join("\n")}
                                    onChange={handleTextareaChange}
                                    className="mt-1 p-2 block w-full min-h-[138px] max-h-[594px] rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                                />
                            </div>
                        </form>
                        <div className="w-full px-6 py-4 flex items-center justify-end gap-x-4">
                            <button
                                type="button"
                                onClick={() => setIsStockModalOpen(false)}
                                className="inline-flex items-center font-medium text-black hover:bg-gray-200/80 py-2 px-4 rounded-md transition-all hover:scale-105"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-5 h-5 mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>ยกเลิก</span>
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="inline-flex items-center font-medium text-white bg-primary hover:bg-violet-700 py-2 px-4 rounded-md transition-all hover:scale-105"
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
                                <span>บันทึก</span>
                            </button>
                        </div>
                    </div>
                </div>,
                document.getElementById("modals")
            )}
        </>
    );
};

export default UpdateStockModal;
