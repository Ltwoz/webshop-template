import Image from "next/image";
import Link from "next/link";

const TopupCard = () => {
    return (
        // <div className="overflow-hidden rounded-lg border shadow-sm text-center w-full sm:w-[345px] h-fit">
        //     <div className="w-full h-[90vw] sm:h-[345px] relative flex items-center">
        //         <Image
        //             alt="truemoney_angpao"
        //             src={`https://media.discordapp.net/attachments/717327142978977834/1058664433213259806/345_x_345_px.png`}
        //             draggable="false"
        //             // width={334}
        //             // height={334}
        //             fill
        //             className="select-none object-cover"
        //         />
        //     </div>
        // </div>
        <div className="overflow-hidden rounded-xl border shadow-md w-full divide-y">
            <div id="payment-method" className=" px-6 py-6">
                <h2 className="text-md md:text-lg font-medium">ช่องทางการเติมเงิน</h2>
                <div id="payment-group">
                    <div id="payment-item" className="flex flex-col">
                        test
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopupCard;
