import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

const Select = (props) => {
    const { placeholder, options, selected, setSelected } = props;

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (e, select) => {
        e.stopPropagation();
        setIsOpen(false);
        setSelected(select);
    };

    useEffect(() => {
        const openHandler = () => setIsOpen(false);

        window.addEventListener("click", openHandler);

        return () => {
            window.removeEventListener("click", openHandler);
        };
    }, []);

    return (
        <div className="w-full relative select-none hover:cursor-pointer">
            <div
                className="flex items-center justify-between p-2 w-full rounded-md border border-gray-300 shadow-sm md:text-base"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen((prev) => !prev);
                }}
            >
                {selected.label || (
                    <p className="text-gray-400">{placeholder}</p>
                )}
                <BiChevronDown
                    size={20}
                    className={`${isOpen && "rotate-180"}`}
                />
            </div>
            {isOpen && (
                <ul className="absolute bg-white mt-2 py-2 w-full overflow-y-hidden max-h-60 text-base rounded-md border border-gray-300 z-10">
                    {options.map((option, i) => (
                        <li
                            key={i}
                            onClick={(e) => {
                                handleClick(e, option);
                            }}
                            className={`py-2 px-4 hover:bg-primary hover:text-white transition-all ${
                                selected.value === option.value &&
                                "bg-primary text-white"
                            }`}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Select;
