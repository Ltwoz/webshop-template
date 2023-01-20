import "../styles/globals.css";
import { ConfigContextProvider } from "../contexts/config/config-context";
import { UserContextProvider } from "../contexts/user/user-context";
import { CategoryContextProvider } from "../contexts/category/category-context";
import { ProductContextProvider } from "../contexts/product/product-context";
import { OrderContextProvider } from "../contexts/order/order-context";

export default function App({ Component, pageProps }) {
    const { configs, user } = pageProps;

    return (
        <ConfigContextProvider value={configs}>
            <UserContextProvider value={user}>
                <CategoryContextProvider>
                    <ProductContextProvider>
                        <OrderContextProvider>
                            <Component {...pageProps} />
                        </OrderContextProvider>
                    </ProductContextProvider>
                </CategoryContextProvider>
            </UserContextProvider>
        </ConfigContextProvider>
    );
}
