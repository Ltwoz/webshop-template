const LoadingSpiner = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="relative flex items-center">
                <div className="w-8 h-8 border-4 border-gray-300/80 border-t-4 border-t-gray-800/80 rounded-[50%] animate-spin"></div>
            </div>
        </div>
    );
};

export default LoadingSpiner;
