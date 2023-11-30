import React, { useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const Canva = ({data}) => {
console.log(data);
  // useEffect(() => {
  //      const chartData = async() => {
  //         const res = await axios.get()
  //      }
  // })

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "dark1", // 'light1', 'dark1', 'dark2'
    title: {
      text: "Expenses",
    },
    data: [
      {
        type: "pie",
        indexLabel: "{label}: {y}%",
        startAngle: -90,
        dataPoints: [
          { y: data.Entertainment || 0, label: "Entertainment" },
          { y: data.Food || 0, label: "Food & Drinks" },
          { y: data.Other || 0, label: "Others" },
          { y: data.Transportation || 0, label: "Transportation" },
          { y: 14, label: "Medical Care" },
          { y: 14, label: "Utilities" },
          { y: data.Personal || 0, label: "Personal" },
        ],
      },
    ],
  };

  return (
    <div>
      <CanvasJSReact.CanvasJSChart options={options} />
    </div>
  );
};

export default Canva;