import DashboardNavbar from "../../components/layouts/dashboard-navbar";
import Layout from "../../components/layouts/main-layout";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ConfigContext from "../../contexts/config/config-context";
import { UPDATE_CONFIG_RESET } from "../../types/config-constants";

import { BiSliderAlt, BiImage } from "react-icons/bi";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { MdOutlineColorLens } from "react-icons/md";
import ConfigsGeneralTab from "../../components/tabs/configs-general";
import ConfigsPaymentTab from "../../components/tabs/configs-payment";
import ConfigsBannerTab from "../../components/tabs/configs-banner";
import ConfigsAppearanceTab from "../../components/tabs/configs-appearance-tab";
import { useToast } from "../../contexts/toast/toast-context";

const AdminConfig = () => {
    const router = useRouter();
    const { updateConfig, clearErrors, configs, error, isUpdated, dispatch } =
        useContext(ConfigContext);

    const [activeTab, setActiveTab] = useState("general");

    const toast = useToast();

    useEffect(() => {
        if (error) {
            toast.add({
                title: "ผิดพลาด!",
                text: error,
                icon: "error",
            });
            clearErrors();
        }

        if (isUpdated) {
            toast.add({
                title: "สำเร็จ!",
                text: "บันทึกการตั้งค่าแล้ว",
                icon: "success",
            });
            router.reload();

            dispatch({ type: UPDATE_CONFIG_RESET });
        }
    }, [clearErrors, dispatch, error, isUpdated, router, toast]);

    const handleTab = (e, tab) => {
        e.preventDefault();
        setActiveTab(tab);
    };

    const tabHeader = [
        { label: "ตั้งค่าเว็บไซต์", value: "general", icon: <BiSliderAlt /> },
        {
            label: "ระบบเติมเงิน",
            value: "payment",
            icon: <HiOutlineCreditCard />,
        },
        { label: "แบนเนอร์", value: "banner", icon: <BiImage /> },
        {
            label: "ปรับแต่ง",
            value: "appearance",
            icon: <MdOutlineColorLens />,
        },
    ];

    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-20 md:pt-28 mx-auto items-center">
                <section
                    id="header"
                    className="md:hidden border-b-2 mx-8 py-4 mb-6"
                >
                    <h1 className="text-4xl font-semibold text-center">
                        จัดการเว็บไซต์
                    </h1>
                </section>
                <DashboardNavbar />
                <section className="md:grid md:grid-cols-3 md:gap-4">
                    <div className="md:col-span-1 mb-4 md:mb-0">
                        <div className="flex flex-col gap-1.5 p-4 md:sticky md:top-[100px] bg-white border shadow rounded-md">
                            {tabHeader.map((tab) => (
                                <div
                                    onClick={(e) => handleTab(e, tab.value)}
                                    key={tab.label}
                                    className={`flex items-center p-2 rounded-lg hover:bg-primary/10 hover:cursor-pointer ${
                                        activeTab === tab.value &&
                                        `bg-primary/10`
                                    }`}
                                >
                                    <div
                                        className="text-2xl
                                        mr-4 text-gray-600"
                                    >
                                        {tab.icon}
                                    </div>
                                    <p className="font-medium">{tab.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <form
                        id="left"
                        autoComplete="off"
                        className="md:col-span-2 bg-white border rounded-md shadow"
                    >
                        {activeTab === "general" && (
                            <ConfigsGeneralTab configs={configs} submit={updateConfig} />
                        )}
                        {activeTab === "payment" && (
                            <ConfigsPaymentTab configs={configs} submit={updateConfig} />
                        )}
                        {activeTab === "banner" && (
                            <ConfigsBannerTab configs={configs} submit={updateConfig} />
                        )}
                        {activeTab === "appearance" && (
                            <ConfigsAppearanceTab configs={configs} submit={updateConfig} />
                        )}
                    </form>
                </section>
            </main>
        </Layout>
    );
};

export default AdminConfig;

export { getServerSideProps } from "../../utils/get-init-data";
