import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import CategoryContext from "../../../contexts/category/category-context";
import ProductContext from "../../../contexts/product/product-context";
import { colourStyles } from "../../../styles/select-style";
import { UPDATE_PRODUCT_RESET } from "../../../types/product-constants";

const typeOptions = [
    { value: "STOCK", label: "Stock" },
    { value: "ID_PASS", label: "ID/Pass" },
];

const UpdateProductModal = ({ product, setIsUpdateModalOpen }) => {
    const { updateProduct, clearErrors, loading, error, success, isUpdated, dispatch } =
        useContext(ProductContext);

    const { getAdminCategories, categories } = useContext(CategoryContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    const [slug, setSlug] = useState("");

    const [categoryOptions, setCategoryOptions] = useState([]);

    useEffect(() => {
        getAdminCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const categoryObj = categories.map((category) => {
            return { value: category._id, label: category.name };
        });
        setCategoryOptions(categoryObj);
    }, [categories]);

    useEffect(() => {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category?._id);
        setCategoryName(product.category?.name);
        setType(product.type);
        setImage(product.image);
        setSlug(product.slug);
    }, [
        product.category?._id,
        product.category?.name,
        product.description,
        product.image,
        product.name,
        product.price,
        product.slug,
        product.type,
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

        if (isUpdated === true) {
            Swal.fire({
                title: "แก้ไขสินค้าแล้ว",
                text: "",
                icon: "success",
            });
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [clearErrors, dispatch, error, isUpdated]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newForm = new FormData();

        newForm.set("name", name);
        newForm.set("description", description);
        newForm.set("price", price);
        newForm.set("category", category);
        newForm.set("type", type);
        newForm.set("image", image);
        newForm.set("slug", slug);

        updateProduct(product._id, newForm);
        setIsUpdateModalOpen(false);
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
                                แก้ไขสินค้า {product.name}
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
                            className="px-6 py-4 grid grid-cols-6 gap-6"
                        >
                            <div className="col-span-6 md:col-span-3">
                                <label className="block text-sm font-medium tracking-wide">
                                    ชื่อสินค้า
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
                                    ราคา
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-6 md:col-span-6">
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
                                    หมวดหมู่
                                </label>
                                <Select
                                    options={categoryOptions}
                                    className="mt-1"
                                    placeholder={'เลือกหมวดหมู่'}
                                    styles={colourStyles}
                                    value={{
                                        value: category,
                                        label: categoryName,
                                    }}
                                    onChange={(e) => {
                                        setCategory(e.value);
                                        setCategoryName(e.label);
                                    }}
                                />
                            </div>
                            <div className="col-span-6 md:col-span-3">
                                <label className="block text-sm font-medium tracking-wide">
                                    ประเภท
                                </label>
                                <Select
                                    options={typeOptions}
                                    className="mt-1"
                                    placeholder={'เลือกประเภท'}
                                    styles={colourStyles}
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
                                <label className="block text-sm font-medium tracking-wide">
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
                                <label className="block text-sm font-medium tracking-wide">
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

export default UpdateProductModal;
