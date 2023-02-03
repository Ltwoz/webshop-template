import axios from "axios";
import { useState } from "react";
import Select from "../select/select";
import ModalLayout from "./modal-layout/modal-layout";

const UpdateUserModal = ({ user, setIsOpen, setIsUpdated, setError }) => {
    const list = [
        { label: "admin", value: "admin" },
        { label: "member", value: "member" },
    ];

    const [role, setRole] = useState(user?.role);
    const [point, setPoint] = useState(user?.point);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = { headers: { "Content-Type": "application/json" } };

        try {
            const { data } = await axios.put(
                `/api/admin/users/${user?._id}`,
                {
                    role,
                    point: point?.replaceAll(",", ""),
                },
                config
            );
            setIsUpdated(data.success)
        } catch (error) {
            setError(error.message);
            console.error(error.message);
        }

        setIsOpen(false);
    };

    return (
        <ModalLayout>
            <div className="w-full px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">จัดการผู้ใช้</h2>
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
                className="px-6 py-6 w-[95vw] md:w-[35rem] grid grid-cols-2 gap-6"
            >
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold tracking-wide">
                        ชื่อผู้ใช้
                    </label>
                    <input
                        value={user?.username}
                        disabled
                        className="mt-1 p-2 block w-full bg-gray-100 rounded-md border focus:outline-none border-gray-300 shadow-sm md:text-base"
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold tracking-wide">
                        อีเมล
                    </label>
                    <input
                        value={user?.email}
                        disabled
                        className="mt-1 p-2 block w-full bg-gray-100 rounded-md border focus:outline-none border-gray-300 shadow-sm md:text-base"
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold tracking-wide">
                        ตำแหน่ง
                    </label>
                    <Select
                        placeholder="เลือกตำแหน่ง"
                        options={list}
                        selected={role}
                        setSelected={setRole}
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold tracking-wide">
                        พอยต์
                    </label>
                    <input
                        type="text"
                        name="role"
                        id="role"
                        value={point}
                        onChange={(e) => setPoint(e.target.value)}
                        className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                    />
                </div>
            </form>
            <div className="w-full px-6 py-4 flex items-center justify-end gap-x-4">
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center font-medium text-black hover:bg-gray-200/80 py-2 px-4 rounded-md transition-all"
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
                    className="inline-flex items-center font-medium text-white bg-primary hover:brightness-90 py-2 px-4 rounded-md transition-all"
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

export default UpdateUserModal;
