import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Select from "react-select";
import CategoryContext from "../../../contexts/category/category-context";
import Swal from "sweetalert2";
import { UPDATE_CATEGORY_RESET } from "../../../types/category-constants";

const typeOptions = [
    { value: "STOCK", label: "Stock" },
    { value: "ID_PASS", label: "ID/Pass" },
];

const UpdateCategoryModal = ({ category, setIsUpdateModalOpen }) => {
    const {
        updateCategory,
        clearErrors,
        loading,
        error,
        success,
        isUpdated,
        dispatch,
    } = useContext(CategoryContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    const [slug, setSlug] = useState("");

    useEffect(() => {
        setName(category.name);
        setDescription(category.description);
        setType(category.type);
        setImage(category.image);
        setSlug(category.slug);
    }, [
        category.description,
        category.image,
        category.name,
        category.slug,
        category.type,
    ]);

    useEffect(() => {
        if (error) {
            Swal.fire({
                title: "เกิดข้อผิดพลาด",
                text: error,
                icon: "error",
            });
            clearErrors();
        }

        if (isUpdated) {
            Swal.fire({
                title: "แก้ไขหมวดหมู่แล้ว",
                text: "",
                icon: "success",
            });
            dispatch({ type: UPDATE_CATEGORY_RESET });
        }
    }, [clearErrors, dispatch, error, isUpdated]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newForm = new FormData();

        newForm.set("name", name);
        newForm.set("description", description);
        newForm.set("type", type);
        newForm.set("image", image);
        newForm.set("slug", slug);

        updateCategory(category._id, newForm);
        setIsUpdateModalOpen(false);
    };

    return (
        <>
            {createPortal(
                <div
                    className="z-[99] flex justify-center items-center fixed inset-0 transition-opacity"
                >
                    <div className="absolute inset-0 bg-black opacity-50" />
                    <div
                        className="modalContent z-10 flex justify-center items-center flex-col max-h-[calc(100vh-100px)] overflow-y-auto bg-white shadow-md rounded-lg divide-y"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-full px-6 py-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold">
                                แก้ไขหมวดหมู่
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsUpdateModalOpen(false)}
                                className="inline-flex items-center font-medium text-black py-2 rounded-md transition-all hover:scale-125"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="2.5"
                                    stroke="currentColor"
                                    class="w-5 h-5"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <form
                            autoComplete="off"
                            onSubmit={handleSubmit}
                            className="px-6 py-4 grid grid-cols-3 gap-6"
                        >
                            <div className="col-span-6 md:col-span-3">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium tracking-wide"
                                >
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
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium tracking-wide"
                                >
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
                                <label
                                    htmlFor="type"
                                    className="block text-sm font-medium tracking-wide"
                                >
                                    ประเภท
                                </label>
                                <Select
                                    options={typeOptions}
                                    value={{
                                        value: type,
                                        label:
                                            type === "STOCK"
                                                ? "Stock"
                                                : "ID/Pass",
                                    }}
                                    onChange={(e) => setType(e.value)}
                                />
                            </div>
                            <div className="col-span-6 md:col-span-3">
                                <label
                                    htmlFor="image"
                                    className="block text-sm font-medium tracking-wide"
                                >
                                    รูปภาพ
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
                            <div className="col-span-6 md:col-span-3">
                                <label
                                    htmlFor="slug"
                                    className="block text-sm font-medium tracking-wide"
                                >
                                    Slug ( ชื่อลิ้งค์ )
                                </label>
                                <input
                                    type="text"
                                    name="slug"
                                    id="slug"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
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
                        </form>
                    </div>
                </div>,
                document.getElementById("modals")
            )}
        </>
    );
};

export default UpdateCategoryModal;
