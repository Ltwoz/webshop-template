import Image from "next/image";
import { useState } from "react";
import { PopoverPicker } from "../ui/picker/popover-picker";

const ConfigsAppearanceTab = ({ configs, submit }) => {
    const [primaryColor, setPrimaryColor] = useState(
        configs?.style?.primary_color
    );
    const [bgImage, setBgImage] = useState(configs?.style?.background_image);
    const [bgColor, setBgColor] = useState(configs?.style?.background_color);

    const handleSubmit = (e) => {
        e.preventDefault();

        submit({
            style: {
                primary_color: primaryColor,
                background_image: bgImage,
                background_color: bgColor,
            },
        });
    };

    return (
        <div id="payment-config" className="grid grid-cols-2 gap-6 p-6">
            <div className="col-span-2">
                <h3 className="text-lg font-medium leading-6">
                    ปรับแต่งเว็บไซต์
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                    ปรับแต่งสีสันของเว็บไซต์ในแบบของคุณ
                </p>
            </div>

            <hr className="col-span-2" />

            <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium tracking-wide">
                    สีหลัก
                </label>
                <div className="mt-1">
                    <PopoverPicker
                        color={primaryColor}
                        onChange={setPrimaryColor}
                        type="hex"
                    />
                </div>
            </div>
            <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium tracking-wide">
                    สีพื้นหลัง
                </label>
                <div className="mt-1">
                    <PopoverPicker
                        color={bgColor}
                        onChange={setBgColor}
                        type="hexAlpha"
                    />
                </div>
            </div>
            <div className="col-span-2">
                <label className="block text-sm font-medium tracking-wide">
                    ภาพพื้นหลัง (1920x1080)
                </label>
                <input
                    type="text"
                    placeholder="ลิงก์ภาพจากดิสคอร์ด"
                    value={bgImage}
                    onChange={(e) => setBgImage(e.target.value)}
                    className="mt-1 p-2 h-10 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                />
            </div>
            <div className="col-span-2">
                <div className="aspect-[16/9] border border-gray-300 relative overflow-hidden rounded-lg">
                    <Image
                        alt="background-image"
                        src={
                            bgImage ||
                            "https://cdn.discordapp.com/attachments/829046235527905334/1073653245622374533/HD_transparent_picture.png"
                        }
                        draggable="false"
                        fill
                        className="select-none object-cover"
                    />
                    <div
                        className="h-full w-full z-10 absolute"
                        style={{ backgroundColor: bgColor }}
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
                        <span className="block">บันทึก</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ConfigsAppearanceTab;
