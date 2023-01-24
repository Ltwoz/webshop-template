import { HiOutlineNewspaper } from "react-icons/hi2";
import { FiUsers } from "react-icons/fi";
import { MdOutlineSell } from "react-icons/md";
import { useContext } from "react";
import ConfigsContext from "../../../contexts/config/config-context";

const StatCard = ({stats}) => {
    const { configs } = useContext(ConfigsContext);

    return (
        <div className="overflow-hidden rounded-xl border shadow-md w-full divide-y bg-white">
            <div id="announcement" className=" px-6 pb-6 pt-6">
                <h2 className="text-2xl md:text-3xl font-bold">ประกาศ</h2>
                <div className="border rounded-lg p-3 mt-4">
                    <div id="announce-content" className="hidden md:flex">
                        <HiOutlineNewspaper size="30px" className="mr-4" />
                        <div className="w-full self-end">
                            <p className="font-medium text-base">
                                {configs?.announcement || "ไม่มีประกาศในขณะนี้"}
                            </p>
                        </div>
                    </div>

                    {/* < 768px Mobile */}
                    <marquee
                        id="announce-content"
                        className="flex md:hidden"
                        scrollamount="5"
                    >
                        <div className="flex">
                            <HiOutlineNewspaper size="30px" className="mr-4" />
                            <div className="w-full self-end">
                                <p className="font-medium text-base">
                                    {configs?.announcement || "ไม่มีประกาศในขณะนี้"}
                                </p>
                            </div>
                        </div>
                    </marquee>
                </div>
            </div>

            <div
                id="stats-group"
                className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x py-2 md:py-4 px-4"
            >
                <div
                    id="stats-item"
                    className="w-full md:w-1/3 px-2 lg:px-6 py-2 flex justify-between md:justify-around items-center text-end"
                >
                    <div className="w-[80px]">
                        {/* <TbBox className="text-[65px] lg:text-[70px]" /> */}
                        <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-[65px] lg:w-[70px] h-[65px] lg:h-[70px]"
                        >
                            <path
                                d="m19 1.73205081 7.8564065 4.53589838c1.8564064 1.07179677 3 3.05255889 3 5.19615241v9.0717968c0 2.1435935-1.1435936 4.1243556-3 5.1961524l-7.8564065 4.5358984c-1.8564065 1.0717968-4.1435935 1.0717968-6 0l-7.85640646-4.5358984c-1.85640646-1.0717968-3-3.0525589-3-5.1961524v-9.0717968c0-2.14359352 1.14359354-4.12435564 3-5.19615241l7.85640646-4.53589838c1.8564065-1.07179677 4.1435935-1.07179677 6 0zm-4.791172 1.6195783-.208828.11247251-7.85640646 4.53589838c-1.17246724.67692428-1.91843145 1.89771701-1.99370617 3.2394348l-.00629383.2246668v9.0717968c0 1.3538485.68425541 2.6102689 1.80857977 3.3463176l.19142023.117784 7.85640646 4.5358984c1.1688485.674835 2.5938608.7123258 3.791172.1124725l.208828-.1124725 7.8564065-4.5358984c1.1724672-.6769243 1.9184314-1.897717 1.9937061-3.2394348l.0062939-.2246668v-9.0717968c0-1.3538485-.6842555-2.61026887-1.8085798-3.34631759l-.1914202-.11778401-7.8564065-4.53589838c-1.1688485-.67483501-2.5938608-.71232584-3.791172-.11247251zm8.8114886 8.20574889c.259282.4876385.0741624 1.0931371-.4134761 1.3524191l-5.6183556 2.9868539.0000413 6.7689186c0 .5522848-.4477152 1-1 1-.5522847 0-1-.4477152-1-1l-.0000413-6.7689186-5.61827304-2.9868539c-.48763849-.259282-.67275801-.8647806-.41347603-1.3524191.25928199-.4876385.86478067-.672758 1.35241917-.4134761l5.6793299 3.0187491 5.6794125-3.0187491c.4876385-.2592819 1.0931372-.0741624 1.3524192.4134761z"
                                fill="currentColor"
                                fillRule="nonzero"
                            ></path>
                        </svg>
                    </div>
                    <div className="my-auto">
                        <h4 className="text-lg md:text-base lg:text-lg font-medium text-black/70 mb-2">
                            สินค้าทั้งหมด
                        </h4>
                        <h1 className="text-3xl md:text-2xl lg:text-3xl font-semibold">
                            {stats?.productCount?.toLocaleString()} ชิ้น
                        </h1>
                    </div>
                </div>
                <div
                    id="stats-item"
                    className="w-full md:w-1/3 px-2 lg:px-6 py-2 flex justify-between md:justify-around items-center text-end"
                >
                    <div className="w-[80px]">
                        <MdOutlineSell className="text-[65px] lg:text-[70px]" />
                    </div>
                    <div className="my-auto">
                        <h4 className="text-lg md:text-base lg:text-lg font-medium text-black/70 mb-2">
                            ขายไปแล้ว
                        </h4>
                        <h1 className="text-3xl md:text-2xl lg:text-3xl font-semibold">
                        {stats?.orderCount?.toLocaleString()} ชิ้น
                        </h1>
                    </div>
                </div>
                <div
                    id="stats-item"
                    className="w-full md:w-1/3 px-2 lg:px-6 py-2 flex justify-between md:justify-around items-center text-end"
                >
                    <div className="w-[80px]">
                        <FiUsers className="text-[65px] lg:text-[70px]" />
                    </div>
                    <div className="my-auto">
                        <h4 className="text-lg md:text-base lg:text-lg font-medium text-black/70 mb-2">
                            ผู้ใช้งานทั้งหมด
                        </h4>
                        <h1 className="text-3xl md:text-2xl lg:text-3xl font-semibold">
                            {stats?.userCount?.toLocaleString()} คน
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
