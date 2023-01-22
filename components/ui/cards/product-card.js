import Image from "next/image";
import Link from "next/link";

const ProductCard = ({product}) => {
    const text = product?.description;
    const str = text.replace(/(?:\r\n|\r|\n)/g, "<br>");

    return (
        <div className="px-2 w-full md:w-1/4 h-fit">
            <div className="overflow-hidden rounded-xl shadow-lg">
                <div className="w-full aspect-square relative flex items-center">
                    <Image
                        alt="product_img"
                        src={product?.image ||`https://dummyimage.com/261x261`}
                        unoptimized
                        draggable="false"
                        // width={334}
                        // height={334}
                        fill
                        className="select-none object-cover"
                    />
                </div>
                <div className="p-6 bg-white">
                    <h1 className="text-xl font-semibold mb-4">
                        {product?.name}
                    </h1>
                    <p
                        className="text-md font-normal overflow-hidden mb-6 h-[72px]"
                        dangerouslySetInnerHTML={{ __html: str }}
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                        }}
                    />
                    <div className="flex justify-between items-center">
                        <p className="text-2xl text-cyan-700 font-semibold">
                            {product?.price}<span className="text-base ml-1">บาท</span>
                        </p>
                        <p className="text-sm">คงเหลือ {product?.stock_count} ชิ้น</p>
                    </div>
                    <Link
                        href={`/store/${product?.category?._id}/${product?._id}`}
                        className="block text-md text-white text-center mt-4 p-2 rounded-md bg-primary hover:bg-cyan-700 transition ease-in-out duration-150 hover:scale-[1.02]"
                    >
                        ซื้อสินค้า
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
