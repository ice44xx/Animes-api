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
import { SeasonsService } from '../../services/seasons/seasons.service';
import { CreateSeasonsDto } from '../../dto/requests/seasons/create-seasons-dto';
import { UpdateSeasonsDto } from '../../dto/requests/seasons/update-seasons-dto';

@Controller('seasons')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Get()
  findAll() {
    const season = this.seasonsService.findAll();
    return season;
  }

  @Get(':name')
  async findByName(@Res() res, @Param('name') name: string) {
    const season = await this.seasonsService.findByName(name);
    return res.status(201).send(season);
  }

  @Post('create')
  create(@Body() createSeasonDto: CreateSeasonsDto) {
    const season = this.seasonsService.create(createSeasonDto);
    return season;
  }

  @Put(':id')
  async update(@Body() updateSeasonsDto: UpdateSeasonsDto, @Param('id') id: number) {
    const season = this.seasonsService.update(id, updateSeasonsDto);
    return season;
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: number) {
    await this.seasonsService.delete(id);
    return res.status(201).send({ message: 'Temporada deletada' });
  }
}
