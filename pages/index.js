import axios from "axios";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Layout from "../components/layouts/main-layout";
import StatCard from "../components/ui/cards/stat-card";
import ConfigsContext from "../contexts/config/config-context";
import ProductContext from "../contexts/product/product-context";
import { useSession } from "next-auth/react";
import FeaturedProductCard from "../components/ui/cards/featured-product-card";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default function Home() {
    const { configs } = useContext(ConfigsContext);
    const { getFeaturedProducts, products, loading, error } =
        useContext(ProductContext);

    const { data: session } = useSession();

    const [stats, setStats] = useState({});

    useEffect(() => {
        getFeaturedProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const getStats = async () => {
            const { data } = await axios.get(`/api/stats`);
            setStats(data.stats);
        };

        getStats().catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <Layout>
            <main className="max-w-[1150px] md:px-[17px] pb-4 sm:pb-[25px] pt-20 md:pt-28 mx-auto items-center">
                <div className="flex flex-col gap-y-4 md:gap-y-8">
                    {configs?.website_banner && (
                        <section
                            id="banner"
                            className="flex justify-center items-center aspect-[16/5] md:aspect-[16/3.5] relative overflow-hidden md:rounded-lg md:mx-2"
                        >
                            <Image
                                alt="homepage_banner"
                                src={configs?.website_banner}
                                draggable="false"
                                fill
                                className="select-none object-cover"
                            />
                        </section>
                    )}

                    <section id="stats" className="px-4 md:px-2">
                        <StatCard stats={stats} />
                    </section>

                    <section id="products" className="px-4 md:px-2">
                        <h1 className="text-2xl font-bold mb-4 md:mb-8">
                            สินค้าแนะนำ
                        </h1>
                        {/* <Splide aria-label="My Favorite Images">
                            {products?.map((product, i) => (
                                <SplideSlide key={i}>
                                    <FeaturedProductCard product={product} />
                                </SplideSlide>
                            ))}
                        </Splide> */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-start gap-4 md:gap-6">
                            {products?.map((product, i) => (
                                <FeaturedProductCard
                                    key={i}
                                    product={product}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </Layout>
    );
}

export { getServerSideProps } from "../utils/get-init-data";
// export const getServerSideProps = withInitProps(async (ctx) => {
//     const nextRequestMeta =
//         ctx.req[
//             Reflect.ownKeys(ctx.req).find(
//                 (s) => String(s) === "Symbol(NextRequestMeta)"
//             )
//         ];
//     const protocal = nextRequestMeta._protocol;

//     const { data } = await axios.get(
//         `${protocal}://${ctx.req.headers.host}/api/stats`
//     );

//     return {
//         props: {
//             stats: data,
//         },
//     };
// });
