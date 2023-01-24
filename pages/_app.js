import "../styles/globals.css";
import { ConfigContextProvider } from "../contexts/config/config-context";
import { UserContextProvider } from "../contexts/user/user-context";
import { CategoryContextProvider } from "../contexts/category/category-context";
import { ProductContextProvider } from "../contexts/product/product-context";
import { HistoryContextProvider } from "../contexts/history/history-context";
import NextNProgress from "nextjs-progressbar";
import dynamic from "next/dynamic";
import axios from "axios";
// const NextNProgress = dynamic(() => import("nextjs-progressbar"), {
//     ssr: false,
// });

export default function App({ Component, pageProps }) {
    const { configs, user } = pageProps;

    return (
        <ConfigContextProvider value={configs}>
            <UserContextProvider value={user}>
                <CategoryContextProvider>
                    <ProductContextProvider>
                        <HistoryContextProvider>
                            <NextNProgress
                                color="#29D"
                                startPosition={0.7}
                                stopDelayMs={200}
                                height={2}
                                showOnShallow={true}
                                options={{ showSpinner: false }}
                            />
                            <Component {...pageProps} />
                        </HistoryContextProvider>
                    </ProductContextProvider>
                </CategoryContextProvider>
            </UserContextProvider>
        </ConfigContextProvider>
    );
}

App.getInitialProps = async (appContext) => {
    const ctx = appContext.ctx

    const token = ctx.req.cookies.token;
    // console.log("ssr cookie :", token);
    const nextRequestMeta =
        ctx.req[
            Reflect.ownKeys(ctx.req).find(
                (s) => String(s) === "Symbol(NextRequestMeta)"
            )
        ];
    const protocal = nextRequestMeta._protocol;

    const config_raw = await axios(
        `${protocal}://${ctx.req.headers.host}/api/configs`
    );
    const config_data = await config_raw.data;

    let user_data;
    try {
        const user_raw = await axios(
            `${protocal}://${ctx.req.headers.host}/api/auth/@me`,
            {
                headers: {
                    Cookie: `token=${token}`,
                },
            }
        );
        user_data = await user_raw.data;
    } catch (error) {
        // console.log("Not Login.");
    }

    return {
        pageProps: {
            user: user_data?.success ? user_data.user : null,
            configs: config_data?.configs,
        },
    };
};
