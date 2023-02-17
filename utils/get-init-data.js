import axios from "axios";

export const getServerSideProps = async (ctx) => {
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
        props: {
            configs: data?.configs,
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
