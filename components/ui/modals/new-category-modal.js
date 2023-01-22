import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Select from "react-select";
import CategoryContext from "../../../contexts/category/category-context";
import Swal from "sweetalert2";
import { NEW_CATEGORY_RESET } from "../../../types/category-constants";
import { colourStyles } from "../../../styles/select-style";

const typeOptions = [
    { value: "STOCK", label: "Stock" },
    { value: "ID_PASS", label: "ID/Pass" },
];

const NewCategoryModal = ({ setIsNewModalOpen }) => {
    const { createCategory, clearErrors, loading, error, success, dispatch } =
        useContext(CategoryContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState("");

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
    }, [clearErrors, dispatch, error, success]);

    const handleSubmit = (e) => {
        e.preventDefault();

        createCategory({
            name: name,
            description: description,
            type: type,
            image: image,
        });
        setIsNewModalOpen(false);
    };

    return (
        <>
            {createPortal(
                <div
                    className="z-[99] flex justify-center items-center fixed inset-0 transition-opacity"
                >
                    <div className="absolute inset-0 bg-black opacity-50" />
                    <div
                        className="modalContent z-10 flex md:justify-center items-center flex-col max-h-[calc(100vh-100px)] overflow-y-auto bg-white shadow-md rounded-lg divide-y"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-full px-6 py-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold">
                                สร้างหมวดหมู่ใหม่
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsNewModalOpen(false)}
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
                            onSubmit={handleSubmit}
                            className="px-6 py-4 w-[95vw] md:w-[25rem] grid grid-cols-3 gap-6"
                        >
                            <div className="col-span-6 md:col-span-3">
                                <label className="block text-sm font-medium tracking-wide">
                                    ชื่อหมวดหมู่
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-6 md:col-span-3">
                                <label className="block text-sm font-medium tracking-wide">
                                    รายละเอียด
                                </label>
                                <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-6 md:col-span-3">
                                <label className="block text-sm font-medium tracking-wide">
                                    ประเภท
                                </label>
                                <Select
                                    options={typeOptions}
                                    styles={colourStyles}
                                    onChange={(e) => setType(e.value)}
                                />
                            </div>
                            <div className="col-span-6 md:col-span-3">
                                <label className="block text-sm font-medium tracking-wide">
                                    รูปภาพ (348x200)
                                </label>
                                <input
                                    type="text"
                                    name="image"
                                    id="image"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex items-center font-medium text-white bg-primary hover:bg-violet-700 py-2 px-4 rounded-md transition-all hover:scale-105"
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
                                <span>สร้าง</span>
                            </button>
                        </form>
                    </div>
                </div>,
                document.getElementById("modals")
            )}
        </>
    );
};

export default NewCategoryModal;
