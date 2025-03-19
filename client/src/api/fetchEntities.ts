import { Entity } from "../types/entity";
import { apiClient } from "./apiClient";

export const fetchEntities = async (): Promise<Entity[]> => {
  try {
    const response = await apiClient.get<Entity[]>("/entities");
    return response.data; 
  } catch (error) {
    throw new Error("Failed to fetch entities");
  }
};