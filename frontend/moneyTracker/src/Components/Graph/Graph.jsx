import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import Labels from "../Labels/Labels";
import { default as api } from "../.././Store/ApiSlice";
import { chartData, getTotal } from "../.././Helpers/Helper";

Chart.register(ArcElement);

const Graph = () => {
  const chartStyle = {
    position: "absolute",
    left: "0",
    right: "0",
    top: "40%",
    marginLeft: "auto",
    marginRight: "auto",
  };
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  console.log(data);

  let graphData;

  if (isFetching) {
    graphData = <div>Fetching</div>;
  } else if (isSuccess) {
    graphData = <Doughnut {...chartData(data)} />;
  } else if (isError) {
    graphData = <div>Error fetching Transaction </div>;
  }
  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative">
          <Doughnut {...chartData(data)} />
          <h3 className="mb-4 font-bold title " style={chartStyle}>
            Total
            <span className="block text-3xl text-emerald-400">
              €{getTotal(data) ?? 0}
            </span>
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
