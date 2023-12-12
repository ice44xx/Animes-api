import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ClassificationsService } from '../../services/classifications/classifications.service';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { CreateClassificationsDto } from '../../dto/requests/classifications/create-classifications-dto';
import { UpdateClassificationsDto } from '../../dto/requests/classifications/update-classifications-dto';

@Controller('classifications')
export class ClassificationsController {
  constructor(private readonly classificationsService: ClassificationsService) {}

  @Public()
  @Get()
  async findAll(@Res() res) {
    try {
      const classifications = await this.classificationsService.findAll();
      return res.status(201).send(classifications);
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao buscar as classificações' });
    }
  }

  @Post()
  async create(@Res() res, @Body() createClassifcationsDto: CreateClassificationsDto) {
    try {
      const classifications = await this.classificationsService.create(
        createClassifcationsDto,
      );
      return res.status(201).send(classifications);
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao criar a classificação' });
    }
  }

  @Put(':id')
  async update(
    @Res() res,
    @Param('id') id: number,
    @Body()
    updateClassifcationsDto: UpdateClassificationsDto,
  ) {
    try {
      const classifications = await this.classificationsService.update(
        id,
        updateClassifcationsDto,
      );
      return res
        .status(201)
        .send({ message: 'Classificação atualizada', classifications });
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao atualizar a classificação' });
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() res) {
    await this.classificationsService.delete(id);
    return res.status(201).send({ message: 'Classificação deletada com sucesso!' });
  }
}
