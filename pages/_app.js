import "../styles/globals.css";
import { ConfigContextProvider } from "../contexts/config/config-context";
import { UserContextProvider } from "../contexts/user/user-context";

export default function App({ Component, pageProps }) {
    const { configs, user } = pageProps;

    return (
        <ConfigContextProvider value={configs}>
            <UserContextProvider value={user}>
                <Component {...pageProps} />
            </UserContextProvider>
        </ConfigContextProvider>
    );
}
