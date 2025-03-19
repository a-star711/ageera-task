import { apiClient } from "./apiClient";

export const fetchGraphDataByEntity = async (
  entityType: string
): Promise<{ timestamp: string; value: number }[]> => {
  try {
    const response = await apiClient.get(`/entities/${entityType}/graph-data`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch graph data. Please try again.");
  }
};