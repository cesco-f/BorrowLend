import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './user.entity';
import { ItemsService } from '../items/items.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private itemsService: ItemsService,
  ) {}

  create(createUserDto: CreateUserDto): Promise<Users> {
    const user = new Users();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.location = createUserDto.location;
    user.email = createUserDto.email;
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find({
      relations: [
        'exchangesBorr',
        'exchangesLend',
        'toLendList',
        'toBorrowList',
      ],
    });
  }

  findOne(id: number): Promise<Users> {
    return this.usersRepository.findOne(id, {
      relations: [
        'exchangesBorr',
        'exchangesLend',
        'toLendList',
        'toBorrowList',
      ],
    });
  }

  async findByUsername(username: string): Promise<Users> {
    return this.usersRepository.findOne(
      { username: username },
      {
        relations: [
          'exchangesBorr',
          'exchangesLend',
          'toLendList',
          'toBorrowList',
        ],
      },
    );
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async addToToBorrowList(id: number, itemId: number): Promise<Users> {
    const user = await this.usersRepository.findOne(id, {
      relations: [
        'exchangesBorr',
        'exchangesLend',
        'toLendList',
        'toBorrowList',
      ],
    });
    const item = await this.itemsService.findOne(itemId);
    if (
      user.toBorrowList.findIndex(
        (toBorrowItem) => toBorrowItem.id === item.id,
      ) === -1
    )
      user.toBorrowList = [...user.toBorrowList, item];

    return this.usersRepository.save(user);
  }

  async remToToBorrowList(id: number, itemId: number): Promise<Users> {
    const user = await this.usersRepository.findOne(id, {
      relations: [
        'exchangesBorr',
        'exchangesLend',
        'toLendList',
        'toBorrowList',
      ],
    });
    const item = await this.itemsService.findOne(itemId);
    user.toBorrowList = user.toBorrowList.filter(
      (toBorrowItem) => toBorrowItem.id !== item.id,
    );

    return this.usersRepository.save(user);
  }

  async changeEmail(id: number, email: string): Promise<Users> {
    const user = await this.usersRepository.findOne(id);
    user.email = email;

    return this.usersRepository.save(user);
  }

  async remToToLendList(id: number, itemId: number): Promise<Users> {
    const user = await this.usersRepository.findOne(id, {
      relations: [
        'exchangesBorr',
        'exchangesLend',
        'toLendList',
        'toBorrowList',
      ],
    });
    const item = await this.itemsService.findOne(itemId);
    user.toLendList = user.toLendList.filter(
      (toLendItem) => toLendItem.id !== item.id,
    );

    return this.usersRepository.save(user);
  }

  async findUsersLendingItem(itemId: number): Promise<Users[]> {
    let users = await this.usersRepository.find({
      relations: [
        'exchangesBorr',
        'exchangesLend',
        'toLendList',
        'toBorrowList',
      ],
    });
    users = users.filter(
      (user) => user.toLendList.findIndex((item) => item.id === itemId) !== -1,
    );
    return users;
  }

  async addToToLendList(id: number, itemId: number): Promise<Users> {
    const user = await this.usersRepository.findOne(id, {
      relations: [
        'exchangesBorr',
        'exchangesLend',
        'toLendList',
        'toBorrowList',
      ],
    });
    const item = await this.itemsService.findOne(itemId);
    if (
      user.toLendList.findIndex((toLendItem) => toLendItem.id === item.id) ===
      -1
    )
      user.toLendList = [...user.toLendList, item];

    return this.usersRepository.save(user);
  }
}
