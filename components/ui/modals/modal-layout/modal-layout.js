import { motion } from "framer-motion";
import { createPortal } from "react-dom";

const ModalLayout = ({ children, setIsOpen, allowOutsideClick }) => {
    const handleOutsideClick = (e) => {
        e.preventDefault();

        if (allowOutsideClick) {
            setIsOpen(false)
        }
    }

    return (
        <>
            {createPortal(
                <motion.div
                    className="z-[99] fixed h-screen w-screen top-0 left-0 bg-black/40"
                    onClick={handleOutsideClick}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <motion.div
                        className="z-10 inset-0 fixed h-fit w-fit bg-white shadow-md rounded-lg divide-y m-auto"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ y: "5vh", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "5vh", opacity: 0 }}
                        transition={{
                            duration: 0.25,
                            type: "spring",
                            stiffness: 600,
                            damping: 30,
                        }}
                    >
                        {children}
                    </motion.div>
                </motion.div>,
                document.getElementById("portal")
            )}
        </>
    );
};

export default ModalLayout;
