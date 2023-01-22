import "../styles/globals.css";
import { ConfigContextProvider } from "../contexts/config/config-context";
import { UserContextProvider } from "../contexts/user/user-context";
import { CategoryContextProvider } from "../contexts/category/category-context";
import { ProductContextProvider } from "../contexts/product/product-context";
import dynamic from "next/dynamic";
import { HistoryContextProvider } from "../contexts/history/history-context";
const NextNProgress = dynamic(() => import("nextjs-progressbar"), {
    ssr: false,
});

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
                                options={{ showSpinner: false, }}
                            />
                            <Component {...pageProps} />
                        </HistoryContextProvider>
                    </ProductContextProvider>
                </CategoryContextProvider>
            </UserContextProvider>
        </ConfigContextProvider>
    );
}
