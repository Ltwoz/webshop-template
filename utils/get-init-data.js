import axios from "axios";

export const getServerSideProps = async (ctx) => {
    const token = ctx.req.cookies.token;
    // console.log("ssr cookie :", token);
    const nextRequestMeta = ctx.req[Reflect.ownKeys(ctx.req).find(
        (s) => String(s) === "Symbol(NextRequestMeta)"
    )];
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
        console.log("Not Login.");
    }
    console.log("get init data");
    return {
        props: {
            user: user_data?.success ? user_data?.user : null,
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
