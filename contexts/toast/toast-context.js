import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import style from "../../styles/toast.module.css";
import { AnimatePresence } from "framer-motion";
// import ToastLayout from "../../components/ui/toasts/toast-layout";

const ToastLayout = dynamic(() =>
    import("../../components/ui/toasts/toast-layout")
);

const ToastContext = createContext();

export const ToastContextProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const [loading, setLoading] = useState(true);

    const add = useCallback((content, options) => {
        const { title, text, icon } = content;

        const toast = { id: Date.now(), title, text, icon, ...options };

        setToasts((currentToasts) => [...currentToasts, toast]);
    }, []);

    const close = useCallback((id) => {
        setToasts((currentToasts) =>
            currentToasts.filter((toast) => toast.id !== id)
        );
    }, []);

    useEffect(() => {
        setLoading(false);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (toasts.length) {
                close(toasts[0].id);
            }
        }, 3000);
    }, [toasts, close]);

    const contextValue = useMemo(() => ({ add }), [add]);

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            {!loading && (
                <ToastLayout>
                    <AnimatePresence initial={false}>
                        {toasts?.map(({ id, title, text, icon, ...rest }) => {
                            const bgbyIcon =
                                icon === "success"
                                    ? "#16a34a"
                                    : icon === "warning"
                                    ? "#eab308"
                                    : "#ef4444";
                            const textbyIcon =
                                icon === "success"
                                    ? "#15803b"
                                    : icon === "warning"
                                    ? "#ca8a04"
                                    : "#b91c1c";
                            const svgbyIcon =
                                icon === "success"
                                    ? "M4.5 12.75l6 6 9-13.5"
                                    : icon === "warning"
                                    ? "M12 19v.01 M12 15v-10"
                                    : "M6 18L18 6M6 6l12 12";

                            return (
                                <motion.div
                                    key={id}
                                    className={style.toast}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.7 }}
                                    transition={{
                                        duration: 0.15,
                                        delay: 0.1,
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30,
                                    }}
                                >
                                    <div
                                        className={style.icon}
                                        style={{
                                            backgroundColor: bgbyIcon,
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={3}
                                            stroke="currentColor"
                                            className="w-6 h-6 text-white"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d={svgbyIcon}
                                            />
                                        </svg>
                                    </div>
                                    <div className={style.body}>
                                        <p
                                            className={style.title}
                                            style={{
                                                color: textbyIcon,
                                            }}
                                        >
                                            {title}
                                        </p>
                                        <p className={style.text}>{text}</p>
                                    </div>
                                    <div className={style.close_container}>
                                        <div
                                            onClick={() => close(id)}
                                            className={style.close}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </ToastLayout>
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
