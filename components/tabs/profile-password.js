import axios from "axios";
import { useState, useEffect } from "react";
import { useToast } from "../../contexts/toast/toast-context";
import refreshSession from "../../utils/refresh-session";

const ProfilePasswordTab = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setComfirmPassword] = useState("");

    const [isUpdated, setIsUpdated] = useState(false);
    const [error, setError] = useState(null);

    const toast = useToast();

    useEffect(() => {
        if (error) {
            toast.add({
                title: "ผิดพลาด!",
                text: error,
                icon: "error",
            });
            setError(null);
        }

        if (isUpdated) {
            toast.add({
                title: "สำเร็จ!",
                text: "เปลี่ยนรหัสผ่านแล้ว",
                icon: "success",
            });

            setIsUpdated(false);
        }
    }, [error, isUpdated, toast]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!oldPassword || !newPassword || !confirmPassword) {
            return setError("กรุณากรอกให้ครบก่อนยืนยัน")
        }

        if (newPassword.length < 8) {
            return setError("รหัสผ่านจำเป็นต้องใส่อย่างน้อย 8 ตัว")
        }

        if (oldPassword === newPassword) {
            return setError("ไม่สามารถใช้รหัสผ่านปัจจุบัน")
        }

        const config = { headers: { "Content-Type": "application/json" } };

        try {
            const { data } = await axios.put(
                `/api/password/update`,
                {
                    oldPassword,
                    newPassword,
                    confirmPassword,
                },
                config
            );

            setIsUpdated(data.success);

            await refreshSession();

            setOldPassword("");
            setNewPassword("");
            setComfirmPassword("");
        } catch (error) {
            setError(error.response.data.message);
            console.error(error.response.data.message);
        }
    };

    return (
        <div id="general-config" className="grid grid-cols-2 gap-6 p-6">
            <div className="col-span-2">
                <h3 className="text-lg font-medium leading-6">
                    เปลี่ยนรหัสผ่าน
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                    เปลี่ยนรหัสผ่านของคุณ
                </p>
            </div>

            <hr className="col-span-2" />

            <div className="col-span-2">
                <label className="block text-sm font-medium tracking-wide">
                    รหัสผ่านปัจจุบัน
                </label>
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                />
            </div>
            <div className="col-span-2">
                <label className="block text-sm font-medium tracking-wide">
                    รหัสผ่านใหม่
                </label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                />
            </div>
            <div className="col-span-2">
                <label className="block text-sm font-medium tracking-wide">
                    ยืนยันรหัสผ่านใหม่
                </label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setComfirmPassword(e.target.value)}
                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                />
            </div>

            <hr className="col-span-2" />

            <div className="col-span-2 flex items-center justify-end gap-x-4">
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
        </div>
    );
};

export default ProfilePasswordTab;
