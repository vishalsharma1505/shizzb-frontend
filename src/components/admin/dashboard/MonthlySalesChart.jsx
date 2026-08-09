import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const MonthlySalesChart = ({ data = [] }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const labels = data.map(
    (item) => months[item._id.month - 1]
  );

  const revenues = data.map(
    (item) => item.revenue || 0
  );

  const chartData = {
    labels,

    datasets: [
      {
        label: "Monthly Revenue (₹)",

        data: revenues,

        borderColor: "#4f46e5",

        backgroundColor: "rgba(79,70,229,.15)",

        borderWidth: 3,

        pointRadius: 5,

        pointHoverRadius: 8,

        pointBackgroundColor: "#4f46e5",

        fill: true,

        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    interaction: {
      intersect: false,
      mode: "index",
    },

    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "center",

        labels: {
          usePointStyle: true,
          boxWidth: 12,
          font: {
            size: 13,
            weight: "600",
          },
        },
      },

      tooltip: {
        backgroundColor: "#111827",
        padding: 12,

        callbacks: {
          label: function (context) {
            return ` Revenue : ₹ ${context.raw}`;
          },
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#666",
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          color: "#666",

          callback(value) {
            return "₹ " + value;
          },
        },

        grid: {
          color: "#ececec",
        },
      },
    },
  };

  return (
    <div className="chart-card">

      <div className="chart-header">

        <h3>Monthly Sales</h3>

      </div>

      <div className="chart-body">

        <Line
          data={chartData}
          options={options}
        />

      </div>

    </div>
  );
};

export default MonthlySalesChart;