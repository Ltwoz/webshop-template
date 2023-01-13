import { useRouter } from "next/router";

const DynamicCategory = () => {
    const router = useRouter();

    return (
        <div>
            {router.query.category}
        </div>
    );
}

export default DynamicCategory;