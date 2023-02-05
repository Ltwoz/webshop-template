const BestSelling = ({ products }) => {
    return (
        <div className="flex flex-col overflow-x-auto">
            <ul>
                <li className="flex flex-row items-center justify-between py-3 px-3 bg-gray-200">
                    <div className="flex flex-row gap-x-4 items-center">
                        <div className="rounded-full bg-red-300 w-7 h-7 flex items-center justify-center">
                            1
                        </div>
                        <h1>Discord</h1>
                    </div>
                    <p>23 ชิ้น</p>
                </li>
                <li className="flex flex-row items-center justify-between py-3 px-3 bg-gray-100">
                    <div className="flex flex-row gap-x-4 items-center">
                        <div className="rounded-full bg-red-300 w-7 h-7 flex items-center justify-center">
                            2
                        </div>
                        <h1>Youtube</h1>
                    </div>
                    <p>19 ชิ้น</p>
                </li>
            </ul>
        </div>
    );
};

export default BestSelling;
