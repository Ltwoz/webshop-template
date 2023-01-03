import { TbBox } from "react-icons/tb";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { FiUsers } from "react-icons/fi";
import { MdOutlineSell } from "react-icons/md";

const StatCard = () => {
    return (
        <div className="overflow-hidden rounded-xl border shadow-md w-full divide-y">
            <div id="announcement" className=" px-6 pb-6 pt-6">
                <h2 className="text-2xl md:text-3xl font-bold">ประกาศ</h2>
                <div className="border rounded-lg p-3 mt-4">
                    <div
                        id="announce-content"
                        className="hidden md:flex items-start"
                    >
                        <HiOutlineNewspaper size="30px" className="mr-4" />
                        <div className="w-full self-center">
                            <p className="font-medium text-base">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Ipsa laudantium illum vel
                                blanditiis autem dolore praesentium odit sed
                                quam magni!
                            </p>
                        </div>
                    </div>
                    
                    {/* < 768px Mobile */}
                    <marquee id="announce-content" className="flex md:hidden" scrollamount="5">
                        <div className="flex">
                            <HiOutlineNewspaper size="30px" className="mr-4" />
                            <div className="w-full self-center">
                                <p className="font-medium text-base">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ipsa laudantium illum vel
                                    blanditiis autem dolore praesentium odit sed
                                    quam magni!
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
                        <TbBox className="text-[65px] lg:text-[70px]" />
                    </div>
                    <div className="">
                        <h4 className="text-lg md:text-base lg:text-lg font-medium text-black/70 mb-2">
                            สินค้าทั้งหมด
                        </h4>
                        <h1 className="text-3xl md:text-2xl lg:text-3xl font-semibold">42 ชิ้น</h1>
                    </div>
                </div>
                <div
                    id="stats-item"
                    className="w-full md:w-1/3 px-2 lg:px-6 py-2 flex justify-between md:justify-around items-center text-end"
                >
                    <div className="w-[80px]">
                        <MdOutlineSell className="text-[65px] lg:text-[70px]" />
                    </div>
                    <div className="">
                        <h4 className="text-lg md:text-base lg:text-lg font-medium text-black/70 mb-2">
                            ขายไปแล้ว
                        </h4>
                        <h1 className="text-3xl md:text-2xl lg:text-3xl font-semibold">257 ชิ้น</h1>
                    </div>
                </div>
                <div
                    id="stats-item"
                    className="w-full md:w-1/3 px-2 lg:px-6 py-2 flex justify-between md:justify-around items-center text-end"
                >
                    <div className="w-[80px]">
                        <FiUsers className="text-[65px] lg:text-[70px]" />
                    </div>
                    <div className="">
                        <h4 className="text-lg md:text-base lg:text-lg font-medium text-black/70 mb-2">
                            ผู้ใช้งานทั้งหมด
                        </h4>
                        <h1 className="text-3xl md:text-2xl lg:text-3xl font-semibold">1,258 คน</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
