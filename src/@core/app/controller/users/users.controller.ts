import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { CreateUsersDto } from '../../dto/requests/users/create-users-dto';
import { UpdateUsersPasswordDto } from '../../dto/requests/users/update-users-password-dto';
import { UpdateUsersDto } from '../../dto/requests/users/update-users-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Res() res) {
    const users = await this.usersService.findAll();
    return res.status(201).send(users);
  }

  @Get(':id')
  findUserId(@Param('id') id: number) {
    this.usersService.findOne(id);
    return `Usuário com id: ${id} encontrado`;
  }

  @Post('create')
  create(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.create(createUsersDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUsersDto,
    @Res() res,
  ) {
    const user = await this.usersService.update(id, updateUserDto);
    return res.status(201).json({ message: 'Usuário atualizado!', user: user });
  }

  @Put(':id')
  async updatePassword(
    @Param('id') id: number,
    @Body() updateUsersPasswordDto: UpdateUsersPasswordDto,
    @Body('oldPassword') oldPassword: string,
    @Res() res,
  ) {
    await this.usersService.updatePassword(id, updateUsersPasswordDto, oldPassword);
    return res.status(201).send({ message: 'Senha atualizada com sucesso!' });
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}