import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { EntityCard } from "./EntityCard";
import { LineChart } from "../../Components/LineChart";
import { GRAPH_ALLOWED_ENTITIES } from "../../utils/graphAllowedEntities";

interface Entity {
  id: number;
  power?: number;
  dailyEnergy?: number;
  capacity?: number;
  status?: string;
  entityType: string;
  powerFactor: number;
  runHours: number;
}

export const EntitiesPage = () => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/entities")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setEntities(response.data);
        } else {
          setError("Invalid data format received.");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Failed to load entities. Please try again.");
        setIsLoading(false);
      });
  }, []);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        px: { xs: 2, sm: 3 },
        width: "100%",
        overflow: "hidden",
      }}
    >
      {isLoading && (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      {!isLoading && !error && entities.length > 0 && (
        <Box
          sx={{
            display: "flex",
            gap: "24px",
            flexWrap: "nowrap",
            overflowX: "auto",
            pb: 2,
            "&::-webkit-scrollbar": {
              height: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#E0E0E0",
              borderRadius: "3px",
            },
          }}
        >
          {entities.map((entity) => (
            <EntityCard
              key={entity.id}
              entityType={entity.entityType}
              power={entity.power}
              energy={entity.dailyEnergy}
              capacity={entity.capacity}
              status={entity.status}
              powerFactor={entity.powerFactor}
              runHours={entity.runHours}
              onClick={() => setSelectedEntity(entity)}
              disabled={!GRAPH_ALLOWED_ENTITIES.includes(entity.entityType)}
            />
          ))}
        </Box>
      )}

      {!isLoading && !error && entities.length === 0 && (
        <Typography textAlign="center" color="textSecondary" py={4}>
          No entities available.
        </Typography>
      )}

      {selectedEntity &&
        GRAPH_ALLOWED_ENTITIES.includes(selectedEntity.entityType) && (
          <Box sx={{ px: { xs: 0, sm: 2 } }}>
            <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
              {selectedEntity.entityType} - {selectedEntity.power} kW
            </Typography>
            <LineChart entity={selectedEntity} />
          </Box>
        )}
    </Container>
  );
};
