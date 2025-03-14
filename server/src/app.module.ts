import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntityModule } from './entity/entity.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [EntityModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
