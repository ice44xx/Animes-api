import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CreateAnimesDto } from '../../dto/animes/create-animes-dto';
import { AnimesService } from '../../services/animes/animes.service';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { UpdateAnimesDto } from '../../dto/animes/update-animes-dto';

@ApiTags('Animes')
@Controller('animes')
export class AnimesController {
  constructor(private readonly animesService: AnimesService) {}

  @Public()
  @Get()
  async findAll(@Res() res) {
    try {
      const animes = await this.animesService.findAll();
      return res.status(200).json(animes);
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao buscar os animes, ' + error.message });
    }
  }

  @Public()
  @Get('features')
  async findAllFeature(@Res() res) {
    try {
      const animes = await this.animesService.findAllFeature();
      return res.status(200).json(animes);
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao buscar os animes em destaques, ' + error.message });
    }
  }

  @Public()
  @Get('newest')
  async findNewest(@Res() res) {
    try {
      const animes = await this.animesService.findTopNewest();
      return res.status(200).json(animes);
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao buscar os animes lançamentos, ' + error.message });
    }
  }

  @Public()
  @Get('likes')
  async findTopLikes(@Res() res) {
    try {
      const animes = await this.animesService.findTopLikes();
      return res.status(200).json(animes);
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao buscar os animes top likes, ' + error.message });
    }
  }

  @Public()
  @Get(':name')
  async findByName(@Res() res, @Param('name') name: string) {
    try {
      const anime = await this.animesService.findByName({ name });
      return res.status(200).json(anime);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: `Ocorreu um erro ao buscar o anime ${name}, ` } + error.message);
    }
  }

  @Public()
  @Get('/id/:id')
  async findById(@Res() res, @Param('id') id: number) {
    try {
      const anime = await this.animesService.findById({ id });
      return res.status(200).json(anime);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: `Ocorreu um erro ao buscar o anime ${id}, ` + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Post('create')
  async create(@Res() res, @Body() createAnimesDto: CreateAnimesDto) {
    try {
      const anime = await this.animesService.create(createAnimesDto);
      return res.status(201).json(anime);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao criar o anime, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Put(':animeId')
  async update(
    @Res() res,
    @Param('animeId') animeId: number,
    @Body() updateAnimesDto: UpdateAnimesDto,
  ) {
    try {
      const anime = await this.animesService.update(animeId, updateAnimesDto);
      return res.status(200).json(anime);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao atualizar o anime, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Delete(':id')
  async remove(@Res() res, @Param('id') id: number) {
    try {
      await this.animesService.remove({ id });
      return res.status(200).send({ message: 'Anime deletado com sucesso' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao deletar o anime, ' + error.message });
    }
  }
}
