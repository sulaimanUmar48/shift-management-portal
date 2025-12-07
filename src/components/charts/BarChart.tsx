import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js"

import type {ChartData} from "chart.js"

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

type BarChartData = ChartData<"bar">

export function BarChart(){
    const data: BarChartData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
            {
                label: "Hours Worked",
                data: [3, 6, 10, 5, 8],
                backgroundColor: "#05592a",
                borderRadius: 10,
                barThickness: 40
            }
        ]
    }

    const options = {
        reponsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 2
                }

            },

            x: {
                grid: {
                    display: false
                }
            }
        }
    }


    return <Bar data={data} options={options}/>
}