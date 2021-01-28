import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { Exchanges } from './exchange.entity';
import { UsersService } from '../users/users.service';
import { ItemsService } from '../items/items.service';

@Injectable()
export class ExchangesService {
  constructor(
    @InjectRepository(Exchanges)
    private readonly exchangesRepository: Repository<Exchanges>,
    private usersService: UsersService,
    private itemsService: ItemsService,
  ) {}

  async create(createExchangeDto: CreateExchangeDto): Promise<Exchanges> {
    const exchange = new Exchanges();
    const userBorrowingId = Number(createExchangeDto.userBorrowingId);
    const userLendingId = Number(createExchangeDto.userLendingId);
    const itemBorrowedId = Number(createExchangeDto.itemBorrowedId);
    const itemLentId = Number(createExchangeDto.itemLentId);
    const savedExchanges = await this.exchangesRepository.find({
      relations: ['userBorrowing', 'userLending', 'itemBorrowed', 'itemLent'],
    });
    let exchangeAlreadySaved = false;
    savedExchanges.forEach((exchange) => {
      if (
        exchange.userBorrowing.id === userBorrowingId &&
        exchange.userLending.id === userLendingId &&
        exchange.itemBorrowed.id === itemBorrowedId &&
        exchange.itemLent.id === itemLentId
      ) {
        exchangeAlreadySaved = true;
      }
    });
    if (exchangeAlreadySaved) {
      return null;
    }
    exchange.userBorrowing = await this.usersService.remToToBorrowList(
      userBorrowingId,
      itemBorrowedId,
    );
    exchange.userLending = await this.usersService.remToToLendList(
      userLendingId,
      itemBorrowedId,
    );
    exchange.userBorrowing = await this.usersService.remToToLendList(
      userBorrowingId,
      itemLentId,
    );
    exchange.userLending = await this.usersService.remToToBorrowList(
      userLendingId,
      itemLentId,
    );

    exchange.itemBorrowed = await this.itemsService.findOne(itemBorrowedId);
    exchange.itemLent = await this.itemsService.findOne(itemLentId);
    exchange.createdAt = new Date();
    return this.exchangesRepository.save(exchange);
  }

  async findAll(): Promise<Exchanges[]> {
    return this.exchangesRepository.find({
      relations: ['userBorrowing', 'userLending', 'itemBorrowed', 'itemLent'],
    });
  }

  findOne(id: number): Promise<Exchanges> {
    return this.exchangesRepository.findOne(id, {
      relations: ['userBorrowing', 'userLending', 'itemBorrowed', 'itemLent'],
    });
  }

  async remove(id: number): Promise<void> {
    try {
      const exchange = await this.exchangesRepository.findOne(id, {
        relations: ['userBorrowing', 'userLending', 'itemBorrowed', 'itemLent'],
      });

      await this.usersService.addToToBorrowList(
        exchange.userBorrowing.id,
        exchange.itemBorrowed.id,
      );

      await this.usersService.addToToLendList(
        exchange.userLending.id,
        exchange.itemBorrowed.id,
      );
      await this.usersService.addToToBorrowList(
        exchange.userLending.id,
        exchange.itemLent.id,
      );
      await this.usersService.addToToLendList(
        exchange.userBorrowing.id,
        exchange.itemLent.id,
      );

      await this.exchangesRepository.delete(id);
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  async accept(id: number): Promise<Exchanges> {
    return this.exchangesRepository.save({
      id,
      accepted: true,
    });
  }

  reject(id: number): Promise<Exchanges> {
    return this.exchangesRepository.save({
      id,
      accepted: false,
    });
  }

  async end(id: number, userId: number): Promise<Exchanges> {
    const exchange = await this.exchangesRepository.findOne(id, {
      relations: ['userBorrowing', 'userLending', 'itemBorrowed', 'itemLent'],
    });
    if (exchange.userBorrowing.id === userId) exchange.isActiveBorr = false;
    if (exchange.userLending.id === userId) exchange.isActiveLend = false;
    return this.exchangesRepository.save(exchange);
  }
}
