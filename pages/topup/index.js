import { useState } from "react";
import Layout from "../../components/layouts/main-layout";
import TopupCard from "../../components/ui/cards/topup-card";

const Topup = () => {
    const [loading, setLoading] = useState(true);

    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-24 md:pt-28 mx-auto items-center">
                <h1 className="text-center text-4xl font-bold mb-8">
                    เติมเงิน
                </h1>
                <div className="text-center text-lg mb-6">
                    พอยต์คงเหลือ : 780.00
                </div>
                <div className="max-w-[800px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 transition-all duration-500 ease-in-out">
                    <TopupCard
                        title={"TrueMoney Wallet Gift"}
                        image={
                            "https://cdn.discordapp.com/attachments/717327142978977834/1065807965073969222/ic-truemoneywallet-gift.png"
                        }
                    />
                    <TopupCard
                        title={"TrueMoney Wallet QR"}
                        image={
                            "https://cdn.discordapp.com/attachments/717327142978977834/1065807936636583976/ic-truemoneywallet-auto.png"
                        }
                    />
                    <TopupCard
                        title={"TrueMoney"}
                        image={
                            "https://cdn.discordapp.com/attachments/717327142978977834/1065807993049976882/ic-truemoney.png"
                        }
                    />
                    <TopupCard
                        title={"PromptPay QR"}
                        image={
                            "https://cdn.discordapp.com/attachments/717327142978977834/1065804796126314547/ic-promptpay.png"
                        }
                    />
                </div>
            </main>
        </Layout>
    );
};

export default Topup;

Topup.auth = true

export { getServerSideProps } from "../../utils/get-init-data";
