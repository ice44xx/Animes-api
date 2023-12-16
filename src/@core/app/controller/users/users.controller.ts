import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  Param,
  HttpCode,
  Put,
  Request,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { CreateUsersDto } from '../../dto/users/create-users-dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { UpdateUsersDto } from '../../dto/users/update-users-dto';
import { AuthRequest } from 'src/@core/infra/auth/models/auth-request';
import { UpdateUsersPasswordDto } from '../../dto/users/update-users-password-dto';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(UserType.Admin)
  @Get()
  async findAll(@Res() res) {
    try {
      const user = await this.usersService.findAll();
      return res.status(200).json(user);
    } catch (error) {
      throw new Error('Ocorreu um erro ao buscar todos usuários, ' + error.message);
    }
  }

  @Roles(UserType.Admin)
  @Get(':id')
  async findById(@Res() res, @Param('id') id: number) {
    try {
      const user = await this.usersService.findById(id);
      return res.status(200).json(user);
    } catch (error) {
      throw new Error('Ocorreu um erro ao buscar o usuário, ' + error.message);
    }
  }

  @Public()
  @Post('create')
  async create(@Res() res, @Body() createUsersDto: CreateUsersDto) {
    try {
      const user = await this.usersService.create(createUsersDto);
      return res.status(201).json(user);
    } catch (error) {
      throw new Error('Ocorreu um erro ao criar o usuário, ' + error.message);
    }
  }

  @Roles(UserType.User)
  @Put()
  async update(
    @Request() req: AuthRequest,
    @Res() res,
    @Body() updateUsersDto: UpdateUsersDto,
  ) {
    try {
      const currentUser = req.user.id;
      const user = await this.usersService.update(currentUser, updateUsersDto);
      return res.status(200).json(user);
    } catch (error) {
      throw new Error('Ocorreu um erro ao atualizar o usuário, ' + error.message);
    }
  }

  @Roles(UserType.User)
  @Put('password')
  async updatePassword(
    @Request() req: AuthRequest,
    @Res() res,
    @Body() updateUsersPassswordDto: UpdateUsersPasswordDto,
  ) {
    try {
      const currentUser = req.user.id;
      const user = await this.usersService.updatePassword(
        currentUser,
        updateUsersPassswordDto,
      );
      return res.status(200).json(user);
    } catch (error) {
      throw new Error(
        'Ocorreu um erro ao atualizar a senha do usuário, ' + error.message,
      );
    }
  }

  @Roles(UserType.Admin)
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      await this.usersService.remove(id);
    } catch (error) {
      throw new Error('Ocorreu um erro ao deletar o usuário, ' + error.message);
    }
  }
}
