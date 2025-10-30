import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart = () => {
const data = {
    datasets: [
      {
        label: "Lateness",
        data: [90, 10],
        backgroundColor: ["#0E6B37", "#eee"], // use #eee (with #)
        borderRadius: 5,
      },
    ],
  };

  const options: any = {
    cutout: "70%", // makes it a nice ring
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    maintainAspectRatio: false,
    responsive: true,
    animation: {
      duration: 1200, // 2 seconds
      easing: "easeOutQuad", // try "easeInOutQuad" or "easeOutElastic"
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