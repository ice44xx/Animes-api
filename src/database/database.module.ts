import { Module } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/modules/users/entities/users.entity';
import { Categories } from 'src/modules/categories/entities/categories.entity';
import { Animes } from 'src/modules/animes/entities/animes.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '020619',
  database: 'nekoanimes',
  entities: [Users, Categories, Animes],
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],
  exports: [],
})
export class DatabaseModule {}
