import { useRouter } from "next/router";

const DynamicProduct = () => {
    const router = useRouter();

    return (
        <div>
            {router.query.product}
        </div>
    );
}

export default DynamicProduct;