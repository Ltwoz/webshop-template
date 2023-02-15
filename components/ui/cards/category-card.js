import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ category }) => {
    return (
        <Link
            href={
                category.type === "STOCK"
                    ? `/store/${category._id}`
                    : `/store/idpass/${category._id}`
            }
            className="overflow-hidden rounded-xl shadow-lg relative transition-all md:hover:scale-105 active:scale-95 md:active:scale-100"
        >
            <div className="w-full h-[200px] relative flex items-center">
                <div className="absolute z-[1] right-0 bottom-0 left-0 w-full h-[50%] overflow-hidden bg-gradient-to-t from-black to-white/0 opacity-100"></div>
                <div className="absolute z-[1] top-0 right-0 left-0 w-full h-[30%] overflow-hidden bg-gradient-to-b from-black to-white/0 opacity-70"></div>
                <Image
                    alt="product_img"
                    src={category.image}
                    // unoptimized
                    draggable="false"
                    fill
                    className="select-none object-cover z-[0]"
                />
                <div className="flex absolute top-3 right-3 gap-x-2 z-[1]">
                    <div
                        className={
                            "py-1.5 px-2.5 leading-none text-sm text-white font-semibol rounded-xl" +
                            (category.products_count === 0
                                ? " bg-red-600/90"
                                : " bg-green-600/90")
                        }
                    >
                        {category.products_count === 0
                            ? "ไม่มีสินค้า"
                            : category.products_count + " ชิ้น"}
                    </div>
                    <div
                        className={
                            "py-1.5 px-2.5 leading-none text-sm text-white font-semibol rounded-xl" +
                            (category.type === "STOCK"
                                ? " bg-blue-600/90"
                                : " bg-violet-600/90")
                        }
                    >
                        {category.type === "STOCK" ? "Stock" : "ID-PASS"}
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full px-4 py-3 z-[1]">
                <h1 className="text-xl font-semibold text-white">
                    {category.name}
                </h1>
            </div>
        </Link>
    );
};

export default CategoryCard;
