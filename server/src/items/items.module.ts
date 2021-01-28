import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exchanges } from './../exchanges/exchange.entity';
import { Users } from './../users/user.entity';
import { Items } from './item.entity';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [TypeOrmModule.forFeature([Items])],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
