import Layout from "../../components/layouts/main-layout";
import TopupCard from "../../components/ui/cards/topup-card";

const Topup = () => {
    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-24 md:pt-28 mx-auto min-h-screen items-center">
                <h1 className="text-center text-4xl font-bold mb-8">
                    เติมเงิน
                </h1>
                <div className="text-center">
                    พอยต์คงเหลือ : 780.00
                </div>
                <div>
                    <TopupCard />
                </div>
            </main>
        </Layout>
    );
};

export default Topup;

// export { getServerSideProps } from "../../utils/get-init-data";
