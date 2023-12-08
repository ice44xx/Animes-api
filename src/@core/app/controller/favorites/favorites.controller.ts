import { Controller, Delete, Param, Post, Res, Request } from '@nestjs/common';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { AuthRequest } from 'src/@core/infra/auth/models/auth-request';
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':id')
  async create(@Res() res, @Request() req: AuthRequest, @Param('id') animeId: number) {
    const currentUser = req.user.id;
    await this.favoritesService.createFavorite(currentUser, animeId);
    return res.status(201).json({ message: 'Adicionado aos favoritos!' });
  }

  @Delete(':id')
  async remove(@Res() res, @Request() req: AuthRequest, @Param('id') favoriteId: number) {
    const currentUser = req.user.id;
    await this.favoritesService.removeFavorite(currentUser, favoriteId);
    return res.status(201).json({ message: 'Removido dos favoritos!' });
  }
}