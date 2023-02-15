import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const ProductCard = ({ product }) => {
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();

        const isDesktop = window.matchMedia(`(min-width: 768px)`).matches;

        if (isDesktop) {
            return;
        }
        router.push(`/store/${product?.category?._id}/${product?._id}`);
    };

    return (
        <div
            className="w-full bg-white transition-all active:scale-95 md:active:scale-100 overflow-hidden rounded-xl shadow-lg"
            onClick={handleClick}
        >
            <div className="flex flex-row md:flex-col">
                <div className="w-full aspect-square m-2 md:m-0 rounded-lg md:rounded-none overflow-hidden relative flex items-center">
                    <Image
                        alt="product_img"
                        src={product?.image || `https://dummyimage.com/261x261`}
                        unoptimized
                        draggable="false"
                        fill
                        className="select-none object-cover"
                    />
                </div>
                <div className="py-3 pl-1 pr-4 md:p-6 w-2/3 md:w-full flex-shrink-0 md:flex-shrink flex flex-col justify-between">
                    <h1
                        className="text-lg md:text-xl font-medium overflow-hidden md:mb-4 h-[56px]"
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {product?.name}
                    </h1>
                    <div className="flex flex-row justify-between items-end md:items-center md:mb-4">
                        <p className="text-xl md:text-2xl leading-5 text-primary font-semibold">
                            {product?.price?.toLocaleString()}
                            <span className="text-sm ml-1">
                                บาท
                            </span>
                        </p>
                        <p
                            className={
                                "text-sm font-medium self-end leading-[1.5] md:leading-[1.8]" +
                                (product?.stock_count === 0
                                    ? " text-red-600"
                                    : "")
                            }
                        >
                            {product?.stock_count === 0
                                ? "สินค้าหมด"
                                : `เหลือ ${product?.stock_count} ชิ้น`}
                        </p>
                    </div>
                    <Link
                        href={`/store/${product?.category?._id}/${product?._id}`}
                        scroll={false}
                        className="hidden md:block rounded-md bg-primary transition ease-in-out duration-150"
                    >
                        <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                            <span className="block">ซื้อสินค้า</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
