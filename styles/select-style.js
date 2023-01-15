export const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    valueContainer: (styles) => ({...styles, padding: "4px 8px"}),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            color: "#000",
            cursor: isDisabled ? "not-allowed" : "default",
        };
    },
};
