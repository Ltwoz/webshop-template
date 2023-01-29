import { useRouter } from "next/router";
import Layout from "../../../components/layouts/main-layout";
import { useEffect, useState } from "react";
import ProductCard from "../../../components/ui/cards/product-card";
import { withInitProps } from "../../../utils/get-init-data";
import axios from "axios";
import ThreeDotsLoader from "../../../components/ui/loader/threedots";

const DynamicCategory = (props) => {
    const router = useRouter();
    const cid = router.query.category;

    const [products, setProducts] = useState(props.products);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllProducts = async () => {
            setLoading(true);
            const { data } = await axios.get(`/api/products?cid=${cid}`);
            setProducts(data.products);
        };
        getAllProducts().catch(console.error);
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-24 md:pt-28 mx-auto items-center">
                {loading ? (
                    <ThreeDotsLoader />
                ) : (
                    <>
                        <h1 className="text-center text-4xl font-bold mb-8">
                            หมวดหมู่สินค้า
                        </h1>
                        <div className="grid md:grid-cols-4 justify-start gap-4 md:gap-6">
                            {products?.map((product, i) => (
                                <ProductCard key={i} product={product} />
                            ))}
                        </div>
                    </>
                )}
            </main>
        </Layout>
    );
};

export default DynamicCategory;

// export { getServerSideProps } from "../../../utils/get-init-data";

export const getServerSideProps = withInitProps(async (ctx) => {
    try {
        const cid = ctx.params.category;

        const nextRequestMeta =
            ctx.req[
                Reflect.ownKeys(ctx.req).find(
                    (s) => String(s) === "Symbol(NextRequestMeta)"
                )
            ];
        const protocal = nextRequestMeta._protocol;

        const res = await axios.get(
            `${protocal}://${ctx.req.headers.host}/api/categories/${cid}`
        );

        if (res.data.category?.type === "ID_PASS") {
            return {
                redirect: {
                    destination: `/store/idpass/${cid}`,
                    permanent: true,
                },
            };
        }

        const { data } = await axios.get(
            `${protocal}://${ctx.req.headers.host}/api/products?cid=${cid}`
        );

        return {
            props: {
                products: data.products,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        };
    }
});
