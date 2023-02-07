import { useContext, useEffect, useState } from "react";
import CategoryContext from "../../../contexts/category/category-context";
import ModalLayout from "./modal-layout/modal-layout";

const UpdateCategoryModal = ({ category, setIsOpen }) => {
    const { updateCategory } = useContext(CategoryContext);

    const [name, setName] = useState(category.name);
    const [description, setDescription] = useState(category.description);
    const [type, setType] = useState(category.type);
    const [image, setImage] = useState(category.image);

    const handleSubmit = (e) => {
        e.preventDefault();

        updateCategory(category._id, {
            name: name,
            description: description,
            image: image,
        });
        setIsOpen(false);
    };

    return (
        <ModalLayout>
            <div className="w-full px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">แก้ไขหมวดหมู่</h2>
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
                onSubmit={handleSubmit}
                className="px-6 py-4 w-[95vw] md:w-[25rem] grid grid-cols-3 gap-6"
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
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <label
                        htmlFor="image"
                        className="block text-sm font-medium tracking-wide"
                    >
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
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span className="block">บันทึก</span>
                    </div>
                </button>
            </div>
        </ModalLayout>
    );
};

export default UpdateCategoryModal;
