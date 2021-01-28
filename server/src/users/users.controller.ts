import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Users> {
    id = Number(id);
    return this.usersService.findOne(id);
  }

  @Get('username/:username')
  findByUsername(@Param('username') username: string): Promise<Users> {
    return this.usersService.findByUsername(username);
  }

  @Get('lending/:itemId')
  findUsersLendingItem(@Param('itemId') itemId: number): Promise<Users[]> {
    itemId = Number(itemId);
    return this.usersService.findUsersLendingItem(itemId);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    id = Number(id);
    return this.usersService.remove(id);
  }

  @Put('toBorrowListAdd/:id/:itemId')
  addToToBorrowList(
    @Param('id') id: number,
    @Param('itemId') itemId: number,
  ): Promise<Users> {
    itemId = Number(itemId);
    id = Number(id);
    return this.usersService.addToToBorrowList(id, itemId);
  }

  @Put('toBorrowListRem/:id/:itemId')
  remToToBorrowList(
    @Param('id') id: number,
    @Param('itemId') itemId: number,
  ): Promise<Users> {
    itemId = Number(itemId);
    id = Number(id);
    return this.usersService.remToToBorrowList(id, itemId);
  }

  @Put('toLendListAdd/:id/:itemId')
  addToToLendList(
    @Param('id') id: number,
    @Param('itemId') itemId: number,
  ): Promise<Users> {
    itemId = Number(itemId);
    id = Number(id);
    return this.usersService.addToToLendList(id, itemId);
  }

  @Put('toLendListRem/:id/:itemId')
  remToToLendList(
    @Param('id') id: number,
    @Param('itemId') itemId: number,
  ): Promise<Users> {
    itemId = Number(itemId);
    id = Number(id);
    return this.usersService.remToToLendList(id, itemId);
  }

  @Put('changeEmail/:id')
  changeEmail(@Param('id') id: number, @Body() body: any) {
    id = Number(id);
    return this.usersService.changeEmail(id, body.email);
  }
}
