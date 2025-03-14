import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  formatPower,
  formatEnergy,
  formatRunHours,
  formatApparentPower,
} from "../../utils/metrics";
import { entitySvgs } from "../../assets/icons/EntitySvgs";

interface EntityCardProps {
  entityType: string;
  power?: number;
  energy?: number;
  capacity?: number;
  status?: string;
  irradiance?: number;
  runHours?: number;
  powerFactor?: number;
  voltage?: number;
  onClick?: () => void;
}

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
    <Card
      onClick={onClick}
      sx={{
        width: 364.6,
        height: 160,
        borderRadius: "4px",
        boxShadow: "0px 10px 20px rgba(18, 38, 63, 0.08)",
        p: "20px 24px",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#FFFFFF",
        cursor: "pointer",
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
        },
        gap: "4px",
      }}
    >
      <CardContent
        sx={{
          p: 0,
          height: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "30px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {SvgComponent && <SvgComponent />}

        <Box width="100%">
          <Box display="flex" justifyContent="space-between" gap={0.5}>
            <Typography
              variant="h6"
              sx={{ fontSize: 16, fontWeight: 600, color: "#12263F" }}
            >
              {entityType} {mainValue && mainValue}
            </Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {metrics.map((metric, index) => (
              <Box key={index} display="flex" justifyContent="space-between">
                <Typography
                  variant="body2"
                  sx={{ fontSize: 12, color: "#6B7C93" }}
                >
                  {metric.label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: 12, fontWeight: 600, color: "#12263F" }}
                >
                  {metric.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
