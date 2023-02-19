import { useSession } from "next-auth/react";
import Image from "next/image";
import { useContext, useState } from "react";
import Layout from "../../components/layouts/main-layout";
import RedeemCouponTab from "../../components/tabs/topup-coupon";
import TrueMoneyGiftTab from "../../components/tabs/topups-truemoney-gift";
import TopupCard from "../../components/ui/cards/topup-card";
import ConfigContext from "../../contexts/config/config-context";

const Topup = ({ configs }) => {
    const [activeTab, setActiveTab] = useState(
        configs.payment?.truemoney_gift ? "twGift" : "coupon"
    );

    const handleTab = (e, tab) => {
        e.preventDefault();
        setActiveTab(tab);
    };

    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-20 md:pt-28 mx-auto items-center">
                <section
                    id="header"
                    className="md:hidden border-b-2 mx-8 py-4 mb-6"
                >
                    <h1 className="text-4xl font-semibold text-center">
                        เติมเงิน
                    </h1>
                </section>
                <section className="md:grid md:grid-cols-3 md:gap-4">
                    <div id="tab-select" className="md:col-span-1 mb-4 md:mb-0">
                        <div className="flex flex-col gap-1.5 p-4 md:sticky md:top-[100px] bg-white border shadow rounded-md">
                            {configs.payment?.truemoney_gift && (
                                <div
                                    onClick={(e) => handleTab(e, "twGift")}
                                    className={`flex items-center gap-4 p-2 rounded-lg hover:bg-primary/10 hover:cursor-pointer ${
                                        activeTab === "twGift" &&
                                        `bg-primary/10 text-primary`
                                    }`}
                                >
                                    <div className="w-16 aspect-square relative flex items-center rounded-lg overflow-hidden transition-all group-hover:scale-105">
                                        <Image
                                            alt="topup_image"
                                            src="https://cdn.discordapp.com/attachments/717327142978977834/1065807965073969222/ic-truemoneywallet-gift.png"
                                            draggable="false"
                                            fill
                                            className="select-none object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">
                                            TrueMoney Wallet Gift
                                        </h3>
                                        <p className="text-sm">เติมเงินด้วย TrueMoney Wallet Gift</p>
                                    </div>
                                </div>
                            )}
                            {configs.payment?.truemoney_qr && (
                                <div
                                    onClick={(e) => handleTab(e, "twQR")}
                                    className={`flex items-center gap-4 p-2 rounded-lg hover:bg-primary/10 hover:cursor-pointer ${
                                        activeTab === "twQR" &&
                                        `bg-primary/10 text-primary`
                                    }`}
                                >
                                    <div className="w-16 aspect-square relative flex items-center rounded-lg overflow-hidden transition-all group-hover:scale-105">
                                        <Image
                                            alt="topup_image"
                                            src="https://cdn.discordapp.com/attachments/717327142978977834/1065807936636583976/ic-truemoneywallet-auto.png"
                                            draggable="false"
                                            fill
                                            className="select-none object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">
                                            TrueMoney Wallet QR
                                        </h3>
                                        <p className="text-sm">เติมเงินด้วย TrueMoney Wallet QR</p>
                                    </div>
                                </div>
                            )}
                            <div
                                onClick={(e) => handleTab(e, "coupon")}
                                className={`flex items-center gap-4 p-2 rounded-lg hover:bg-primary/10 hover:cursor-pointer ${
                                    activeTab === "coupon" &&
                                    `bg-primary/10 text-primary`
                                }`}
                            >
                                <div className="w-16 aspect-square relative flex items-center rounded-lg overflow-hidden transition-all group-hover:scale-105">
                                    <Image
                                        alt="topup_image"
                                        src="https://cdn.discordapp.com/attachments/717327142978977834/1076888711972798574/isometric-gift-flat-icon-pixel-perfect-for-mobile-and-web.png"
                                        draggable="false"
                                        fill
                                        className="select-none object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-medium">
                                        Redeem Coupon Code
                                    </h3>
                                    <p className="text-sm">แลกคูปอง</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form
                        id="tab"
                        autoComplete="off"
                        className="md:col-span-2 bg-white border rounded-md shadow"
                    >
                        {activeTab === "twGift" && <TrueMoneyGiftTab />}
                        {activeTab === "coupon" && <RedeemCouponTab />}
                    </form>
                </section>
            </main>
        </Layout>
    );
};

export default Topup;

Topup.auth = true;

export { getServerSideProps } from "../../utils/get-init-data";
