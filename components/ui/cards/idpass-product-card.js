import Image from "next/image";

const IdPassProductCard = (props) => {
    const { handlerProductSelect, selectedProduct, product } = props;

    return (
        <div
            onClick={() => handlerProductSelect(product)}
            className={
                "select-none overflow-hidden rounded-xl border cursor-pointer p-3 bg-white shadow-md transition-all hover:bg-red-50 active:scale-[.98]" +
                (selectedProduct._id === product._id ? " border-red-500" : "")
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
            <h1 className="mt-4 text-xl text-center font-semibold">{product?.name}</h1>
            <p className="mt-2 text-lg text-center text-primary font-medium">
                {product?.price}
                <span className="text-base ml-1">บาท</span>
            </p>
        </div>
    );
};

export default IdPassProductCard;
