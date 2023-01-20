import { useContext, useEffect } from "react";
import Layout from "../../../../components/layouts/main-layout";

const HistoryStock = () => {
    // const {getAllCategories, categories, loading} = useContext(CategoryContext);

    // useEffect(() => {
    //     getAllCategories();
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-24 md:pt-28 mx-auto items-center">
                <h1 className="text-center text-4xl font-bold mb-8">
                    สินค้า
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 transition-all duration-500 ease-in-out">
                    
                </div>
            </main>
        </Layout>
    );
};

export default HistoryStock;

export { getServerSideProps } from "../../../../utils/get-init-data";
