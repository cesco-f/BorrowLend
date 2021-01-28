import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { Exchanges } from './exchanges/exchange.entity';
import { ExchangesModule } from './exchanges/exchanges.module';
import { Items } from './items/item.entity';
import { ItemsModule } from './items/items.module';
import conf from '../config';

console.log(conf.dbUsername)
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: conf.dbHost,
      port: 5432,
      username: conf.dbUsername,
      password: conf.dbPassword,
      database: 'BorrowLend',
      // database: conf.dbName,
      entities: [Users, Exchanges, Items],
      synchronize: true,
    }),
    UsersModule,
    ExchangesModule,
    ItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
