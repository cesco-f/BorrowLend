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
    exchange.userBorrowing = await this.usersService.findOne(userBorrowingId);
    exchange.userLending = await this.usersService.findOne(userLendingId);
    exchange.itemBorrowed = await this.itemsService.findOne(itemBorrowedId);
    exchange.itemLent = await this.itemsService.findOne(itemLentId);
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
    await this.exchangesRepository.delete(id);
  }
}