import Image from "next/image";

const IdPassProductCard = (props) => {
    const { handlerProductSelect, selectedProduct, product } = props;

    return (
        <div
            onClick={() => handlerProductSelect(product)}
            className={
                "select-none overflow-hidden rounded-xl border cursor-pointer bg-white shadow-md transition-all active:scale-[.98]" +
                (selectedProduct._id === product._id ? " border-primary" : "")
            }
        >
            <div
                className={
                    "p-3" +
                    (selectedProduct._id === product._id
                        ? " bg-primary bg-opacity-[0.2] hover:bg-opacity-[0.2]"
                        : " hover:bg-primary hover:bg-opacity-[0.1]")
                }
            >
                <div className="w-full aspect-video rounded-lg overflow-hidden relative flex items-center">
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
                <h1 className="mt-4 text-xl text-center font-semibold">
                    {product?.name}
                </h1>
                <p className="mt-2 text-lg text-center text-primary font-medium">
                    {product?.price}
                    <span className="text-base ml-1">บาท</span>
                </p>
            </div>
        </div>
    );
};

export default IdPassProductCard;
