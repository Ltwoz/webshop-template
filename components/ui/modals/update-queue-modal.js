import { useState } from "react";
import Select from "../select/select";
import ModalLayout from "./modal-layout/modal-layout";

const UpdateQueueModal = ({ queue, setIsOpen }) => {
    const list = [
        { name: "กำลังดำเนินการ" },
        { name: "สำเร็จ" },
        { name: "ไม่สำเร็จ" },
        { name: "ยกเลิก" },
    ];

    const [status, setStatus] = useState(queue?.status);
    const [note, setNote] = useState(queue?.note);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsOpen(false);
    };

    const copyToClipboard = async (e) => {
        e.preventDefault();

        await navigator.clipboard.writeText(e.target.value);
    };

    return (
        <ModalLayout>
            <div className="w-full px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">แก้ไขคิว</h2>
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
                className="px-6 py-6 w-[95vw] md:w-[25rem] grid grid-cols-3 gap-6"
            >
                <div className="col-span-3">
                    <label className="block text-sm font-bold tracking-wide">
                        ชื่อสินค้า
                    </label>
                    <input
                        value={queue?.product_name}
                        disabled
                        className="mt-1 p-2 block w-full bg-gray-100 rounded-md border focus:outline-none border-gray-300 shadow-sm md:text-base"
                    />
                </div>
                {queue?.form?.uid ? (
                    <div className="col-span-3">
                        <label className="block text-sm font-bold tracking-wide">
                            UID
                        </label>
                        <input
                            value={queue?.form?.uid}
                            readOnly
                            onClick={copyToClipboard}
                            className="mt-1 p-2 block w-full bg-gray-100 rounded-md border focus:outline-none border-gray-300 shadow-sm md:text-base cursor-pointer"
                        />
                    </div>
                ) : (
                    <>
                        <div className="col-span-3">
                            <label className="block text-sm font-bold tracking-wide">
                                Username
                            </label>
                            <input
                                value={queue?.form?.username}
                                readOnly
                                onClick={copyToClipboard}
                                className="mt-1 p-2 block w-full bg-gray-100 rounded-md border focus:outline-none border-gray-300 shadow-sm md:text-base cursor-pointer"
                            />
                        </div>
                        <div className="col-span-3">
                            <label className="block text-sm font-bold tracking-wide">
                                Password
                            </label>
                            <input
                                value={queue?.form?.password}
                                readOnly
                                onClick={copyToClipboard}
                                className="mt-1 p-2 block w-full bg-gray-100 rounded-md border focus:outline-none border-gray-300 shadow-sm md:text-base cursor-pointer"
                            />
                        </div>
                    </>
                )}

                <div className="col-span-3">
                    <label className="block text-sm font-bold tracking-wide">
                        สถานะ
                    </label>
                    <Select
                        placeholder="เลือกสถานะ"
                        list={list}
                        selected={status}
                        setSelected={setStatus}
                    />
                </div>
                <div className="col-span-3">
                    <label className="block text-sm font-bold tracking-wide">
                        หมายเหตุ
                    </label>
                    <input
                        type="text"
                        name="note"
                        id="note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                    />
                </div>
            </form>
            <div className="w-full px-6 py-4 flex items-center justify-end gap-x-4">
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
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
        </ModalLayout>
    );
};

export default UpdateQueueModal;
