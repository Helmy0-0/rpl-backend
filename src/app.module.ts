import { Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MiddlewareConsumer } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { TenantModule } from './tenant/tenant.module';
import { FilesModule } from './files/files.module';
import { RoomService } from './room/room.service';
import { RoomModule } from './room/room.module';
import { UsersModule } from './users/users.module';
import { FasilityModule } from './facility/facility.module';
import { ReportModule } from './report/report.module';
import { FinanceModule } from './finance/finance.module';
import { RoomtypeModule } from './roomtype/roomtype.module';
import { RentModule } from './rent/rent.module';
import { ApiKeyMiddleware } from './middleware/auth/auth.middleware';

@Module({
  imports: [CommonModule, TenantModule, FilesModule, RoomModule, UsersModule, FasilityModule, ReportModule, FinanceModule, RoomtypeModule, RentModule],
  controllers: [AppController],
  providers: [AppService, RoomService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .exclude(
        '/', 
        '/docs', 
        '/docs-json',
        { path: '/files', method: RequestMethod.ALL },
        { path: '/files/(.*)', method: RequestMethod.ALL }
      )
      .forRoutes('*');
  }
  
}
