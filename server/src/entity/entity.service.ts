import { Injectable, Logger } from '@nestjs/common';
import * as csv from 'csv-parser';
import { createReadStream } from 'fs';
import * as fs from 'fs';
import * as path from 'path';

export interface Entity {
  id: number;
  name: string;
}

export interface GraphDataPoint {
  timestamp: string;
  value: number;
}

interface CsvRow {
  date: string;
  [key: string]: string | number;
}

@Injectable()
export class EntityService {
  private readonly entitiesPath = path.join(
    __dirname,
    '../../src/db/entities.json',
  );
  private readonly logger = new Logger(EntityService.name);

  private getValueColumn(entityType: string): string {
    const columnMap: Record<string, string> = {
      bess: 'data.mean_meter-ac/ActivePower',
      solar: 'data.mean_meter-pv-5/ActivePower',
      grid: 'data.mean_meter-grid-1/ActivePower',
      consumption: 'data.mean__sum/ConsumptionActivePower',
      generator: 'data.mean_generator/ActivePower',
    };

    const column = columnMap[entityType.toLowerCase()];
    if (!column) {
      this.logger.error(
        `No column mapping found for entity type: ${entityType}`,
      );
      throw new Error(`No column mapping for ${entityType}`);
    }
    return column;
  }

  async getAllEntities(): Promise<Entity[]> {
    try {
      const data = await fs.promises.readFile(this.entitiesPath, 'utf8');
      return JSON.parse(data) as Entity[];
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Failed to load entities: ${error.message}`);
      } else {
        this.logger.error(`Failed to load entities: ${String(error)}`);
      }
      throw error;
    }
  }

  async getGraphData(entityType: string): Promise<GraphDataPoint[]> {
    const csvPath = path.join(
      __dirname,
      `../../src/db/${entityType.toLowerCase()}.csv`,
    );
    const valueColumn = this.getValueColumn(entityType);

    try {
      return await new Promise((resolve, reject) => {
        const results: GraphDataPoint[] = [];

        createReadStream(csvPath)
          .pipe(csv())
          .on('data', (data) => {
            try {
              const row = data as CsvRow;
              const rawValue = row[valueColumn];
              const timestamp = this.parseCustomDate(row.date);

              results.push({
                timestamp: timestamp.toISOString(),
                value: Number(rawValue),
              });
            } catch (parseError: unknown) {
              const message =
                parseError instanceof Error
                  ? parseError.message
                  : 'CSV parse error';

              this.logger.error(`Row error: ${message}`);
              reject(new Error(message));
            }
          })
          .on('end', () => resolve(results))
          .on('error', (error: unknown) => {
            const rejectionError =
              error instanceof Error ? error : new Error(String(error));
            this.logger.error(`CSV read error: ${rejectionError.message}`);
            reject(rejectionError);
          });
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Failed to fetch ${entityType} data: ${error.message}`,
        );
      } else {
        this.logger.error(
          `Failed to fetch ${entityType} data: ${String(error)}`,
        );
      }
      throw error;
    }
  }

  private parseCustomDate(dateString: string): Date {
    try {
      const cleaned = dateString.replace(/\.\d+/, '').replace(/(AM|PM)/, ' $1');
      return new Date(cleaned);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Failed to parse date: ${dateString} - ${error.message}`,
        );
      } else {
        this.logger.error(
          `Failed to parse date: ${dateString} - ${String(error)}`,
        );
      }
      throw error;
    }
  }
}
