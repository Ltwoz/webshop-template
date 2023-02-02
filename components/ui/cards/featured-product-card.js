import Image from "next/image";
import Link from "next/link";

const FeaturedProductCard = ({ product }) => {
    return (
        <div className="w-full">
            <div className="overflow-hidden rounded-xl shadow-lg">
                <div className="w-full aspect-square relative flex items-center">
                    <Image
                        alt="product_img"
                        src={product?.image || `https://dummyimage.com/261x261`}
                        unoptimized
                        draggable="false"
                        // width={334}
                        // height={334}
                        fill
                        className="select-none object-cover"
                    />
                </div>
                <div className="p-6 bg-white">
                    <h1
                        className="text-xl font-semibold overflow-hidden mb-4 h-[56px]"
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {product?.name}
                    </h1>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-3xl md:text-2xl text-primary font-semibold">
                            {product?.price?.toLocaleString()}
                            <span className="text-lg md:text-base ml-1">
                                บาท
                            </span>
                        </p>
                        <p
                            className={
                                "text-base md:text-sm font-medium" +
                                (product?.stock_count === 0
                                    ? " text-red-600"
                                    : "")
                            }
                        >
                            {product?.stock_count === 0
                                ? "สินค้าหมด"
                                : `คงเหลือ ${product?.stock_count} ชิ้น`}
                        </p>
                    </div>
                    <Link
                        href={`/store/${product?.category?._id}/${product?._id}`}
                        scroll={false}
                        className="block text-md text-white text-center p-2 rounded-md bg-primary hover:bg-primary/ transition ease-in-out duration-150 hover:scale-[1.02]"
                    >
                        ซื้อสินค้า
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProductCard;
