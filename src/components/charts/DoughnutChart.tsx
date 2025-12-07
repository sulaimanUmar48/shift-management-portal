import {Chart as ChartJS, ArcElement, Tooltip, Legend, Filler} from "chart.js"
import { Doughnut } from "react-chartjs-2"
import type { ChartOptions } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend, Filler)

const DoughnutChart = () => {
const data = {
    datasets: [
      {
        label: "Lateness",
        data: [90, 10],
        backgroundColor: ["#0E6B37", "#eee"],
        borderRadius: 5,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    cutout: "70%", 
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    maintainAspectRatio: false,
    responsive: true,
    animation: {
      duration: 1200, 
      easing: "easeOutQuad", 
    },
  };

  return (
    <div className={'w-full h-full relative'}>
        <Doughnut data={data} options={options} />
        <span className={`absolute top-1/2 left-1/2 -translate-1/2 font-semibold text-lg`}>
            90%
        </span>
    </div>
  );
}

export default DoughnutChart