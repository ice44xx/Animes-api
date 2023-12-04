import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seasons } from '../../../domain/entities/seasons/seasons.entity';
import { CreateSeasonsDto } from '../../dto/requests/seasons/create-seasons-dto';

@Injectable()
export class SeasonsService {
  constructor(
    @InjectRepository(Seasons)
    private readonly seasonsRepository: Repository<Seasons>,
  ) {}

  async create(createSeasonsDto: CreateSeasonsDto): Promise<Seasons> {
    const { name } = createSeasonsDto;
    const newSeason = this.seasonsRepository.create({ name });

    return await this.seasonsRepository.save(newSeason);
  }
}