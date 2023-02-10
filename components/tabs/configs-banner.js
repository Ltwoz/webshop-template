import Image from "next/image";
import { useState } from "react";

const ConfigsBannerTab = ({ configs, submit }) => {
    const [banner, setBanner] = useState(configs?.website_banner);

    const handleSubmit = (e) => {
        e.preventDefault();

        submit({
            website_banner: banner,
        });
    };

    return (
        <div id="banner-config" className="grid grid-cols-2 gap-6 p-6">
            <div className="col-span-2">
                <h3 className="text-lg font-medium leading-6">
                    ตั้งค่าแบนเนอร์
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                    จัดการแบนเนอร์ ที่แสดงในหน้าแรกของเว็บไซต์
                </p>
            </div>

            <hr className="col-span-2" />

            <div className="col-span-2">
                <label className="block text-sm font-medium tracking-wide">
                    แบนเนอร์เว็บไซต์ (1100x240)
                </label>
                <input
                    type="text"
                    placeholder="ลิงก์ภาพจากดิสคอร์ด"
                    value={banner}
                    onChange={(e) => setBanner(e.target.value)}
                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                />
            </div>
            <div className="col-span-2 aspect-[16/5] md:aspect-[16/3.5] relative overflow-hidden rounded-lg">
                <Image
                    alt="banner"
                    src={banner || "https://dummyimage.com/1100x240"}
                    draggable="false"
                    fill
                    className="select-none object-cover"
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

export default ConfigsBannerTab;
