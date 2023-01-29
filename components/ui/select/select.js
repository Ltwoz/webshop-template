import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

const Select = (props) => {
    const { placeholder, list, selected, setSelected } = props;

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (e, select) => {
        e.preventDefault();
        setIsOpen(false)
        setSelected(select);
    };

    return (
        <div className="w-full relative select-none hover:cursor-pointer">
            <div
                className="flex items-center justify-between mt-1 p-2 w-full rounded-md border border-gray-300 shadow-sm md:text-base"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {selected || (<p className="text-gray-400">{placeholder}</p>)}
                <BiChevronDown size={20} className={`${isOpen && "rotate-180"}`} />
            </div>
            {isOpen && (
                <ul className="absolute bg-white mt-2 w-full overflow-y-hidden max-h-60 text-base rounded-md border border-gray-300">
                    {list.map((item, i) => (
                        <li
                            key={i}
                            onClick={(e) => {handleClick(e, item.name)}}
                            className="py-2 px-4 hover:bg-primary hover:text-white"
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Select;
