import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { RolesService } from '../../services/users/roles.service';
import { CreateRolesDto } from '../../dto/users/create-roles-dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Roles(UserType.Admin)
  @Get()
  async findAll(@Res() res) {
    try {
      const roles = await this.rolesService.findAll();
      return res.status(200).json(roles);
    } catch (error) {
      return res.status(500).send('Ocorreu um erro ao buscar as roles, ' + error.message);
    }
  }

  @Roles(UserType.Admin)
  @Post('create')
  async create(@Res() res, @Body() createRolesDto: CreateRolesDto) {
    try {
      const roles = await this.rolesService.create(createRolesDto);
      return res.status(201).json(roles);
    } catch (error) {
      return res.status(500).send('Ocorreu um erro ao criar a role, ' + error.message);
    }
  }
}
