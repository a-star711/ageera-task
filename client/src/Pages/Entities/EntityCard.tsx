import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  formatPower,
  formatEnergy,
  formatRunHours,
  formatApparentPower,
} from "../../utils/calcFunctions";
import { entitySvgs } from "../../assets/icons/EntitySvgs";
import { entitiesCardStyle as styles } from "./entitiesCardStyle";
import { EntityCardProps } from "../../types/entityCard";

export const EntityCard = ({
  entityType,
  power,
  energy,
  capacity,
  status,
  irradiance,
  runHours,
  powerFactor,
  onClick,
}: EntityCardProps) => {
  const getEntityConfig = () => {
    switch (entityType) {
      case "SOLAR":
        return {
          mainValue: `${power} kWp`,
          metrics: [
            { label: "Power:", value: formatPower(power) },
            { label: "Energy Today:", value: formatEnergy(energy) },
            {
              label: "Irradiance",
              value: irradiance ? `${irradiance} W/m²` : "800 W/m²",
            },
          ],
        };

      case "BESS":
        return {
          mainValue: `${capacity} kWh`,
          metrics: [
            { label: "Power:", value: formatPower(power) },
            { label: "Energy Today:", value: formatEnergy(energy) },
            { label: "SOC:", value: "65%" },
          ],
        };

      case "GENERATOR":
        return {
          mainValue: formatApparentPower(capacity),
          metrics: [
            { label: "Real Power:", value: formatPower(power) },
            { label: "Mode:", value: status },
            { label: "Run Hours:", value: formatRunHours(runHours) },
          ],
        };

      case "GRID":
        return {
          mainValue: "22 KV",
          metrics: [
            { label: "Power:", value: formatPower(power) },
            { label: "Power Factor:", value: powerFactor?.toFixed(2) },
          ],
        };

      case "CONSUMPTION":
        return {
          metrics: [
            { label: "Power:", value: formatPower(power) },
            { label: "Energy Today:", value: formatEnergy(energy) },
          ],
        };

      default:
        return { metrics: [] };
    }
  };

  const { mainValue, metrics } = getEntityConfig();

  const SvgComponent = entitySvgs[entityType];

  return (
    <Card onClick={onClick} sx={styles.container}>
      <CardContent sx={styles.card}>
        {SvgComponent && <SvgComponent />}

        <Box width="100%">
          <Box display="flex" justifyContent="space-between" gap={0.5}>
            <Typography sx={styles.heading}>
              {entityType} {mainValue && mainValue}
            </Typography>
          </Box>

          <Box>
            {metrics.map((metric, index) => (
              <Box key={index} display="flex" justifyContent="space-between">
                <Typography sx={styles.label}>{metric.label}</Typography>
                <Typography sx={styles.metricValue}>{metric.value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
