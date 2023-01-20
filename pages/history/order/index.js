import { useContext, useEffect } from "react";
import Layout from "../../../components/layouts/main-layout";
import OrderContext from "../../../contexts/order/order-context";
import UserContext from "../../../contexts/user/user-context";

const HistoryOrder = () => {
    const { user } = useContext(UserContext);
    const { getAllOrders, orders, loading } = useContext(OrderContext);

    useEffect(() => {
        getAllOrders(user._id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-24 md:pt-28 mx-auto items-center">
                <h1 className="text-center text-4xl font-bold mb-8">
                    ประวัติการสั่งซื้อ
                </h1>
                <section className="bg-white border rounded-md shadow mb-6 divide-y">
                    <div className="p-6 flex items-center justify-between max-h-[88px]">
                        <h2 className="text-lg font-semibold">
                            ประวัติการสั่งซื้อ
                        </h2>
                        <input
                            type="text"
                            name="website-title"
                            id="website-title"
                            placeholder="ค้นหาประวัติ"
                            autoComplete="off"
                            className="p-2 rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                        />
                    </div>
                    <div className="flex flex-col">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">
                                        ชื่อสินค้า
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        ราคา
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        ข้อมูล
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        วันที่
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm md:text-base">
                                {orders?.map((order, i) => (
                                    <tr
                                        key={i}
                                        className="border-b border-gray-200 hover:bg-gray-100"
                                    >
                                        <td className="py-3 px-6 text-left">
                                            {order.product_name}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {order.price} บาท
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {order.stock_data}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {new Date(
                                                order.createdAt
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

export default HistoryOrder;

export { getServerSideProps } from "../../../utils/get-init-data";
