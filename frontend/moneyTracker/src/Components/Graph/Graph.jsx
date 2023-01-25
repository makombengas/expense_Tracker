import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import Labels from "../Labels/Labels";

Chart.register(ArcElement);
const data = {
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};
const config = {
  data: {
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
        borderRadius: 30,
        spacing: 10,
      },
    ],
  },
  options: {
    cutout: 115,
  },
};
const Graph = () => {
  const chartStyle = {
    position: "absolute",
    left: "0",
    right: "0",
    top: "40%",
    marginLeft: "auto",
    marginRight: "auto",
  };
  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative">
          <Doughnut {...config} />
          <h3 className="mb-4 font-bold title " style={chartStyle}>
            Total
            <span className="block text-3xl text-emerald-400">€{0}</span>
          </h3>
        </div>
        <div className="flex flex-col py-10 gap-4">
          {/*Labels*/}
          <Labels />
        </div>
      </div>
    </div>
  );
};

export default Graph;
