import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Episodes } from 'src/@core/domain/entities/episodes/episodes.entity';
import { LikesEpisodes } from 'src/@core/domain/entities/likes-episodes/likes-episodes.entity';
import { Users } from 'src/@core/domain/entities/users/users.entity';
import { UnauthorizedError } from 'src/@core/infra/auth/errors/errors';
import { Repository } from 'typeorm';

@Injectable()
export class LikesEpisodesService {
  constructor(
    @InjectRepository(LikesEpisodes)
    private readonly likesRepository: Repository<LikesEpisodes>,
    @InjectRepository(Episodes)
    private readonly episodesRepository: Repository<Episodes>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async createLike(userId: number, episodeId: number) {
    try {
      const user = await this.usersRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new UnauthorizedError('Usuário não encontrado');
      }

      const episode = await this.episodesRepository.findOne({ where: { id: episodeId } });
      if (!episode) {
        throw new NotFoundException('Episódio não encontrado');
      }

      const existingLike = await this.likesRepository.findOne({
        where: { user: { id: userId }, episodes: { id: episodeId } },
      });
      if (existingLike) {
        throw new ConflictException('Usuário já curtiu este episódio');
      }

      const newLike = this.likesRepository.create({
        user: { id: userId },
        episodes: { id: episodeId },
      });

      return await this.likesRepository.save(newLike);
    } catch (error) {
      throw new Error('Ocorreu um erro ao adicionar o like, ' + error.message);
    }
  }

  async deleteLike(userId: number, episodeId: number) {
    try {
      const user = await this.usersRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new UnauthorizedError('Usuário não encontrado');
      }

      const episode = await this.episodesRepository.findOne({ where: { id: episodeId } });
      if (!episode) {
        throw new NotFoundException('Episódio não encontrado');
      }

      const like = await this.likesRepository.findOne({
        where: { user: { id: userId }, episodes: { id: episodeId } },
      });

      if (!like) {
        throw new NotFoundException('Like não encontrado');
      }

      await this.likesRepository.remove(like);
    } catch (error) {
      throw new Error('Ocorreu um erro ao remover o like, ' + error.message);
    }
  }
}
