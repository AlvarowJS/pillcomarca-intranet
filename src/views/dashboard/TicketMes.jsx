import React from 'react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import { Bar } from 'react-chartjs-2'
const TicketMes = ({
    totalTicketMes, labelTicketMes, maxTotalTicketMes
}) => {

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 500 },
        scales: {
            x: {
                grid: {
                    color: '#F3F3F3',
                    borderColor: '#F3F3F3'
                },
                ticks: { color: '#5E5873' }
            },
            y: {
                min: 0,
                max: maxTotalTicketMes,
                grid: {
                    color: '#F3F3F3',
                    borderColor: '#F3F3F3'
                },
                ticks: {
                    stepSize: 100,
                    color: '#5E5873'
                }
            }
        },
        plugins: {
            legend: { display: false }
        }
    }
    const data = {
        labels: labelTicketMes,
        datasets: [
            {
                maxBarThickness: 15,
                backgroundColor: '#00E8CD',
                borderColor: 'transparent',
                borderRadius: { topRight: 15, topLeft: 15 },
                data: totalTicketMes
            }
        ]
    }

    return (
        <>
            <Bar data={data} options={options} height={400} />
        </>
    )
}

export default TicketMes