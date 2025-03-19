import { useState, useEffect } from "react";
import ReactApexChart, { Props as ApexChartProps } from "react-apexcharts";
import { GRAPH_ALLOWED_ENTITIES } from "../utils/graphAllowedEntities";
import { fetchGraphDataByEntity } from "../api/fetchGraphData";

interface LineChartProps {
  entityType: string;
}
export const LineChart = ({ entityType }: LineChartProps) => {
  const [state, setState] = useState<ApexChartProps>({
    series: [],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!GRAPH_ALLOWED_ENTITIES.includes(entityType)) return;

      try {
        const graphData = await fetchGraphDataByEntity(entityType);

        const series =
          entityType === "BESS"
            ? [
                {
                  name: "Discharge",
                  data: graphData
                    .filter(({ value }) => value >= 0)
                    .map(({ timestamp, value }) => ({
                      x: new Date(timestamp).getTime(),
                      y: value,
                    })),
                },
                {
                  name: "Charge",
                  data: graphData
                    .filter(({ value }) => value < 0)
                    .map(({ timestamp, value }) => ({
                      x: new Date(timestamp).getTime(),
                      y: Math.abs(value),
                    })),
                },
              ]
            : [
                {
                  name: "Value",
                  data: graphData.map(({ timestamp, value }) => ({
                    x: new Date(timestamp).getTime(),
                    y: value < 0 ? 0 : value,
                  })),
                },
              ];

        setState((prevState) => ({ ...prevState, series }));
      } catch (error) {
        console.error("Failed to fetch graph data:", error);
      }
    };

    fetchData();
  }, [entityType]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          type="area"
          height={350}
          series={state.series}
          options={state.options}
        />
      </div>
    </div>
  );
};
