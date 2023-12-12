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
import { EpisodesService } from '../../services/episodes/episodes.service';
import { CreateEpisodesDto } from '../../dto/requests/episodes/create-episodes-dto';
import { UpdateEpisodesDto } from '../../dto/requests/episodes/update-episodes-dto';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Public()
  @Get()
  async findAll(@Res() res) {
    try {
      const episodes = await this.episodesService.findAll();
      return res.status(201).json(episodes);
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao buscar todos episódios' });
    }
  }

  @Public()
  @Get(':name')
  async findByName(@Res() res, @Param('name') name: string) {
    try {
      const episode = await this.episodesService.findByName(name);
      return res.status(201).send(episode);
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Ocorreu um erro ao buscar o episódio ${name}` });
    }
  }

  @Public()
  @Post('create')
  create(@Res() res, @Body() createEpisodesDto: CreateEpisodesDto) {
    try {
      const episode = this.episodesService.create(createEpisodesDto);
      return res.status(201).json(episode);
    } catch (error) {
      return res.status(500).send({ message: 'Ocorreu um erro ao criar o episódio' });
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Res() res,
    @Body() updateEpisodesDto: UpdateEpisodesDto,
  ) {
    try {
      const episode = await this.episodesService.update(id, updateEpisodesDto);
      return res.status(201).json(episode);
    } catch (error) {
      return res.status(500).send({ message: 'Ocorreu um erro ao atualizar o episódio' });
    }
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.episodesService.delete(id);
  }
}
