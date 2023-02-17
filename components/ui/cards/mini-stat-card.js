const MiniStatCard = (props) => {
    const { title, value, icon, color } = props;

    return (
        <div className="col-span-3 md:col-span-2 flex flex-col-reverse md:flex-row items-center md:justify-around p-6 bg-white rounded-md border shadow">
            <div className="my-auto flex flex-col items-center md:items-start justify-center">
                <h4 className="text-base lg:text-lg text-grey tracking-wide mb-2">
                    {title}
                </h4>
                <h1 className="text-2xl lg:text-4xl font-medium">
                    {value}
                </h1>
            </div>
            <div className={`text-${color}-600 bg-${color}-500/20 my-auto rounded-full p-4`}>
                {icon}
            </div>
        </div>
    );
};

export default MiniStatCard;
