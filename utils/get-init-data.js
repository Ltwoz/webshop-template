import axios from "axios";

export const getServerSideProps = async (ctx) => {
    // const token = ctx.req.cookies.token;
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

    return {
        props: {
            configs: config_data?.configs,
        },
    };
};

export const withInitProps = (serverFn) => {
    return async (req, res) => {
        const result = await serverFn(req, res);
        const config = await getServerSideProps(req);

        return {
            ...result,
            props: {
                ...config.props,
                ...result.props,
            },
        };
    };
};
