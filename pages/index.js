import axios from "axios";
import Image from "next/image";
import { useContext } from "react";
import Layout from "../components/layouts/main-layout";
import ProductCard from "../components/ui/cards/product-card";
import StatCard from "../components/ui/cards/stat-card";
import ConfigsContext from "../contexts/config/config-context";
import { withInitProps } from "../utils/get-init-data";

export default function Home({stats}) {
    const { configs } = useContext(ConfigsContext);

    return (
        <Layout>
            <main className="max-w-[1150px] px-2 sm:px-[17px] pb-4 sm:pb-[25px] pt-24 md:pt-28 mx-auto min-h-screen items-center">
                <div className="flex flex-col gap-y-4 md:gap-y-8">
                    <section
                        id="banner"
                        className="flex justify-center items-center px-2"
                    >
                        <Image
                            alt="homepage_banner"
                            src={configs?.website_banner || "https://cdn.discordapp.com/attachments/717327142978977834/1058663751185870939/1100x250.png"}
                            // src="https://cdn.discordapp.com/attachments/717327142978977834/1058663751185870939/1100x250.png"
                            draggable="false"
                            width={1100}
                            height={350}
                            className="max-h-[350px] rounded-lg shadow-md"
                        />
                    </section>

                    <section id="stats" className="px-2">
                        <StatCard stats={stats} />
                    </section>

                    <section id="products">
                        <div className="flex flex-wrap justify-start gap-y-4">
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
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
