import { useRouter } from "next/router";
import Layout from "../../../components/layouts/main-layout";
import { useEffect, useContext, useState } from "react";
import ProductContext from "../../../contexts/product/product-context";
import ProductCard from "../../../components/ui/cards/product-card";
import { withInitProps } from "../../../utils/get-init-data";
import axios from "axios";
import ThreeDotsLoader from "../../../components/ui/loader/threedots";

const DynamicCategory = (props) => {
    const router = useRouter();
    const cid = router.query.category;

    const { getAllProducts, products, error, dispatch } =
        useContext(ProductContext);

    const [loading, setLoading] = useState(true);
    const [ssrProducts, setSsrProducts] = useState(props.products);

    useEffect(() => {
        getAllProducts(cid);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cid]);

    // useEffect(() => {
    //     setSsrProducts(products)
    // }, [products, cid]);

    useEffect(() => {
        setTimeout(function () {
            setLoading(false);
        }, 300);
    }, [products]);

    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-24 md:pt-28 mx-auto items-center">
                <h1 className="text-center text-4xl font-bold mb-8">
                    หมวดหมู่สินค้า
                </h1>
                {loading ? (
                    <ThreeDotsLoader />
                ) : (
                    <div className="flex flex-wrap justify-start gap-y-4">
                        {ssrProducts?.map((product, i) => (
                            <ProductCard key={i} product={product} />
                        ))}
                    </div>
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
                products: data.products
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
});
