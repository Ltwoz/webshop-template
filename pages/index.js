import axios from "axios";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Layout from "../components/layouts/main-layout";
import StatCard from "../components/ui/cards/stat-card";
import ConfigsContext from "../contexts/config/config-context";
import ProductContext from "../contexts/product/product-context";
import FeaturedProductCard from "../components/ui/cards/featured-product-card";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Link from "next/link";

import dynamic from "next/dynamic";
const CategoryCard = dynamic(() =>
    import("../components/ui/cards/category-card")
);

export default function Home() {
    const { configs } = useContext(ConfigsContext);
    const { getFeaturedProducts, products, error } = useContext(ProductContext);

    const [stats, setStats] = useState({});

    // CRUD State.
    const [loading, setLoading] = useState(true);

    // Category State.
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getFeaturedProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const getFeaturedCategories = async () => {
            const { data } = await axios.get(`/api/categories`);
            setCategories(data?.categories);
            setLoading(false);
        };

        getFeaturedCategories().catch(() => {
            console.error;
            setLoading(false);
        });
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

                    <section id="featured-products" className="px-4 md:px-2">
                        <div className="flex flex-row items-center justify-between mb-4 md:mb-8">
                            <h1 className="text-2xl font-bold">สินค้าแนะนำ</h1>
                            <Link
                                href={"/"}
                                className="font-semibold hover:text-primary"
                            >
                                ดูทั้งหมด
                            </Link>
                        </div>
                        <Splide
                            hasTrack={false}
                            options={{
                                mediaQuery: "max",
                                perPage: 4,
                                gap: "1.5rem",
                                flickPower: 100,
                                breakpoints: {
                                    1024: {
                                        perPage: 3,
                                        gap: "1.5rem",
                                    },
                                    768: {
                                        gap: "1rem",
                                        fixedWidth: "16rem",
                                        focus: "center",
                                        arrows: false,
                                        pagination: false,
                                    },
                                },
                            }}
                        >
                            <SplideTrack>
                                {products?.map((product, i) => (
                                    <SplideSlide key={i}>
                                        <FeaturedProductCard
                                            product={product}
                                        />
                                    </SplideSlide>
                                ))}
                            </SplideTrack>
                        </Splide>
                    </section>

                    <section id="featured-categories" className="px-4 md:px-2">
                        <div className="flex flex-row items-center justify-between mb-4 md:mb-8">
                            <h1 className="text-2xl font-bold">
                                หมวดหมู่แนะนำ
                            </h1>
                            <Link
                                href={"/"}
                                className="font-semibold hover:text-primary"
                            >
                                ดูทั้งหมด
                            </Link>
                        </div>
                        <Splide
                            hasTrack={false}
                            options={{
                                mediaQuery: "max",
                                perPage: 3,
                                gap: "1.5rem",
                                flickPower: 100,
                                breakpoints: {
                                    768: {
                                        gap: "1rem",
                                        perPage: 1,
                                        arrows: false,
                                        pagination: false,
                                    },
                                },
                            }}
                        >
                            <SplideTrack>
                                {categories?.map((category, i) => (
                                    <SplideSlide
                                        key={i}
                                        className="rounded-xl overflow-hidden shadow-lg"
                                    >
                                        <CategoryCard category={category} />
                                    </SplideSlide>
                                ))}
                            </SplideTrack>
                        </Splide>
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
