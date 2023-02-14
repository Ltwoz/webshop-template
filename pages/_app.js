import "../styles/globals.css";
import { ConfigContextProvider } from "../contexts/config/config-context";
import { CategoryContextProvider } from "../contexts/category/category-context";
import { ProductContextProvider } from "../contexts/product/product-context";
import NextNProgress from "nextjs-progressbar";
import { SessionProvider } from "next-auth/react";
import Protected from "../utils/protected-page";

import { AnimatePresence } from "framer-motion";
import { ToastContextProvider } from "../contexts/toast/toast-context";

export default function App({ Component, pageProps, router }) {
    const { configs, session } = pageProps;

    return (
        <SessionProvider session={session}>
            <ConfigContextProvider value={configs}>
                <CategoryContextProvider>
                    <ProductContextProvider>
                        <ToastContextProvider>
                            <NextNProgress
                                color={configs?.style?.primary_color}
                                startPosition={0.3}
                                stopDelayMs={200}
                                height={2}
                                showOnShallow={true}
                                options={{ showSpinner: false }}
                            />
                            <AnimatePresence mode="wait" initial={false}>
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
                    </ProductContextProvider>
                </CategoryContextProvider>
            </ConfigContextProvider>
        </SessionProvider>
    );
}