import { Controller, Get, Param } from '@nestjs/common';
import { EntityService, Entity, GraphDataPoint } from './entity.service';
import { Logger } from '@nestjs/common';

@Controller('entities')
export class EntityController {
  private readonly logger = new Logger(EntityController.name);

  constructor(private readonly entityService: EntityService) {}

  @Get()
  async getAllEntities(): Promise<Entity[]> {
    try {
      this.logger.log('Fetching all entities');
      return await this.entityService.getAllEntities();
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Failed to fetch entities: ${error.message}`);
      } else {
        this.logger.error(`Failed to fetch entities: ${String(error)}`);
      }
      throw error;
    }
  }

  @Get(':entityType/graph-data')
  async getGraphData(
    @Param('entityType') entityType: string,
  ): Promise<GraphDataPoint[]> {
    try {
      this.logger.log(`Fetching graph data for ${entityType}`);
      return await this.entityService.getGraphData(entityType);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Failed to fetch entities: ${error.message}`);
      } else {
        this.logger.error(`Failed to fetch entities: ${String(error)}`);
      }
      throw error;
    }
  }
}
