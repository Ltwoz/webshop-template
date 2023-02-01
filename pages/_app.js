import "../styles/globals.css";
import { ConfigContextProvider } from "../contexts/config/config-context";
import { UserContextProvider } from "../contexts/user/user-context";
import { CategoryContextProvider } from "../contexts/category/category-context";
import { ProductContextProvider } from "../contexts/product/product-context";
import { HistoryContextProvider } from "../contexts/history/history-context";
import NextNProgress from "nextjs-progressbar";
import axios from "axios";
import { SessionProvider } from "next-auth/react";
import Protected from "../utils/protected-page";

import { AnimatePresence } from "framer-motion";
import { ToastContextProvider } from "../contexts/toast/toast-context";

export default function App({ Component, pageProps, router }) {
    const { configs, session } = pageProps;

    return (
        <SessionProvider session={session}>
            <ConfigContextProvider value={configs}>
                <UserContextProvider>
                    <CategoryContextProvider>
                        <ProductContextProvider>
                            <HistoryContextProvider>
                                <ToastContextProvider>
                                    <NextNProgress
                                        color={configs?.style?.primary_color}
                                        startPosition={0.3}
                                        stopDelayMs={200}
                                        height={2}
                                        showOnShallow={true}
                                        options={{ showSpinner: false }}
                                    />
                                    <AnimatePresence
                                        mode="wait"
                                        initial={false}
                                    >
                                        {Component.auth ? (
                                            <Protected>
                                                <Component
                                                    {...pageProps}
                                                    key={router.pathname}
                                                />
                                            </Protected>
                                        ) : (
                                            <Component
                                                {...pageProps}
                                                key={router.pathname}
                                            />
                                        )}
                                    </AnimatePresence>
                                </ToastContextProvider>
                            </HistoryContextProvider>
                        </ProductContextProvider>
                    </CategoryContextProvider>
                </UserContextProvider>
            </ConfigContextProvider>
        </SessionProvider>
    );
}

App.getInitialProps = async (appContext) => {
    const ctx = appContext.ctx;

    const nextRequestMeta =
        ctx.req[
            Reflect.ownKeys(ctx.req).find(
                (s) => String(s) === "Symbol(NextRequestMeta)"
            )
        ];
    const protocal = nextRequestMeta._protocol;

    const { data } = await axios(
        `${protocal}://${ctx.req.headers.host}/api/configs`
    );

    return {
        pageProps: {
            configs: data?.configs,
        },
    };
};
