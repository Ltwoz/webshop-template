import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import Layout from "../../components/layouts/main-layout";
import TopupCard from "../../components/ui/cards/topup-card";
import ConfigContext from "../../contexts/config/config-context";

const Topup = ({ configs }) => {
    const { data: session, status } = useSession();

    const user = session?.user;

    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-24 md:pt-28 mx-auto items-center">
                <h1 className="text-center text-3xl md:text-4xl font-bold mb-6 md:mb-8">
                    เติมเงิน
                </h1>
                <div className="text-center text-lg mb-6">
                    พอยต์คงเหลือ :{" "}
                    {new Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 2,
                    }).format(user?.point)}
                </div>
                <div className="max-w-[800px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 transition-all duration-500 ease-in-out">
                    {configs.payment?.truemoney_gift && (
                        <TopupCard
                            title={"TrueMoney Wallet Gift"}
                            image={
                                "https://cdn.discordapp.com/attachments/717327142978977834/1065807965073969222/ic-truemoneywallet-gift.png"
                            }
                            href="/topup/truemoney-gift"
                        />
                    )}
                    {!configs.payment?.truemoney_qr && (
                        <TopupCard
                            title={"TrueMoney Wallet QR"}
                            image={
                                "https://cdn.discordapp.com/attachments/717327142978977834/1065807936636583976/ic-truemoneywallet-auto.png"
                            }
                            href="/topup"
                        />
                    )}
                    {!configs.payment?.truemoney && (
                        <TopupCard
                            title={"TrueMoney"}
                            image={
                                "https://cdn.discordapp.com/attachments/717327142978977834/1065807993049976882/ic-truemoney.png"
                            }
                            href="/topup"
                        />
                    )}
                    {!configs.payment?.promptpay_qr && (
                        <TopupCard
                            title={"PromptPay QR"}
                            image={
                                "https://cdn.discordapp.com/attachments/717327142978977834/1065804796126314547/ic-promptpay.png"
                            }
                            href="/topup"
                        />
                    )}
                </div>
            </main>
        </Layout>
    );
};

export default Topup;

Topup.auth = true;

export { getServerSideProps } from "../../utils/get-init-data";
