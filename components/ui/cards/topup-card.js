import Image from "next/image";
import Link from "next/link";

const TopupCard = ({ title, image }) => {
    return (
        <Link
            href={`/topup/#`}
            className="
            overflow-hidden rounded-xl border shadow-lg relative 
            hover:border-red-600
            transition-all duration-150 ease-in-out
            "
        >
            <div className="w-full bg-white relative">
                <div className="w-[70%] aspect-[1/1] relative flex items-center mx-auto">
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
                <div className="text-center text-sm text-red-600">
                    ไม่มีค่าธรรมเนียม
                </div>
            </div>
            <div className="w-full p-6 text-center bg-gray-200/80">
                <h1 className="text-lg font-semibold">{title}</h1>
            </div>
        </Link>
    );
};

export default TopupCard;
