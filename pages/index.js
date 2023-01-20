import axios from "axios";
import Image from "next/image";
import { useContext, useEffect } from "react";
import Layout from "../components/layouts/main-layout";
import ProductCard from "../components/ui/cards/product-card";
import StatCard from "../components/ui/cards/stat-card";
import ConfigsContext from "../contexts/config/config-context";
import ProductContext from "../contexts/product/product-context";
import { withInitProps } from "../utils/get-init-data";

export default function Home({stats}) {
    const { configs } = useContext(ConfigsContext);
    const { getFeaturedProducts, products, loading, error } = useContext(ProductContext);

    useEffect(() => {
        getFeaturedProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Layout>
            <main className="max-w-[1150px] sm:px-[17px] pb-4 sm:pb-[25px] pt-20 md:pt-28 mx-auto items-center">
                <div className="flex flex-col gap-y-4 md:gap-y-8">
                    <section
                        id="banner"
                        className="flex justify-center items-center md:px-2"
                    >
                        <Image
                            alt="homepage_banner"
                            src={configs?.website_banner || "https://dummyimage.com/1100x250"}
                            draggable="false"
                            width={1100}
                            height={250}
                            unoptimized 
                            className="max-h-[250px] md:rounded-lg shadow-md"
                        />
                    </section>

                    <section id="stats" className="px-4 md:px-2">
                        <StatCard stats={stats} />
                    </section>

                    <section id="products" className="px-2 md:px-0">
                        <div className="flex flex-wrap justify-start gap-y-4">
                            {products?.map((product, i) => (
                                <ProductCard key={i} product={product} />
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </Layout>
    );
}

// export { getServerSideProps } from "../utils/get-init-data";
export const getServerSideProps = withInitProps(async (ctx) => {
    const nextRequestMeta = ctx.req[Reflect.ownKeys(ctx.req).find(
        (s) => String(s) === "Symbol(NextRequestMeta)"
    )];
    const protocal = nextRequestMeta._protocol;

    const { data } = await axios.get(
        `${protocal}://${ctx.req.headers.host}/api/stats`
    );

    return {
        props: {
            stats: data
        },
    };
});
