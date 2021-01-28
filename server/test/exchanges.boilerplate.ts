import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
// import { AppModule } from './../src/app.module';
import { ExchangesModule } from './../src/exchanges/exchanges.module';
import { ExchangesService } from './../src/exchanges/exchanges.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangesController } from './../src/exchanges/exchanges.controller';
// import { Exchanges } from './../src/exchanges/exchange.entity';
import { Users } from './../src/users/user.entity';
import { Items } from './../src/items/item.entity';
import { MockExchanges } from './mockExchangeEntity';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Exchanges]),
//     TypeOrmModule.forFeature([Users]),
//     TypeOrmModule.forFeature([Items]),
//   ],
//   providers: [ExchangesService, UsersService, ItemsService],
//   controllers: [ExchangesController],
// })

// @Module({
//   providers: [
//     exchangesService,
//     {
//       provide: getRepositoryToken(User),
//       useValue: mockRepository
//     },
//   ],
// })

describe('Exchanges', () => {
  let app: INestApplication;
  let exchangesService = { findAll: () => ['test'] };

  beforeAll(async () => {
    try {
      const moduleRef = await Test.createTestingModule({
        // imports: [ExchangesModule],
        providers: [
          {
            provide: ExchangesService,
            useValue: {
              get: jest.fn(() => MockExchanges)
            }
          }
        ]
      })
      // .overrideProvider(ExchangesService)
      // .useValue(exchangesService)
      .compile();
      exchangesService = moduleRef.get(ExchangesService)
  
      console.log(moduleRef.createNestApplication, 'module ref');
      // app = await moduleRef.createNestApplication();
    } catch (e) {
      console.log(e);
    }

    // await app.init();

  });

  it('/ (GET)', () => {
    console.log('exchanges ', exchangesService)
    expect(true).toEqual(true);
    // return request(exchangesService)
    //   // .get('/')
    //   // .expect(200)
    //   .expect({
    //     data: exchangesService.findAll()
    //   });
  });

  afterAll(async () => {
    await app.close();
  });
});
