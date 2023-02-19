import axios from "axios";
import { FaGift } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useToast } from "../../contexts/toast/toast-context";

const TrueMoneyGiftTab = () => {
    const [url, setUrl] = useState("");

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

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

        if (success) {
            toast.add({
                title: "สำเร็จ!",
                text: "เพิ่มสินค้าแล้ว",
                icon: "success",
            });
            setSuccess(false);
        }
    }, [error, success, toast]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!url) {
                setError("ยังไม่ได้ใส่ลิงก์ซองของขวัญ");
                return;
            }

            const config = { headers: { "Content-Type": "application/json" } };

            const { data } = await axios.post(
                "/api/topup/truemoney-gift",
                {
                    phone: "0654291925",
                    gift_url: url,
                },
                config
            );
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div id="general-config" className="grid grid-cols-2 gap-6 p-6">
            <div className="col-span-2">
                <h3 className="text-lg font-medium leading-6">
                    Truemoney Wallet Gift
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                    เติมเงินด้วย TrueMoney Wallet Gift
                </p>
            </div>

            <hr className="col-span-2" />

            <div className="col-span-2">
                <label className="block text-sm font-medium tracking-wide">
                    ลิงก์ซองของขวัญ
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none opacity-40">
                        <FaGift />
                    </div>
                    <input
                        type="url"
                        placeholder="กรอกลิงก์ซองของขวัญ"
                        autoComplete="off"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="pl-[44px] mt-1 py-2 px-4 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                    />
                </div>
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
                        <span className="block">เติมเงิน</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default TrueMoneyGiftTab;
