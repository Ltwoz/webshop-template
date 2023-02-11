import { useState } from "react";

const ConfigsPaymentTab = ({ configs, submit }) => {
    const [isTmGift, setIsTmGift] = useState(configs?.payment?.truemoney_gift);
    const [isTmQr, setIsTmQr] = useState(configs?.payment?.truemoney_qr);
    const [isTrueMoney, setIsTrueMoney] = useState(configs?.payment?.truemoney);
    const [isPpQr, setIsPpQr] = useState(configs?.payment?.promptpay_qr);

    const [twPhone, setTwPhone] = useState(configs?.payment?.truemoney_phone);

    const handleSubmit = (e) => {
        e.preventDefault();

        submit({
            payment: {
                truemoney_gift: isTmGift,
                truemoney_qr: isTmQr,
                truemoney: isTrueMoney,
                promptpay_qr: isPpQr,
                truemoney_phone: twPhone,
            },
        });
    };

    return (
        <div id="payment-config" className="grid grid-cols-2 gap-6 p-6">
            <div className="col-span-2">
                <h3 className="text-lg font-medium leading-6">
                    ตั้งค่าระบบเติมเงิน
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                    แก้ไขรายละเอียดการเติมเงิน และเลือกใช้วิธีชำระเงินที่ต้องการ
                </p>
            </div>

            <hr className="col-span-2" />

            <div className="col-span-2">
                <h3 className="text-lg font-medium leading-6">
                    TrueMoney Wallet Gift
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                    เติมเงินด้วยระบบ TrueMoney Wallet Gift
                </p>
            </div>
            <div className="col-span-2 flex items-center justify-between gap-x-4">
                <div className="col-span-2">
                    <h2 className="text-base font-medium leading-6">สถานะ</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        กำหนดสถานะของระบบ TrueMoney Wallet Gift
                    </p>
                </div>
                <label className="inline-flex relative items-center">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isTmGift}
                        readOnly
                    />
                    <div
                        onClick={() => {
                            setIsTmGift(!isTmGift);
                        }}
                        className="w-11 h-6 cursor-pointer bg-gray-300 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                    />
                </label>
            </div>
            <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium tracking-wide">
                    เบอร์โทรศัพท์
                </label>
                <input
                    type="tel"
                    name="twPhone"
                    id="twPhone"
                    value={twPhone}
                    onChange={(e) => setTwPhone(e.target.value)}
                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                />
            </div>
            <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium tracking-wide">
                    ค่าธรรมเนียม
                </label>
                <input
                    type="tel"
                    name="twPhone"
                    id="twPhone"
                    value={twPhone}
                    onChange={(e) => setTwPhone(e.target.value)}
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

            {/* <hr className="col-span-2" />

            <div className="col-span-2">
                <h3 className="text-lg font-medium leading-6">
                    TrueMoney Wallet QR
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                    เติมเงินด้วยระบบ TrueMoney Wallet QR
                </p>
            </div>
            <div className="col-span-2 flex items-center justify-between gap-x-4">
                <div className="col-span-2">
                    <h2 className="text-base font-medium leading-6">สถานะ</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        กำหนดสถานะของระบบ TrueMoney Wallet QR
                    </p>
                </div>
                <label className="inline-flex relative items-center">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isTmQr}
                        readOnly
                    />
                    <div
                        onClick={() => {
                            setIsTmQr(!isTmQr);
                        }}
                        className="w-11 h-6 cursor-pointer bg-gray-300 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                    />
                </label>
            </div>

            <hr className="col-span-2" />

            <div className="col-span-2">
                <h3 className="text-lg font-medium leading-6">
                    TrueMoney Cash Card
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                    เติมเงินด้วยบัตรเงินสด TrueMoney Cash Card
                </p>
            </div>
            <div className="col-span-2 flex items-center justify-between gap-x-4">
                <div className="col-span-2">
                    <h2 className="text-base font-medium leading-6">สถานะ</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        กำหนดสถานะของระบบบัตรเงินสด TrueMoney Cash Card
                    </p>
                </div>
                <label className="inline-flex relative items-center">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isTrueMoney}
                        readOnly
                    />
                    <div
                        onClick={() => {
                            setIsTrueMoney(!isTrueMoney);
                        }}
                        className="w-11 h-6 cursor-pointer bg-gray-300 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                    />
                </label>
            </div> */}
        </div>
    );
};

export default ConfigsPaymentTab;
