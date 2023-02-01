import { motion } from "framer-motion";
import { createPortal } from "react-dom";

const ToastLayout = (props) => {
    const { children } = props;

    return (
        <>
            {createPortal(
                <div className="z-[98] fixed inset-0 flex flex-col items-center justify-end md:items-end md:justify-end p-4 md:p-6 gap-y-2 pointer-events-none transition-all">
                    {children}
                </div>,
                document.getElementById("portal")
            )}
        </>
    );
};

export default ToastLayout;
