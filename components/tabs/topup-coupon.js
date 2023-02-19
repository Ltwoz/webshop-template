import axios from "axios";
import { FaGift } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useToast } from "../../contexts/toast/toast-context";
import refreshSession from "../../utils/refresh-session";

const RedeemCouponTab = () => {
    const [code, setCode] = useState("");
    const [redeemed, setRedeemed] = useState({});

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
                text: `แลกคูปองแล้ว ได้รับ ${redeemed.amount} พอยต์`,
                icon: "success",
            });
            setSuccess(false);
        }
    }, [error, redeemed.amount, success, toast]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!code) {
                setError("ยังไม่ได้ใส่ลิงก์ซองของขวัญ");
                return;
            }

            const config = { headers: { "Content-Type": "application/json" } };

            const { data } = await axios.post(
                "/api/coupons/redeem",
                {
                    code
                },
                config
            );

            setRedeemed(data.topup)

            await refreshSession();
            
            setCode("");
            setSuccess(data.success);
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message);
        }
    };

    return (
        <div id="general-config" className="grid grid-cols-2 gap-6 p-6">
            <div className="col-span-2">
                <h3 className="text-lg font-medium leading-6">
                    Redeem Coupon Code
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                    แลกคูปองที่ได้จากร้านค้าเพื่อรับพอยต์
                </p>
            </div>

            <hr className="col-span-2" />

            <div className="col-span-2">
                <label className="block text-sm font-medium tracking-wide">
                    โค้ดคูปอง
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none opacity-40">
                        <FaGift />
                    </div>
                    <input
                        type="text"
                        placeholder="กรอกโค้ดคูปอง"
                        autoComplete="off"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
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
                        <span className="block">แลกคูปอง</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default RedeemCouponTab;
