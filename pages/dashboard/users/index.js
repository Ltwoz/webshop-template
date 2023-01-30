import axios from "axios";
import { useEffect, useState } from "react";
import DashboardNavbar from "../../../components/layouts/dashboard-navbar";
import Layout from "../../../components/layouts/main-layout";
import LoadingSpiner from "../../../components/ui/loader/spiner";

const AdminUsers = () => {
    // CRUD State.
    const [loading, setLoading] = useState(true);

    // Users State.
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getAllUsers = async () => {
            const { data } = await axios.get(`/api/admin/users`);
            setUsers(data?.users);
            setLoading(false);
        };

        getAllUsers()
            .catch(() => {
                console.error;
                setLoading(false);
            });
    }, []);

    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-20 md:pt-28 mx-auto items-center">
                <section
                    id="header"
                    className="md:hidden border-b-2 mx-8 py-4 mb-6"
                >
                    <h1 className="text-4xl font-semibold text-center">
                        จัดการผู้ใช้
                    </h1>
                </section>
                <DashboardNavbar />
                {loading ? (
                    <LoadingSpiner />
                ) : (
                    <section className="bg-white border rounded-md shadow mb-6 divide-y">
                        <div className="p-6 flex items-center justify-between max-h-[88px]">
                            <h2 className="text-lg font-semibold">
                                จัดการผู้ใช้
                            </h2>
                            <input
                                type="text"
                                name="website-title"
                                id="website-title"
                                placeholder="ค้นหาผู้ใช้"
                                autoComplete="off"
                                className="p-2 rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                            />
                        </div>
                        <div className="flex flex-col overflow-x-auto">
                            <table className="w-full table-fixed">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                        <th className="py-3 px-6 text-left w-44">
                                            ชื่อผู้ใช้
                                        </th>
                                        <th className="py-3 px-6 text-left w-64">
                                            อีเมล
                                        </th>
                                        <th className="py-3 px-6 text-left w-36">
                                            พอยต์
                                        </th>
                                        <th className="py-3 px-6 text-center w-40">
                                            ตำแหน่ง
                                        </th>
                                        <th className="py-3 px-6 text-center w-20">
                                            <span className="hidden">
                                                Action
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm md:text-base">
                                    {users?.map((user) => (
                                        <tr
                                            key={user._id}
                                            className="border-b border-gray-200 hover:bg-gray-100"
                                        >
                                            <td className="py-3 px-6 text-left">
                                                {user.username}
                                            </td>
                                            <td className="py-3 px-6 text-left hidden md:table-cell">
                                                {user.email}
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {new Intl.NumberFormat(
                                                    "en-US",
                                                    {
                                                        minimumFractionDigits: 2,
                                                    }
                                                ).format(user?.point)}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="py-3 px-6 text-center hidden md:table-cell">
                                                <div className="flex item-center justify-end gap-x-2">
                                                    <button className="transform hover:text-primary hover:scale-110 transition-all border hover:border-primary rounded-full p-2">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            className="w-5 h-5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div id="pagination" className="flex">
                            pagination
                        </div>
                    </section>
                )}
            </main>
        </Layout>
    );
};

export default AdminUsers;

export { getServerSideProps } from "../../../utils/get-init-data";
