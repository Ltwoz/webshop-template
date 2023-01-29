import ModalLayout from "../modal-layout/modal-layout";

const ErrorModal = (props) => {
    const { title, message, setIsOpen } = props;

    return (
        <ModalLayout allowOutsideClick={true} setIsOpen={setIsOpen}>
            <div className="w-[95vw] md:w-[26rem] px-6 py-6 flex flex-col items-center justify-between">
                <div className="relative w-full flex flex-col justify-center items-center">
                    <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-12 h-12 text-red-600"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                    <div className="mt-6 text-center">
                        <h3
                            className="text-2xl font-medium leading-6 text-gray-900"
                            id="modal-title"
                        >
                            {title}
                        </h3>
                        <p className="mt-3 text-base text-gray-500">
                            ไม่สามารถทำรายการ
                        </p>
                    </div>
                </div>
                <div className="mt-6 w-full flex flex-col">
                <div
                        onClick={() => setIsOpen(false)}
                        className="w-full rounded-lg py-2 bg-red-600 hover:bg-red-700 border border-gray-300 text-lg text-white text-center font-medium transition-all hover:cursor-pointer"
                    >
                        ปิด
                    </div>
                </div>
            </div>
        </ModalLayout>
    );
};

export default ErrorModal;
