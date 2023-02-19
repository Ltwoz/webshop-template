import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../../components/layouts/main-layout";
import CategoryCard from "../../components/ui/cards/category-card";
import LoadingSpiner from "../../components/ui/loader/spiner";

const Store = () => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            const { data } = await axios.get(`/api/categories`);
            setCategories(data.categories);
            setLoading(false);
        };

        getCategories().catch(() => {
            console.error;
            setLoading(false);
        });
    }, []);

    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-24 md:pt-28 mx-auto items-center">
                <section
                    id="header"
                    className="border-b-2 md:border-0 mx-8 pb-4 pt-0 mb-6"
                >
                    <h1 className="text-3xl md:text-4xl font-semibold text-center">
                        เลือกหมวดหมู่สินค้า
                    </h1>
                </section>
                {loading ? (
                    <LoadingSpiner />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 transition-all duration-500 ease-in-out">
                        {categories.map((category, i) => (
                            <CategoryCard key={i} category={category} />
                        ))}
                    </div>
                )}
            </main>
        </Layout>
    );
};

export default Store;

export { getServerSideProps } from "../../utils/get-init-data";
