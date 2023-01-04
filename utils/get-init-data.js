import axios from "axios";

export const getServerSideProps = async (ctx) => {
    const token = ctx.req.cookies.token;
    // console.log("ssr cookie :", token);

    const config_raw = await axios(`http://${ctx.req.headers.host}/api/configs`);
    const config_data = await config_raw.data

    const user_raw = await axios(`http://${ctx.req.headers.host}/api/auth/@me`, {
        headers: {
            Cookie: `token=${token}`,
        }
    });
    const user_data = await user_raw.data

    return {
        props: {
            user: user_data.success ? user_data.user : null,
            configs: config_data.configs
        }
    }
}

export const withInitProps = (serverFn) => {
    return async (req, res) => {
        const result = await serverFn(req, res);
        const config = await getServerSideProps(req);
        
        return {
            ...result,
            props: {
                ...config.props,
                ...result.props
            }
        }
    }
}