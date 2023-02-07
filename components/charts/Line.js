import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const options = {
    plugins: {
        legend: {
            display: false,
        },
    },
    maintainAspectRatio: false,
};

const LineChart = (props) => {
    return (
        <div className="w-full h-full">
            <Line data={props.data} options={options} />
        </div>
    );
};

export default LineChart;
