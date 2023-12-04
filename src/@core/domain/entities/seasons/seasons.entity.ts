import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Episodes } from '../episodes/episodes.entity';

@Entity('Seasons')
export class Seasons {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Episodes, (episode) => episode.season, { cascade: true })
  episodes?: Episodes[];
}