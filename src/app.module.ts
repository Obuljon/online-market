import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MainModule } from './controller/main.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AdminService } from './controller/admin/admin.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/online-matket'),
    MainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
