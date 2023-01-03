import Layout from "../../components/layouts/main-layout";

const Dashboard = () => {
    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-24 md:pt-28 mx-auto min-h-screen items-center">
                Configs
            </main>
        </Layout>
    );
};

export default Dashboard;

export { getServerSideProps } from "../../utils/get-init-data";