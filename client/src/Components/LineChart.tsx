import { useState, useEffect } from "react";
import ReactApexChart, { Props as ApexChartProps } from "react-apexcharts";
import axios from "axios";
import { GRAPH_ALLOWED_ENTITIES } from "../utils/graphAllowedEntities";

interface LineChartProps {
  entity: {
    id: number;
    entityType: string;
  };
}

export const LineChart = ({ entity }: LineChartProps) => {
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
    if (GRAPH_ALLOWED_ENTITIES.includes(entity.entityType)) {
      axios
        .get(`http://localhost:3000/entities/${entity.entityType}/graph-data`)
        .then((response) => {
          const graphData = response.data;

          let series = [];

          if (entity.entityType === "BESS") {
            const dischargeSeries = {
              name: "Discharge",
              data: graphData
                .filter((item: { value: number }) => item.value >= 0)
                .map((item: { timestamp: string; value: number }) => ({
                  x: new Date(item.timestamp).getTime(),
                  y: item.value,
                })),
            };

            const chargeSeries = {
              name: "Charge",
              data: graphData
                .filter((item: { value: number }) => item.value < 0)
                .map((item: { timestamp: string; value: number }) => ({
                  x: new Date(item.timestamp).getTime(),
                  y: Math.abs(item.value),
                })),
            };

            series = [dischargeSeries, chargeSeries];
          } else {
            series = [
              {
                name: "Value",
                data: graphData.map(
                  (item: { timestamp: string; value: number }) => ({
                    x: new Date(item.timestamp).getTime(),
                    y: item.value < 0 ? 0 : item.value,
                  })
                ),
              },
            ];
          }

          setState((prevState) => ({
            ...prevState,
            series,
          }));
        })
        .catch((error) => {
          console.error("Failed to fetch graph data:", error);
        });
    }
  }, [entity]);

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
