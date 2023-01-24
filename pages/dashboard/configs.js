import DashboardNavbar from "../../components/layouts/dashboard-navbar";
import Layout from "../../components/layouts/main-layout";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import ConfigContext from "../../contexts/config/config-context";
import { UPDATE_CONFIG_RESET } from "../../types/config-constants";

const AdminConfig = () => {
    const router = useRouter();
    const {
        updateConfig,
        clearErrors,
        configs,
        error,
        isUpdated,
        dispatch,
    } = useContext(ConfigContext);

    const [title, setTitle] = useState(configs?.website_title);
    const [name, setName] = useState(configs?.website_name);
    const [desc, setDesc] = useState(configs?.website_desc);
    const [icon, setIcon] = useState(configs?.website_icon);
    const [logo, setLogo] = useState(configs?.website_logo);
    const [banner, setBanner] = useState(configs?.website_banner);
    const [announcement, setAnnouncement] = useState(configs?.announcement);
    const [twPhone, setTwPhone] = useState(configs?.payment_tw_phone);

    useEffect(() => {
        if (error) {
            Swal.fire({
                title: "เกิดข้อผิดพลาด",
                text: error,
                icon: "error",
            });
            clearErrors();
        }

        if (isUpdated) {
            Swal.fire({
                title: "บันทึกสำเร็จ",
                text: "",
                icon: "success",
            }).then(() => {
                router.reload();
            })
            
            dispatch({ type: UPDATE_CONFIG_RESET });
        }
    }, [clearErrors, dispatch, error, isUpdated, router]);

    const handleSave = (e) => {
        e.preventDefault();
        
        updateConfig({
            website_title: title,
            website_name: name,
            website_desc: desc,
            website_icon: icon,
            website_logo: logo,
            website_banner: banner,
            announcement: announcement,
            payment_tw_phone: twPhone
        });
    };

    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-20 md:pt-28 mx-auto items-center">
                <section id="header" className="md:hidden border-b-2 mx-8 py-4 mb-6">
                    <h1 className="text-4xl font-semibold text-center">
                        จัดการเว็บไซต์
                    </h1>
                </section>
                <DashboardNavbar />
                <section className="flex flex-col md:flex-row">
                    <form
                        id="left"
                        autoComplete="off"
                        onSubmit={handleSave}
                        className="w-full md:w-2/4 mr-6 bg-white border rounded-md shadow mb-6 divide-y"
                    >
                        <div className="p-6 flex items-center justify-between">
                            <h2 className="text-lg font-semibold">
                                ตั้งค่าทั่วไป
                            </h2>
                            <button
                                type="submit"
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
                        <div
                            id="config-main"
                            className="grid grid-cols-6 gap-6 p-6"
                        >
                            <div className="col-span-6 md:col-span-3">
                                <label
                                    className="block text-sm font-medium tracking-wide"
                                >
                                    ชื่อเว็บไซต์
                                </label>
                                <input
                                    type="text"
                                    name="website-title"
                                    id="website-title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-6 md:col-span-3">
                                <label
                                    className="block text-sm font-medium tracking-wide"
                                >
                                    ชื่อเว็บไซต์ (ย่อ)
                                </label>
                                <input
                                    type="text"
                                    name="website-name"
                                    id="website-name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-6 md:col-span-">
                                <label
                                    className="block text-sm font-medium tracking-wide"
                                >
                                    รายละเอียด
                                </label>
                                <textarea
                                    type="text"
                                    name="website-desc"
                                    id="website-desc"
                                    rows="4"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    className="mt-1 p-2 block w-full min-h-[42px] max-h-[210px] rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-6 md:col-span-6">
                                <label
                                    className="block text-sm font-medium tracking-wide"
                                >
                                    ไอคอนเว็บไซต์ (16x16)
                                </label>
                                <input
                                    type="text"
                                    name="website-icon"
                                    id="website-icon"
                                    value={icon}
                                    onChange={(e) => setIcon(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-6 md:col-span-6">
                                <label
                                    className="block text-sm font-medium tracking-wide"
                                >
                                    โลโก้เว็บไซต์ (40x40)
                                </label>
                                <input
                                    type="text"
                                    name="website-logo"
                                    id="website-logo"
                                    value={logo}
                                    onChange={(e) => setLogo(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-6 md:col-span-6">
                                <label
                                    className="block text-sm font-medium tracking-wide"
                                >
                                    แบนเนอร์เว็บไซต์ (1100x250)
                                </label>
                                <input
                                    type="text"
                                    name="website-thumbnail"
                                    id="website-thumbnail"
                                    value={banner}
                                    onChange={(e) => setBanner(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-6 md:col-span-6">
                                <label
                                    className="block text-sm font-medium tracking-wide"
                                >
                                    ประกาศ
                                </label>
                                <input
                                    type="text"
                                    name="announcement"
                                    id="announcement"
                                    value={announcement}
                                    onChange={(e) =>
                                        setAnnouncement(e.target.value)
                                    }
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                                />
                            </div>
                        </div>
                    </form>
                    <form
                        id="right"
                        autoComplete="off"
                        className="w-full md:w-2/4 bg-white border rounded-md shadow mb-6 h-full divide-y"
                    >
                        <div className="p-6 flex items-center justify-between">
                            <h2 className="text-lg font-semibold">
                                ระบบเติมเงิน
                            </h2>
                            <button className="inline-flex items-center font-medium text-white bg-primary hover:bg-primary py-2 px-4 rounded-md">
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
                        <div
                            id="config-main"
                            className="grid grid-cols-3 gap-6 p-6"
                        >
                            <div className="col-span-3">
                                <label
                                    className="block text-sm font-medium tracking-wide"
                                >
                                    เบอร์โทรศัพท์
                                </label>
                                <input
                                    type="text"
                                    name="tw-number"
                                    id="tw-number"
                                    value={twPhone}
                                    onChange={(e) => setTwPhone(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                                />
                            </div>
                        </div>
                    </form>
                </section>
            </main>
        </Layout>
    );
};

export default AdminConfig;

export { getServerSideProps } from "../../utils/get-init-data";
