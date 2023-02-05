const MiniStatCard = (props) => {
    const { title, value, icon, color } = props;

    return (
        <div className="col-span-3 md:col-span-1 flex flex-row justify-around p-6 bg-white rounded-md border shadow">
            <div className="my-auto">
                <h4 className="text-lg md:text-base lg:text-lg text-grey tracking-wide mb-2">
                    {title}
                </h4>
                <h1 className="text-3xl md:text-2xl lg:text-4xl font-medium">
                    {value}
                </h1>
            </div>
            <div className={`text-${color}-600 my-auto bg-${color}-500/20 rounded-full p-4`}>
                {icon}
            </div>
        </div>
    );
};

export default MiniStatCard;
