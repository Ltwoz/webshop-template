import { ThreeDots } from "react-loader-spinner";

const ThreeDotsLoader = () => {
    return (
        <div className="min-h-[65vh] flex items-center justify-center">
            <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#5c6ac4"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    );
};

export default ThreeDotsLoader;
