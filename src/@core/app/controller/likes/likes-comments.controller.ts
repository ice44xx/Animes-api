import {
  Controller,
  Delete,
  NotFoundException,
  Param,
  Post,
  Request,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthRequest } from 'src/@core/infra/auth/models/auth-request';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { LikesCommentsDto } from '../../dto/likes/create-likes-comments-dto';
import { LikesCommentsService } from '../../services/likes/likes-comments.service';

@ApiTags('Likes Comentários')
@Controller('likes-comments')
export class LikesCommentsController {
  constructor(private readonly likesCommentsService: LikesCommentsService) {}

  @Roles(UserType.User)
  @Post(':commentId')
  async create(@Request() req: AuthRequest, @Res() res, @Param('commentId') commentId: number) {
    try {
      const createLike: LikesCommentsDto = { userId: req.user.id, commentId: commentId };
      await this.likesCommentsService.create(createLike);
      return res.status(201).send({ message: 'Like adicionado ao comentário!' });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(401).send({ message: error.message });
      } else if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res.status(500).send({ message: 'Ocorreu um erro ao criar o like, ' + error.message });
    }
  }

  @Roles(UserType.User)
  @Delete(':commentId')
  async remove(@Request() req: AuthRequest, @Res() res, @Param('commentId') commentId: number) {
    try {
      const removeLike: LikesCommentsDto = { userId: req.user.id, commentId: commentId };
      await this.likesCommentsService.remove(removeLike);
      return res.status(200).send({ message: 'Like removido' });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(401).send({ message: error.message });
      } else if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao remover o like, ' + error.message });
    }
  }
}
