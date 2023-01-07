import Image from "next/image";
import Link from "next/link";

const ProductCard = () => {
    const text =
        "🎁ของที่สุ่ม🎁\n- ผลตื่น ผลสั่น แม็กม่า ผลพระ ฟีนิกซ์ ผลมืด ผลไฟ ผลแสง ผลน้ำแข็ง ผลด้าย ผลโมจิ\n- [ สุ่ม Item ต่าง ]\n- [ สุ่ม 2-5 หมัด ]\n- [สุ่มผลในกล่อง ]\n- [ เงิน 0-20M] + [สุ่มเงินม่วง 0-10k + ]";
    const str = text.replace(/(?:\r\n|\r|\n)/g, "<br>");

    return (
        <div className="px-2 w-full md:w-1/3 h-fit">
            <div className="overflow-hidden rounded-lg border shadow-lg">
                <div className="w-full aspect-square relative flex items-center">
                    <Image
                        alt="product_img"
                        src={`https://media.discordapp.net/attachments/717327142978977834/1058664433213259806/345_x_345_px.png`}
                        draggable="false"
                        // width={334}
                        // height={334}
                        fill
                        className="select-none object-cover"
                    />
                </div>
                <div className="p-6 bg-white">
                    <h1 className="text-xl font-semibold mb-4">
                        สินค้าตัวอย่าง
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
                            35<span className="text-base ml-1">บาท</span>
                        </p>
                        <p className="text-base">คงเหลือ 26 ชิ้น</p>
                    </div>
                    <Link
                        href={`/store`}
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
