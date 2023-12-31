import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users/users.repository';
import { CommentsRepository } from '../../repositories/comments/comments.repository';
import { LikesCommentsDto } from 'src/@core/app/dto/likes/create-likes-comments-dto';
import { LikesCommentsRepository } from '../../repositories/likes/likes-comments.repository';

@Injectable()
export class LikesCommentsUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly commentsRepository: CommentsRepository,
    private readonly likesCommentsRepository: LikesCommentsRepository,
  ) {}

  async create({ userId, commentId }: LikesCommentsDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const comment = await this.commentsRepository.findById(commentId);

    if (!comment) {
      throw new NotFoundException('Comentário não encontrado');
    }

    const newLike = await this.likesCommentsRepository.create({
      users: { connect: { id: userId } },
      comments: { connect: { id: commentId } },
    });

    return newLike;
  }

  async remove({ userId, commentId }: LikesCommentsDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const episode = await this.commentsRepository.findById(commentId);

    if (!episode) {
      throw new NotFoundException('Comentário não encontrado');
    }

    const like = await this.likesCommentsRepository.findOne(userId, commentId);

    if (!like) {
      throw new NotFoundException('Like não encontrado');
    }

    await this.likesCommentsRepository.remove(like.id);
  }
}
