import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot(`${process.env['MONGODB_URL']}/Product`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
