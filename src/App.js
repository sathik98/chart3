import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

export default function App() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "X-axis Data",
        data: [],
        fill: false,
        borderColor: "green"
      },
      {
        label: "Y-axis Data",
        data: [],
        fill: false,
        borderColor: "red"
      }
    ]
  });

  const [xAxisLabels, setXAxisLabels] = useState([]);
  const [yAxisLabels, setYAxisLabels] = useState([]);


  console.log(xAxisLabels, yAxisLabels)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseY = await fetch("https://retoolapi.dev/o5zMs5/data");

        if (!responseY.ok) {
          throw new Error("Failed to fetch Y-axis data");
        }

        const dataY = await responseY.json();
        console.log("Fetched Y-axis data:", dataY);

        const responseX = await fetch("https://retoolapi.dev/gDa8uC/data");

        if (!responseX.ok) {
          throw new Error("Failed to fetch X-axis data");
        }

        const dataX = await responseX.json();
        console.log("Fetched X-axis data:", dataX);

        const xAxisLabelsData = dataX.slice(0, 50).map(item => item.Label);
        const XAxisData = dataX.slice(0, 50).map(item => parseFloat(item.RandomNumber));

        const yAxisLabelsData = dataY.slice(0, 50).map(item => item.Label);
        const yAxisData = dataY.slice(0, 50).map(item => parseFloat(item.RandomNumber));

        setChartData(prevChartData => ({
          ...prevChartData,
          labels: xAxisLabelsData,
          datasets: [
            {
              ...prevChartData.datasets[0],
              data: XAxisData
            },
            {
              ...prevChartData.datasets[1],
              label: "Y-axis Data",
              data: yAxisData
            }
          ]
        }));

        setXAxisLabels(xAxisLabelsData);
        setYAxisLabels(yAxisLabelsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h2>Datas in Line Chart</h2>
      <div style={{ height: "400px", width: "800px" }}>
        <Line data={chartData} />
      </div>
    </div>
  );
}
