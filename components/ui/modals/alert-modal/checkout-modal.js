import ModalLayout from "../modal-layout/modal-layout";

const CheckoutModal = (props) => {
    const { title, message, setIsOpen, handler } = props;

    return (
        <ModalLayout allowOutsideClick={true} setIsOpen={setIsOpen}>
            <div className="w-[95vw] md:w-[26rem] px-6 py-6 flex flex-col items-center justify-between select-none">
                <div className="relative w-full flex flex-col justify-center items-center">
                    <div className="flex h-20 w-20 text-5xl text-blue-600 font-medium flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                        ?
                    </div>
                    <div className="mt-6 text-center">
                        <h3
                            className="text-2xl font-medium leading-6 text-gray-900"
                            id="modal-title"
                        >
                            ยืนยันการซื้อสินค้า
                        </h3>
                        <p className="mt-3 text-base text-gray-500">
                            กรุณาตรวจสอบรายละเอียด ก่อนชำระเงิน
                        </p>
                    </div>
                </div>
                <div className="mt-6 w-full flex flex-row gap-x-4">
                    <div
                        onClick={handler}
                        className="w-full rounded-lg py-2 bg-primary text-lg text-white text-center font-medium transition-all hover:cursor-pointer"
                    >
                        ชำระเงิน
                    </div>
                    <div
                        onClick={() => setIsOpen(false)}
                        className="w-full rounded-lg py-2 bg-white hover:bg-gray-100 border border-gray-300 text-lg text-black text-center font-medium transition-all hover:cursor-pointer"
                    >
                        ยกเลิก
                    </div>
                </div>
            </div>
        </ModalLayout>
    );
};

export default CheckoutModal;
