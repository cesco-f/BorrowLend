import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Logger } from '@nestjs/common';
import * as request from 'supertest';
import { ItemsModule } from '../src/items/items.module';
import { ItemsService } from '../src/items/items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Items } from '../src/items/item.entity';
import { Exchanges } from '../src/exchanges/exchange.entity';
import { Users } from '../src/users/user.entity';

describe('Exchanges', () => {
  let app: INestApplication;
  let itemsService = { findAll: () => [{id:2,title:"PS4 - The Witcher 3: Wild Hunt",img:"https://howlongtobeat.com/games/10270_The_Witcher_3_Wild_Hunt.jpg",exchangesBorr:[],exchangesLend:[{id:1,accepted:null,isActiveBorr:null,isActiveLend:null,createdAt:"2021-01-22T18:13:25.151Z"},{id:2,accepted:null,isActiveBorr:null,isActiveLend:null,createdAt:"2021-01-22T18:16:47.173Z"}]},{id:6,title:"PS4 - Uncharted 4: A Thief's End",img:"https://howlongtobeat.com/games/Uncharted_4_Reveal_Wallpaper.jpg",exchangesBorr:[],exchangesLend:[]},{id:5,title:"PS4 - Crash Bandicoot 4: It's About Time",img:"https://howlongtobeat.com/games/80317_Crash_Bandicoot_4_Its_About_Time.jpg",exchangesBorr:[{id:1,accepted:null,isActiveBorr:null,isActiveLend:null,createdAt:"2021-01-22T18:13:25.151Z"}],exchangesLend:[]},{id:4,title:"PS4 - The Last Of Us Part II",img:"https://howlongtobeat.com/games/41753_The_Last_of_Us_Part_II.jpg",exchangesBorr:[],exchangesLend:[]},{id:1,title:"PS4 - Cyberpunk 2077",img:"https://howlongtobeat.com/games/Cyberpunk-2077-2.jpg",exchangesBorr:[{id:2,accepted:null,isActiveBorr:null,isActiveLend:null,createdAt:"2021-01-22T18:16:47.173Z"}],exchangesLend:[]},{id:3,title:"PS4 - Grand Theft Auto V",img:"https://howlongtobeat.com/games/2006041-gta5_2_large.png",exchangesBorr:[],exchangesLend:[]}]};

  beforeAll(async () => {

    const DBModule = TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'cesco',
      password: 'database',
      database: 'BorrowLend',
      entities: [Users, Exchanges, Items],
      synchronize: true,
    });

    const moduleRef = await Test.createTestingModule({
      imports: [DBModule, ItemsModule]
    })
    // .overrideProvider(ItemsService)
    // .useValue(itemsService)
    .compile();

    app = await moduleRef.createNestApplication();

    await app.init();

  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/items')
      .expect(200)
      .expect({
        data:itemsService.findAll()
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
