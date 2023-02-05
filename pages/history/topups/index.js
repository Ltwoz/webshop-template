import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Layout from "../../../components/layouts/main-layout";

const HistoryTopup = () => {
    const { data: session, status } = useSession();
    const user = session?.user;

    const [topups, setTopups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTopups = async () => {
            const { data } = await axios.get(
                `/api/history/topups?user=${user?.id}`
            );
            setTopups(data.topups);
            setLoading(false);
        };

        getTopups().catch(() => {
            console.error;
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-24 md:pt-28 mx-auto items-center">
                <h1 className="text-center text-4xl font-bold mb-8">
                    ประวัติการเติมเงิน
                </h1>
                <section className="bg-white border rounded-md shadow mb-6 divide-y">
                    <div className="p-6 flex items-center justify-between max-h-[88px]">
                        <h2 className="text-lg font-semibold">ประวัติการเติมเงิน</h2>
                        <input
                            type="text"
                            name="website-title"
                            id="website-title"
                            placeholder="ค้นหาประวัติ"
                            autoComplete="off"
                            className="p-2 rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                        />
                    </div>
                    <div className="flex flex-col overflow-x-auto">
                        <table className="w-full table-fixed">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                    <th className="py-3 px-6 text-left w-40">
                                        #
                                    </th>
                                    <th className="py-3 px-6 text-left w-44 md:w-72">
                                        ประเภท
                                    </th>
                                    <th className="py-3 px-6 text-left w-36">
                                        จำนวน
                                    </th>
                                    <th className="py-3 px-6 text-left w-52">
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
                                            {topup.type}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {topup.amount} บาท
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
                </section>
            </main>
        </Layout>
    );
};

export default HistoryTopup;

HistoryTopup.auth = true;

export { getServerSideProps } from "../../../utils/get-init-data";