import "../styles/globals.css";
import Layout from "../components/layouts/main-layout";

import { ConfigsContextProvider } from "../contexts/configs-context";
import { UserContextProvider } from "../contexts/user/user-context";

export default function App({ Component, pageProps }) {
    const { configs, user } = pageProps;

    return (
        <ConfigsContextProvider value={configs}>
            <UserContextProvider value={user}>
                <Component {...pageProps} />
            </UserContextProvider>
        </ConfigsContextProvider>
    );
}
