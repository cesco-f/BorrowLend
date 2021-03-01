import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { Exchanges } from './exchanges/exchange.entity';
import { ExchangesModule } from './exchanges/exchanges.module';
import { Items } from './items/item.entity';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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
