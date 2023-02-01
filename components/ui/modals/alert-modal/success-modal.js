import Link from "next/link";
import ModalLayout from "../modal-layout/modal-layout";

const SuccessModal = (props) => {
    const { title, message, setIsOpen, href, confirmText } = props;

    return (
        <ModalLayout allowOutsideClick={true} setIsOpen={setIsOpen}>
            <div className="w-[95vw] md:w-[26rem] px-6 py-6 flex flex-col items-center justify-between">
                <div className="relative w-full flex flex-col justify-center items-center">
                    <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-12 h-12 text-green-600"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
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
                            {message}
                        </p>
                    </div>
                </div>
                <div className="mt-6 w-full flex flex-col">
                    {href ? (
                        <Link
                            href={href}
                            onClick={() => setIsOpen(false)}
                            className="w-full rounded-lg py-2 bg-green-600 text-lg text-white text-center font-medium transition-all hover:scale-[1.01]"
                        >
                            {confirmText}
                        </Link>
                    ) : (
                        <div
                            onClick={() => setIsOpen(false)}
                            className="w-full rounded-lg py-2 bg-green-600 text-lg text-white text-center font-medium transition-all hover:scale-[1.01] hover:cursor-pointer"
                        >
                            {confirmText}
                        </div>
                    )}
                </div>
            </div>
        </ModalLayout>
    );
};

export default SuccessModal;
