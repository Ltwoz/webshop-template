import Image from "next/image";
import Link from "next/link";

const TopupCard = ({ title, image }) => {
    return (
        <Link
            href={`/topup/#`}
            className="
            group overflow-hidden rounded-2xl border shadow-lg relative bg-white
            hover:border-primary
            transition-all duration-150 ease-in-out
            "
        >
            <div className="w-full p-6 relative">
                <div
                    className="
                    w-full aspect-square relative flex items-center mx-auto 
                    transition-all group-hover:scale-105
                    "
                >
                    <Image
                        alt="product_img"
                        src={image}
                        unoptimized
                        draggable="false"
                        // width={334}
                        // height={334}
                        fill
                        className="select-none object-cover"
                    />
                </div>
                <div className="absolute bottom-3 inset-x-0 text-center text-sm text-red-600">
                    ไม่มีค่าธรรมเนียม
                </div>
            </div>
            <div className="w-full p-6 text-center bg-primary bg-opacity-50">
                <h1 className="text-lg font-semibold text-ally">{title}</h1>
            </div>
        </Link>
    );
};

export default TopupCard;
