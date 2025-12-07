import {Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement,Tooltip, Legend, Filler} from "chart.js"
import {Line} from "react-chartjs-2"
import type { ChartOptions } from "chart.js"

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler)

const LineChart = () => {

    const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Shifts Scheduled",
        data: [10, 5, 7, 8, 8, 3, 5],
        borderColor: "#0E6B37",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4, // makes the line smooth
        fill: true, // fills the area under the line
        pointRadius: 2,
        pointHoverRadius: 6,
        borderWidth: 2,
      },

      {
        label: "Shifts Filled",
        data: [8, 5, 6, 4, 8, 3, 4],
        borderColor: "rgba(14, 107, 55, 0.25)",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.2, // makes the line smooth
        fill: true, // fills the area under the line
        pointRadius: 3,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
    ],
  }

    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        legend: {
            display: true,
            position: "bottom",
            labels:{
                font:{
                    size: 9,
                    weight: 500 
                },
                boxWidth: 10,
                boxHeight: 6,
            }
        },
        tooltip: {
            enabled: true,
            backgroundColor: "#333",
            titleColor: "#fff",
            bodyColor: "#fff",
        },
        },
        scales: {
        x: {
            grid: {
            display: true ,
            },
            ticks: {
                font:{
                    size: 10
                }
            },
        },
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 3,
                font:{
                    size: 8
                }
            },
            grid: {
                display: true,            
                color: "rgba(0,0,0,0.1)",   
                lineWidth: 1,
            },
            title: {
                display: true,   
                text: "Shifts",
                color: "#333",
                font: { size: 10, weight: 400 },
            },
        },
    },
    animation: {
      duration: 1200,
      easing: "easeOutQuart",
    },

    animations: {
        y: {
        duration: 1200,
        easing: "easeOutQuart",
        from: 0, // start from zero height
        },
    }
  }




  return (
    <div className="relative w-full h-full p-2">
      <Line data={data} options={options} />
    </div>
  )
}

export default LineChart