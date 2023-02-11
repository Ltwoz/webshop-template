import { useState } from "react";

const ConfigsGeneralTab = ({ configs, submit }) => {
    const [title, setTitle] = useState(configs?.website_title);
    const [name, setName] = useState(configs?.website_name);
    const [desc, setDesc] = useState(configs?.website_desc);
    const [icon, setIcon] = useState(configs?.website_icon);
    const [logo, setLogo] = useState(configs?.website_logo);
    const [ogImage, setOgImage] = useState(configs?.og_image);
    const [announcement, setAnnouncement] = useState(configs?.announcement);

    const [discord, setDiscord] = useState(configs?.social?.discord_url);
    const [facebook, setFacebook] = useState(configs?.social?.facebook_url);

    const handleSubmit = (e) => {
        e.preventDefault();

        submit({
            website_title: title,
            website_name: name,
            website_desc: desc,
            website_icon: icon,
            website_logo: logo,
            og_image: ogImage,
            announcement: announcement,
            social: {
                discord_url: discord,
                facebook_url: facebook,
            },
        });
    };

    return (
        <div id="general-config" className="grid grid-cols-2 gap-6 p-6">
            <div className="col-span-2">
                <h3 className="text-lg font-medium leading-6">
                    ตั้งค่าเว็บไซต์
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                    แก้ไขข้อมูลเว็บไซต์ รวมถึงรายละเอียดร้านค้า
                </p>
            </div>

            <hr className="col-span-2" />

            <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium tracking-wide">
                    ชื่อเว็บไซต์
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                />
            </div>
            <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium tracking-wide">
                    ชื่อเว็บไซต์ (ย่อ)
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                />
            </div>
            <div className="col-span-2">
                <label className="block text-sm font-medium tracking-wide">
                    คำอธิบาย
                </label>
                <textarea
                    type="text"
                    placeholder="คำอธิบายเนื้อหาของร้านค้า โดยข้อมูลนี้จะแสดงบนหน้าผลการค้นหาใน Search Engine"
                    rows="4"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="mt-1 p-2 block w-full min-h-[42px] max-h-[210px] rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                />
            </div>
            <div className="col-span-2">
                <label className="block text-sm font-medium tracking-wide">
                    ไอคอนเว็บไซต์ (16x16)
                </label>
                <input
                    type="text"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                />
            </div>
            <div className="col-span-2">
                <label className="block text-sm font-medium tracking-wide">
                    โลโก้เว็บไซต์ (40x40)
                </label>
                <input
                    type="text"
                    placeholder=""
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                />
            </div>
            <div className="col-span-2">
                <label className="block text-sm font-medium tracking-wide">
                    ภาพประกอบ (1200x628)
                </label>
                <input
                    type="text"
                    placeholder="ภาพที่แสดงในลิงก์ที่ถูกแชร์"
                    value={ogImage}
                    onChange={(e) => setOgImage(e.target.value)}
                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                />
            </div>

            <hr className="col-span-2" />

            <div className="col-span-2">
                <h3 className="text-lg font-medium leading-6">การประกาศ</h3>
                <p className="mt-1 text-sm text-gray-600">
                    ข้อความประกาศที่แสดงในหน้าแรก
                </p>
            </div>
            <div className="col-span-2">
                <label className="block text-sm font-medium tracking-wide">
                    ประกาศ
                </label>
                <input
                    type="text"
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                />
            </div>

            <hr className="col-span-2" />

            <div className="col-span-2">
                <h3 className="text-lg font-medium leading-6">ช่องทางติดต่อ</h3>
                <p className="mt-1 text-sm text-gray-600">
                    ลิงก์ไปยังเพจร้านค้าของคุณ
                </p>
            </div>
            <div className="col-span-2">
                <label className="block text-sm font-medium tracking-wide">
                    Discord URL
                </label>
                <input
                    type="text"
                    value={discord}
                    onChange={(e) => setDiscord(e.target.value)}
                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                />
            </div>
            <div className="col-span-2">
                <label className="block text-sm font-medium tracking-wide">
                    Facebook URL
                </label>
                <input
                    type="text"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
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

export default ConfigsGeneralTab;
