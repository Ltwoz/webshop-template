import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import CategoryContext from "../../../contexts/category/category-context";
import ProductContext from "../../../contexts/product/product-context";
import ModalLayout from "./modal-layout/modal-layout";

const NewProductModal = ({ setIsOpen }) => {
    const router = useRouter();
    const cid = router.query.cid;

    const { createProduct } = useContext(ProductContext);

    const { getAdminDetailsCategory, category } = useContext(CategoryContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [isFeatured, setIsFeatured] = useState(false);

    useEffect(() => {
        getAdminDetailsCategory(cid);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cid]);

    const handleSubmit = (e) => {
        e.preventDefault();

        createProduct({
            name: name,
            description: description,
            price: price,
            category: category._id,
            type: category.type,
            image: image,
            isFeatured: isFeatured,
        });
        setIsOpen(false);
    };

    return (
        <ModalLayout>
            <div className="w-full px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">เพิ่มสินค้าใหม่</h2>
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
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
                className="px-6 py-6 w-[95vw] md:w-[40rem] grid grid-cols-6 gap-6"
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
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <label className="block text-sm font-medium tracking-wide">
                        หมวดหมู่
                    </label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        readOnly
                        value={category.name}
                        className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
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
                {category?.type === "STOCK" && (
                    <div className="col-span-6 md:col-span-3">
                        <label className="inline-flex relative items-center">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={isFeatured}
                                readOnly
                            />
                            <div
                                onClick={() => {
                                    setIsFeatured(!isFeatured);
                                }}
                                className="w-11 h-6 cursor-pointer bg-gray-300 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                            ></div>
                            <span className="ml-4 text-base font-medium text-gray-900">
                                แสดงสินค้าในหน้าหลัก
                            </span>
                        </label>
                    </div>
                )}
            </form>
            <div className="w-full px-6 py-4 flex items-center justify-end gap-x-4">
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center font-medium border hover:bg-gray-100/80 py-2 px-2 md:px-4 rounded-md transition-all"
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
                    <span className="block">ยกเลิก</span>
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
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
                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span className="block">เพิ่ม</span>
                    </div>
                </button>
            </div>
        </ModalLayout>
    );
};

export default NewProductModal;
