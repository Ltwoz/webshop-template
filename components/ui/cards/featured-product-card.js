import Image from "next/image";
import Link from "next/link";

const FeaturedProductCard = ({ product }) => {
    return (
        <div className="w-full bg-white overflow-hidden rounded-xl shadow-lg">
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
            <div className="p-4 bg-white">
                <h1
                    className="text-xl font-medium overflow-hidden mb-4 h-[56px]"
                    style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {product?.name}
                </h1>
                <div className="flex flex-row justify-between items-center mb-4">
                    <p className="text-2xl text-primary font-semibold">
                        {product?.price?.toLocaleString()}
                        <span className="text-sm ml-1">บาท</span>
                    </p>
                    <p
                        className={
                            "text-sm font-medium self-end leading-[1.8]" +
                            (product?.stock_count === 0 ? " text-red-600" : "")
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
                    className="block rounded-md bg-primary transition ease-in-out duration-150"
                >
                    <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                        <span className="block">ซื้อสินค้า</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default FeaturedProductCard;
