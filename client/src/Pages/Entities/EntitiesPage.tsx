import { useEffect, useState } from "react";
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
import { fetchEntities } from "../../api/fetchEntities";
import { Entity } from "../../types/entity";
import { entitiesPageStyles as styles } from "../Entities/entitiesPageStyles";

export const EntitiesPage = () => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getEntities = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchEntities();
        setEntities(data);
      } catch (err) {
        setError("Failed to fetch entities");
      } finally {
        setIsLoading(false);
      }
    };

    getEntities();
  }, []);

  return (
    <Container maxWidth={false} disableGutters sx={styles.container}>
      {isLoading && (
        <Box sx={styles.loadingBox}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      {!isLoading && !error && entities.length > 0 && (
        <Box sx={styles.entityList}>
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
            />
          ))}
        </Box>
      )}

      {!isLoading && !error && entities.length === 0 && (
        <Typography sx={styles.noEntitiesText}>
          No entities available.
        </Typography>
      )}

      {selectedEntity &&
        GRAPH_ALLOWED_ENTITIES.includes(selectedEntity.entityType) && (
          <Box>
            <Typography>
              {selectedEntity.entityType} - {selectedEntity.power} kW
            </Typography>
            <LineChart entityType={selectedEntity.entityType} />
          </Box>
        )}
    </Container>
  );
};
