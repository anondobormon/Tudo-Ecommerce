import React from "react";
import { Line } from "react-chartjs-2";

const Chart = () => {
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        data: [0, 4000],
      },
      {
        label: "TOTAL AMOUNTs",
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        data: [0, 4000],
      },
    ],
  };
  return (
    <div>
      <Line data={lineState} />
    </div>
  );
};

export default Chart;
