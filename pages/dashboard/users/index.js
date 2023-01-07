import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DashboardNavbar from "../../../components/layouts/dashboard-navbar";
import Layout from "../../../components/layouts/main-layout";
import Swal from "sweetalert2";
import UserContext from "../../../contexts/user/user-context";

const AdminUsers = () => {
    const { getAllUsers, deleteUser, userListScreen: { users, loading, error } } = useContext(UserContext);
    
    useEffect(() => {
        getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteUserHandler = (events, id) => {
        events.preventDefault();
        Swal.fire({
            title: "ต้องการลบผู้ใช้?",
            text: "หากลบแล้วไม่สามารถยกเลิกได้!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(id)
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        });
    };

    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-24 md:pt-28 mx-auto min-h-screen items-center">
                <DashboardNavbar />
                <section className="bg-white border rounded-md shadow mb-6 divide-y">
                    <div className="p-6 flex items-center justify-between max-h-[88px]">
                        <h2 className="text-lg font-semibold">จัดการผู้ใช้</h2>
                        <input
                            type="text"
                            name="website-title"
                            id="website-title"
                            placeholder="Find user"
                            className="p-2 rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">
                                        Name
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Email
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Point
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Role
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        <span className="sr-only">Action</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-base">
                                {users?.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="border-b border-gray-200 hover:bg-gray-100"
                                    >
                                        <td className="py-3 px-6 text-left">
                                            {user.username}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {user.email}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {user.point.toFixed(2)}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {user.role}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-end">
                                                <button className="mr-2 transform hover:text-purple-500 hover:scale-110 transition-all">
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
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                        />
                                                    </svg>
                                                </button>
                                                <button className="mr-2 transform hover:text-purple-500 hover:scale-110 transition-all">
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
                                                <button
                                                    onClick={(e) =>
                                                        deleteUserHandler(
                                                            e,
                                                            user._id
                                                        )
                                                    }
                                                    className="transform text-red-600 hover:scale-110 transition-all"
                                                >
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
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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
                </section>
            </main>
        </Layout>
    );
};

export default AdminUsers;

export { getServerSideProps } from "../../../utils/get-init-data";
