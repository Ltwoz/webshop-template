import ModalLayout from "../modal-layout/modal-layout";

const ConfirmModal = (props) => {
    const { title, message, setIsOpen } = props;

    return (
        <ModalLayout>
            <div className="w-full px-6 py-4 flex items-center justify-between">
                <div className="flex w-[32rem]">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg
                            className="h-6 w-6 text-red-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                            />
                        </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                            className="text-lg font-medium leading-6 text-gray-900"
                            id="modal-title"
                        >
                            ยืนยันการซื้อสินค้า
                        </h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                สินค้าจำนวน 2 ชิ้น ราคา 80 บาท
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ModalLayout>
    );
};

export default ConfirmModal;
