import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Layout from "../../components/layouts/main-layout";
import ProfileNavbar from "../../components/layouts/profile-navbar";
import LoadingSpiner from "../../components/ui/loader/spiner";
import { BsKey } from "react-icons/bs";
import { FiUser } from "react-icons/fi";

const ProfilePage = () => {
    const { data: session, status } = useSession();

    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("profile");

    useEffect(() => {
        const getUser = async () => {
            const { data } = await axios.get(`/api/auth/@me`);
            setUser(data.user);
            setLoading(false);
        };

        getUser().catch(() => {
            console.error;
            setLoading(false);
        });
    }, []);

    const handleTab = (e, tab) => {
        e.preventDefault();
        setActiveTab(tab);
    };

    const tabHeader = [
        { label: "แก้ไขโปรไฟล์", value: "profile", icon: <FiUser /> },
        { label: "เปลี่ยนรหัสผ่าน", value: "password", icon: <BsKey /> },
    ];

    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-24 md:pt-28 mx-auto items-center">
                <ProfileNavbar />
                {loading ? (
                    <LoadingSpiner />
                ) : (
                    <>
                        <section className="md:grid md:grid-cols-3 md:gap-4">
                            <div
                                id="tab-select"
                                className="md:col-span-1 mb-4 md:mb-0"
                            >
                                <div className="flex flex-col gap-1.5 p-4 md:sticky md:top-[100px] bg-white border shadow rounded-md">
                                    {tabHeader.map((tab) => (
                                        <div
                                            onClick={(e) =>
                                                handleTab(e, tab.value)
                                            }
                                            key={tab.label}
                                            className={`flex items-center p-2 rounded-lg hover:bg-primary/10 hover:cursor-pointer ${
                                                activeTab === tab.value &&
                                                `bg-primary/10 text-primary`
                                            }`}
                                        >
                                            <div
                                                className={`text-2xl mr-4 ${
                                                    activeTab === tab.value
                                                        ? `text-primary`
                                                        : `text-gray-600`
                                                }`}
                                            >
                                                {tab.icon}
                                            </div>
                                            <p className="font-medium">
                                                {tab.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <form
                                id="tab"
                                autoComplete="off"
                                className="md:col-span-2 bg-white border rounded-md shadow"
                            ></form>
                        </section>
                    </>
                )}
            </main>
        </Layout>
    );
};

export default ProfilePage;

ProfilePage.auth = true;

export { getServerSideProps } from "../../utils/get-init-data";
