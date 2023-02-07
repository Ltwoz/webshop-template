import axios from "axios";
import { useEffect, useState } from "react";
import DashboardNavbar from "../../../components/layouts/dashboard-navbar";
import Layout from "../../../components/layouts/main-layout";
import LoadingSpiner from "../../../components/ui/loader/spiner";
import { useToast } from "../../../contexts/toast/toast-context";

const AdminTopups = () => {
    // CRUD State.
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Orders State.
    const [topups, setTopups] = useState([]);

    const toast = useToast();

    useEffect(() => {
        const getAdminOrders = async () => {
            const { data } = await axios.get(`/api/admin/history/topups`);
            setTopups(data?.topups);
            setLoading(false);
        };

        getAdminOrders().catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (error) {
            toast.add({
                title: "ผิดพลาด!",
                text: error,
                icon: "error",
            });
            setError(null);
        }
    }, [error, toast]);

    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-20 md:pt-28 mx-auto items-center">
                <section
                    id="header"
                    className="md:hidden border-b-2 mx-8 py-4 mb-6"
                >
                    <h1 className="text-4xl font-semibold text-center">
                        ประวัติการเติมเงิน
                    </h1>
                </section>
                <DashboardNavbar />
                {loading ? (
                    <LoadingSpiner />
                ) : (
                    <section className="bg-white border rounded-md shadow mb-6 divide-y">
                        <div className="p-6 flex items-center justify-between max-h-[88px]">
                            <h2 className="text-lg font-semibold">
                                ประวัติการเติมเงิน
                            </h2>
                            <input
                                type="text"
                                name="website-title"
                                id="website-title"
                                placeholder="ค้นหา"
                                autoComplete="off"
                                className="p-2 rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                            />
                        </div>
                        {topups.length < 1 ? (
                            <div className="flex items-center justify-center py-6">
                                <p className="font-medium text-gray-600">
                                    ไม่มีประวัติการเติมเงิน
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col overflow-x-auto">
                                <table className="w-full table-fixed">
                                    <thead>
                                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                            <th className="py-3 px-6 text-left w-36">
                                                #
                                            </th>
                                            <th className="py-3 px-6 text-left w-36">
                                                ผู้ใช้
                                            </th>
                                            <th className="py-3 px-6 text-left w-44 md:w-56">
                                                ประเภท
                                            </th>
                                            <th className="py-3 px-6 text-left w-44">
                                                จำนวน
                                            </th>
                                            <th className="py-3 px-6 text-left w-40">
                                                วันที่
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-sm md:text-base">
                                        {topups?.map((topup, i) => (
                                            <tr
                                                key={i}
                                                className="border-b border-gray-200 hover:bg-gray-100"
                                            >
                                                <td className="py-3 px-6 text-left">
                                                    {topup._id}
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    {topup.user?.username}
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    {topup.type}
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    {topup.amount}
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    {new Date(
                                                        topup.createdAt
                                                    ).toLocaleString("en", {
                                                        dateStyle: "short",
                                                        timeStyle: "short",
                                                        hour12: false,
                                                    })}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                )}
            </main>
        </Layout>
    );
};

export default AdminTopups;

export { getServerSideProps } from "../../../utils/get-init-data";
